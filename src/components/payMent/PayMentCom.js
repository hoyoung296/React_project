import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import PortOne from '@portone/browser-sdk/v2'; // 포트원 V2 SDK 임포트
import Modal from "../mainPage/Modal";
import "../../css/ticket.css";

const STORE_ID = process.env.REACT_APP_PORTONE_STORE_ID;       // 포트원 상점 식별자
const CHANNEL_KEY = process.env.REACT_APP_PORTONE_CHANNEL_KEY; // 포트원 채널 키

console.log("키값1",STORE_ID)

console.log("키값2",CHANNEL_KEY)

// useUnload 훅 정의 (예약 취소 등)
const useUnload = (reservationId, scheduleId, seatIds, isSubmitting) => {
    useEffect(() => {
        const handleUnload = async (event) => {
            if (isSubmitting) return;
            event.preventDefault();
            if (reservationId && scheduleId && seatIds) {
                try {
                    await Axios.delete("http://192.168.0.91:8080/root/member/reserve/reservation/cancel", {
                        data: { 
                            reservationId: reservationId,
                            scheduleId: scheduleId,
                            seatIds: [...seatIds]
                        }
                    });
                    console.log("✅ 예매가 정상적으로 취소되었습니다.");
                } catch (error) {
                    console.error("❌ 예매 취소 실패:", error);
                }
            }
            event.returnValue = "페이지를 떠나면 예매가 취소됩니다. 정말 떠나시겠습니까?";
            return event.returnValue;
        };

        window.addEventListener("beforeunload", handleUnload);
        return () => {
            window.removeEventListener("beforeunload", handleUnload);
        };
    }, [reservationId, scheduleId, seatIds, isSubmitting]);
};

const PayMentCom = () => {
    const [paymentMethod, setPaymentMethod] = useState(""); // 결제 수단
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false); 
    const [modalType, setModalType] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const {
        movieDetailsState = {},
        selectedDate = "정보 없음",
        selectedCinema = "정보 없음",
        selectedStartTime = "정보 없음",
        selectedSeats = [],
        totalAmount = 0,
        reservationId,
        scheduleId,
        seatIds = []
    } = location.state || {};

    useUnload(reservationId, scheduleId, seatIds, isSubmitting);

    const openModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    };

    const renderPaymentNotice = () => {
        if (paymentMethod === "신용카드") {
            return <p className="paymentNotice">신용카드 결제 안내문</p>;
        }
        if (paymentMethod === "네이버페이") {
            return <p className="paymentNotice">네이버페이 결제 안내문</p>;
        }
        if (paymentMethod === "카카오페이") {
            return (
                <p className="paymentNotice">
                    카카오페이 결제 순서<br/><br/>
                    우측 하단에 있는 ‘결제하기’ 버튼을 클릭해주세요.<br/>
                    예매내역 확인 후 결제하기 버튼 클릭 시 ‘카카오페이’ 결제 인증창이 뜹니다.<br/>
                    ‘카카오페이’ 결제 인증창에서 정보를 입력하신 후 결제해주세요.
                </p>
            );
        }
        return <p className="paymentNotice">결제 방식을 선택해주세요.</p>;
    };

    // 기존 handleSubmit 대신 PortOne 결제 위젯을 호출하는 triggerPayment 함수 추가 (수정된 부분)
    const triggerPayment = async () => {
        if (!paymentMethod) {
          alert("결제수단을 선택해주세요.");
          return;
        }
        setIsSubmitting(true);
        const paymentIdForMerchant = "order_" + new Date().getTime();
      
        try {
          // PortOne 결제 위젯 실행
          const response = await PortOne.requestPayment({
            storeId: STORE_ID,
            channelKey: CHANNEL_KEY,
            paymentId: paymentIdForMerchant, // merchant_uid 역할
            orderName: "테스트 상품 결제",
            totalAmount: 1000,
            currency: "CURRENCY_KRW",
            // 신용카드는 "CARD", 카카오페이와 네이버페이는 모두 EASY_PAY로 지정
            payMethod: paymentMethod === "신용카드" ? "CARD" : "EASY_PAY",
            // 카카오페이와 네이버페이에 대해 각각 easyPayProvider 값을 설정합니다.
            ...(paymentMethod === "카카오페이" && {
              easyPay: { easyPayProvider: "EASY_PAY_PROVIDER_KAKAOPAY" }
            }),
            ...(paymentMethod === "네이버페이" && {
              easyPay: { easyPayProvider: "EASY_PAY_PROVIDER_NAVERPAY" }
            })
          });
          console.log("response code: ", response.code);
      
          if (!response.code) {
            const { txId, paymentId } = response;
            // 백엔드에 결제 정보 전달 (필요에 따라 전송하는 데이터 항목 조정)
            const createRes = await Axios.post('/api/payment/create', {
              reservationId: reservationId || 123, // 예시 값
              paymentMethodId: 1, // 예시 값
              amount: totalAmount, // 실제 결제 금액 사용
              portonePaymentId: txId, // 결제 시도 고유 번호 사용
            });
            // 생성된 Payment의 paymentId를 응답으로 받는다고 가정
            const dbPaymentId = createRes.data.paymentId || 12345;
      
            // 결제 완료 검증: 포트원 API 조회 후 DB 업데이트 수행
            const confirmRes = await Axios.post('/api/payment/confirm', { portonePaymentId: txId });
            if (confirmRes.data.status === 'completed') {
              alert("결제가 성공적으로 완료되었습니다.");
              navigate("/ticket/complete");
            } else {
              alert("결제 확인 실패.");
            }
          } else {
            alert(`결제 실패: ${response.message || "알 수 없는 오류"}`);
          }
        } catch (error) {
          console.error("결제 처리 중 오류 발생:", error);
          alert("결제 처리 중 오류가 발생했습니다.");
        } finally {
          setIsSubmitting(false);
        }
      };

    return (
        <div className="payMentPage">
            <div className="payMent">
                <h3>결제 내역</h3>
                <div className="movieInfo">
                    <div className="selectMovieInfoPayMent">
                        {movieDetailsState.posterurl && <img src={movieDetailsState?.posterurl} alt={movieDetailsState?.title} />}
                        <div>  
                            <div>{movieDetailsState?.title || "정보 없음"}</div>
                            <div>감독 : <span>{movieDetailsState?.director || "정보 없음"}</span></div>
                            <div>배우 : <span>{movieDetailsState?.actors || "정보 없음"}</span></div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>관람일자</p>
                            <p>관람일시</p>
                            <p>상영관</p>
                            <p>인원</p>
                            <p>좌석번호 </p>
                        </div>
                        <div>
                            <p>{selectedDate || "정보 없음"}</p>
                            <p>{selectedStartTime || "정보 없음"}</p>
                            <p>{selectedCinema || "정보 없음"}</p>
                            <p>{selectedSeats.length > 0 ? `${selectedSeats.length}명` : "정보 없음"}</p>
                            <p>{selectedSeats.length > 0 ? selectedSeats.join(", ") : "선택된 좌석 없음"}</p>
                        </div>
                    </div>
                </div>
                <div className="payRadio">
                    <h3>결제수단</h3>
                    <div className="payBtn">
                        <label>
                            <input
                                type="radio"
                                name="pay"
                                value="신용카드"
                                onChange={() => {
                                    setPaymentMethod("신용카드");
                                }}
                            />
                            신용카드
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="pay"
                                value="네이버페이"
                                onChange={() => {
                                    setPaymentMethod("네이버페이");
                                }}
                            />
                            네이버페이
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="pay"
                                value="카카오페이"
                                onChange={() => {
                                    setPaymentMethod("카카오페이");
                                }}
                            />
                            카카오페이
                        </label>
                    </div>
                </div>
                <div className="payline"/>
                {/* 결제 안내 메시지 렌더링 */}
                {renderPaymentNotice()}
            </div>
            <div className="payInfo">
                <p>결제 방식</p>
                <p>{paymentMethod || ""}</p>
                <p>총 결제 금액</p>
                <p>{`${totalAmount.toLocaleString()}원` || ""}</p>
                {/* 기존의 결제하기 버튼 대신 triggerPayment를 호출하는 버튼으로 변경됨 */}
                <button onClick={triggerPayment} disabled={isSubmitting}>
                    {isSubmitting ? "결제 진행 중..." : "결제하기"}
                </button>
            </div>
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                type={modalType} 
            />
        </div>
    );
};

export default PayMentCom;
