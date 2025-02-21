import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../mainPage/Modal";
import "../../css/ticket.css";

// useUnload 훅 정의
const useUnload = (reservationId, scheduleId, seatIds, isSubmitting) => {
    useEffect(() => {
        const handleUnload = async (event) => {
            // 결제 진행 중이면 경고창이 뜨지 않도록
            if (isSubmitting) return;

            event.preventDefault();

            // 예약 취소 API 호출
            if (reservationId && scheduleId && seatIds) {
                try {
                    await Axios.delete("http://192.168.0.91:8080/root/member/schedule/cancel", {
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

            // 경고 메시지를 표시
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
    const [paymentMethod, setPaymentMethod] = useState(""); // 전체 결제 방식
    const [selectedSimplePay, setSelectedSimplePay] = useState(""); // 간편결제 방식
    const [isSubmitting, setIsSubmitting] = useState(false); // 결제 진행 상태
    const [modalOpen, setModalOpen] = useState(false); 
    const [modalType, setModalType] = useState("");
    const location = useLocation(); // 현재 페이지의 state 가져오기
    const {
        movieDetailsState = {}, // 기본값 설정
        selectedDate = "정보 없음",
        selectedCinema = "정보 없음",
        selectedStartTime = "정보 없음",
        selectedSeats = [],
        totalAmount = 0,
        reservationId,
        scheduleId,
        seatIds = []
    } = location.state || {};

    // 예약 취소를 위해 useUnload 훅 호출
    useUnload(reservationId, scheduleId, seatIds, isSubmitting);

    const openModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    };

    const renderPaymentNotice = () => {
        if (paymentMethod === "신용카드") {
            return <p className="paymentNotice">신용카드 결제 안내문</p>;
        }
        if (paymentMethod === "무통장입금") {
            return <p className="paymentNotice">무통장입금 결제 안내문</p>;
        }
        if (paymentMethod === "간편결제") {
            if (selectedSimplePay === "네이버페이") {
                return <p className="paymentNotice">네이버페이 결제 안내문</p>;
            }
            if (selectedSimplePay === "카카오페이") {
                return <p className="paymentNotice">카카오페이 결제 순서<br/><br/>
                우측 하단에 있는 ‘결제하기’ 버튼을 클릭해주세요.<br/>
                예매내역 확인 후 결제하기 버튼 클릭 시 ‘카카오페이’ 결제 인증창이 뜹니다.<br/>
                ‘카카오페이’ 결제 인증창에서 정보를 입력하신 후 결제해주세요.</p>;
            }
            if (selectedSimplePay === "PAYCO") {
                return <p className="paymentNotice">PAYCO 결제 안내문</p>;
            }
            return <p className="paymentNotice">간편결제 방식을 선택해주세요.</p>;
        }
        return null;
    };

    const handleSubmit = () => {
        
            // 결제 수단이 선택되지 않았을 때 경고창 표시
            if (!paymentMethod && !selectedSimplePay) {
                alert("결제수단을 선택해주세요.");
                return; // 결제 진행을 막음
        };
        setIsSubmitting(true); // 결제 진행 상태로 변경하여 경고창을 막음
        openModal('payment');
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
                                value="credit"
                                onChange={() => {
                                    setPaymentMethod("신용카드");
                                    setSelectedSimplePay(""); // 간편결제 초기화
                                }}
                            />
                            신용카드
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="pay"
                                value="cash"
                                onChange={() => {
                                    setPaymentMethod("무통장입금");
                                    setSelectedSimplePay(""); // 간편결제 초기화
                                }}
                            />
                            무통장입금
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="pay"
                                value="simple"
                                onChange={() => {
                                    setPaymentMethod("간편결제");
                                    setSelectedSimplePay(""); // 간편결제 초기화
                                }}
                            />
                            간편결제
                        </label>
                    </div>
                    {paymentMethod === "간편결제" && (
                        <div className="simplePayOptions">
                            <label>
                                <input
                                    type="radio"
                                    name="simplePay"
                                    value="네이버페이"
                                    checked="checked"
                                    onChange={(e) => setSelectedSimplePay(e.target.value)}
                                />
                                네이버페이
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="simplePay"
                                    value="카카오페이"
                                    onChange={(e) => setSelectedSimplePay(e.target.value)}
                                />
                                카카오페이
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="simplePay"
                                    value="PAYCO"
                                    onChange={(e) => setSelectedSimplePay(e.target.value)}
                                />
                                PAYCO
                            </label>
                        </div>
                    )}
                </div>
                <div className="payline"/>
                {renderPaymentNotice()}
            </div>
            <div className="payInfo">
                <p>결제 방식</p>
                <p>{paymentMethod || selectedSimplePay || ""}</p>
                <p>총 결제 금액</p>
                <p>{`${totalAmount.toLocaleString()}원` || ""}</p>
                <button onClick={handleSubmit}>결제하기</button>
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