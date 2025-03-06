import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PortOne from '@portone/browser-sdk/v2'; // 포트원 V2 SDK 임포트
import Axios from "axios";
import "../../css/ticket.css";


const STORE_ID = process.env.REACT_APP_PORTONE_STORE_ID;       // 포트원 상점 식별자
const CHANNEL_KEY = process.env.REACT_APP_PORTONE_CHANNEL_KEY; // 포트원 채널 키

console.log("키값1",STORE_ID)

console.log("키값2",CHANNEL_KEY)




const PayMentCom = () => {
    const [paymentMethod, setPaymentMethod] = useState(""); // 결제 수단
    const [isSubmitting, setIsSubmitting] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

// reservationId 상태로 관리
const [reservationId, setReservationId] = useState(() => {
    const storedReservationId = location.state?.reservationId || localStorage.getItem('reservationId');
    return storedReservationId ? String(storedReservationId) : null;
});

// reservationId가 변경될 때마다 로컬스토리지에 저장
useEffect(() => {
    if (location.state && location.state.reservationId) {
        const newReservationId = String(location.state.reservationId);
        setReservationId(newReservationId);
        localStorage.setItem('reservationId', newReservationId); // 상태 변경 시 로컬스토리지에 저장
    } else if (!reservationId) {
        alert("예매 번호가 없습니다.");
    }
}, [location.state, reservationId]);

// 좌석 정보 변경 시 로컬스토리지에 저장 및 상태 업데이트
const [seatIds, setSeatIds] = useState(() => {
    const storedSeatIds = location.state?.seatIds || JSON.parse(localStorage.getItem("seatIds")) || [];

     // 로컬스토리지에서 불러온 좌석 정보가 비어있다면 빈 배열로 초기화
    if (storedSeatIds.length === 0) {
        console.log("storedSeatIds가 없음! 추가하겠음");
        seatIds = localStorage.getItem('seatIds');
        console.log("seatIds : ", seatIds);

    }
    
    return storedSeatIds;
});

useEffect(() => {
    if (location.state && location.state.seatIds) {
        localStorage.setItem("seatIds", JSON.stringify(location.state.seatIds));
        setSeatIds(location.state.seatIds); // 💡 UI 반영을 위해 상태 업데이트
    }
}, [location.state]);

useEffect(() => {
    const handleStorageChange = () => {
        const updatedSeatIds = localStorage.getItem("seatIds");
        setSeatIds(updatedSeatIds ? JSON.parse(updatedSeatIds) : []);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
        window.removeEventListener("storage", handleStorageChange);
    };
}, []);

// 다른 값들 로컬스토리지에서 불러오기
const storedMovieTitle = localStorage.getItem('movieTitle');
const movieTitle = storedMovieTitle ? JSON.parse(storedMovieTitle) : null;

const storedMovieDirector = localStorage.getItem('movieDirector');
const movieDirector = storedMovieDirector ? JSON.parse(storedMovieDirector) : null;

const storedMovieActors = localStorage.getItem('movieActors');
const movieActors = storedMovieActors ? JSON.parse(storedMovieActors) : null;

const storedMoviePosterUrl = localStorage.getItem('moviePosterUrl');
const moviePosterUrl = storedMoviePosterUrl ? JSON.parse(storedMoviePosterUrl) : null;

const storedSelectedDate = localStorage.getItem('selectedDate');
const selectedDate = storedSelectedDate ? JSON.parse(storedSelectedDate) : null;

const storedSelectedCinema = localStorage.getItem('selectedCinema');
const selectedCinema = storedSelectedCinema ? JSON.parse(storedSelectedCinema) : null;

const storedSelectedStartTime = localStorage.getItem('selectedStartTime');
const selectedStartTime = storedSelectedStartTime ? JSON.parse(storedSelectedStartTime) : null;

const storedTotalAmount = localStorage.getItem('totalAmount');
const totalAmount = storedTotalAmount ? JSON.parse(storedTotalAmount) : 0;


const [scheduleId, setScheduleId] = useState(() => {
    const storedScheduleId = location.state?.scheduleId || JSON.parse(localStorage.getItem('scheduleId')) || null;
    return storedScheduleId;  // 바로 초기화
});
useEffect(() => {
    if (scheduleId === "0" || scheduleId === null) {
        console.log("scheduleId가 없음! 추가하겠음");
        const storedScheduleId = localStorage.getItem('scheduleId');
        if (storedScheduleId) {
            setScheduleId(storedScheduleId);  // 로컬스토리지에서 가져온 값으로 상태 업데이트
            console.log("scheduleId : ", storedScheduleId);
        }
    }
}, [scheduleId]);  // scheduleId가 변경될 때마다 실행

// scheduleId가 변경되면 로컬스토리지에 저장
useEffect(() => {
    if (scheduleId) {
        localStorage.setItem('scheduleId', scheduleId);
    }
}, [scheduleId]);


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
        // const paymentIdForMerchant = reservationId;

         // 선택된 결제 수단에 따라 paymentMethodId 값을 결정
        let paymentMethodId;
        if (paymentMethod === "신용카드") {
            paymentMethodId = 1;
        } else if (paymentMethod === "네이버페이" || paymentMethod === "카카오페이") {
            paymentMethodId = 2;
        } else {
            // 기본값 처리 (필요에 따라 조정)
            paymentMethodId = 1;
        }

        try {
          // PortOne 결제 위젯 실행
        const response = await PortOne.requestPayment({
            storeId: STORE_ID,
            channelKey: CHANNEL_KEY,
            paymentId: String(reservationId), // merchant_uid 역할
            orderName: "테스트 상품 결제",
            totalAmount: totalAmount,
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
            const createRes = await Axios.post('http://localhost:8080/root/member/payment/create', {
              reservationId: String(reservationId), // 예시 값
              paymentMethodId: paymentMethodId, // 예시 값
              amount: totalAmount, // 실제 결제 금액 사용
              //amount: totalAmount, // 실제 결제 금액 사용
              portonePaymentId: txId, // 결제 시도 고유 번호 사용
            });
            // 생성된 Payment의 paymentId를 응답으로 받는다고 가정
            console.log("@@@data : ",createRes.data)
            const dbPaymentId = createRes.data.data.paymentId;
            console.log("@@@dbPaymentId : ",dbPaymentId)
            console.log("@@@paymentId : ",paymentId)
      
            // 결제 완료 검증: 포트원 API 조회 후 DB 업데이트 수행
            const confirmRes  = await Axios.post(
                "http://localhost:8080/root/member/payment/confirm",
                {   portonePaymentId: paymentId,
                    amount : totalAmount,
                    scheduleId: scheduleId,
                    seatIds: [...seatIds]
                }
                // {
                //     headers: {
                //         Authorization: `Bearer ${process.env.REACT_APP_PORTONE_CHANNEL_KEY}` // ✅ Bearer 추가
                //     },
                //     withCredentials: true // ✅ CORS 인증 정보 포함
                // }
            );
            console.log("confirmRes@@@@@:",confirmRes.data.data.rs)
            if (confirmRes.data.data.rs === '성공') {
              alert("결제가 성공적으로 완료되었습니다.");
              navigate("/");
            } else {
              alert("결제 확인 실패.");
              navigate("/");
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

    useEffect(() => {
        const handlePopState = async () => {
            if (!isSubmitting) {
                console.log("뒤로가기 감지!!");
                console.log("🚀 전송할 데이터:");
                console.log("reservationId:", reservationId);
                console.log("scheduleId:", scheduleId);
                console.log("seatIds:", seatIds);
    
                // 사용자가 뒤로 가기를 누를 때 예매 취소 여부 확인
                const userConfirmed = window.confirm("페이지를 벗어날 시 변경사항이 저장되지 않을 수 있습니다. 이동하시겠습니까?");
                if (userConfirmed) {
                    try {
                        // 예매 취소 요청을 백엔드로 보내는 부분
                        console.log("뒤로가기 YES -> axios 실행!!");
                        await Axios.delete("http://localhost:8080/root/member/reserve/cancel", {
                            data: {
                                reservationId: reservationId,
                                scheduleId: scheduleId,
                                seatIds: seatIds,
                            },
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        });
                        console.log("✅ 예매가 정상적으로 취소되었습니다.");
                        navigate('/'); // 뒤로가기 후 홈으로 이동
                    } catch (error) {
                        console.error("❌ 예매 취소 실패:", error);
                    }
                }
            }
        };
    
        // 페이지 상태를 history에 추가 (이 부분은 이미 존재하므로 변경이 필요 없음)
        window.history.replaceState(null, document.title);
        // popstate 이벤트 리스너 설정
        window.addEventListener("popstate", handlePopState);
    
        // clean-up
        return () => {
            
        };
    }, [isSubmitting, reservationId, seatIds, scheduleId, navigate]);

    
    return (
        <div className="payMentPage">
            <div className="payMent">
                <h3>결제 내역</h3>
                <div className="movieInfo">
                    <div className="selectMovieInfoPayMent">
                        {moviePosterUrl && <img src={moviePosterUrl} alt={movieTitle} />}
                        <div>  
                            <div>{movieTitle|| "정보 없음"}</div>
                            <div>감독 : <span>{movieDirector || "정보 없음"}</span></div>
                            <div>배우 : <span>{movieActors || "정보 없음"}</span></div>
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
                            <p>{seatIds.length > 0 ? `${seatIds.length}명` : "정보 없음"}</p>
                            <p>{seatIds.length > 0 ? seatIds.join(", ") : "정보 없음"}</p>

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
            
            
        </div>
    );
};

export default PayMentCom;
