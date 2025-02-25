import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../mainPage/Modal";
import "../../css/ticket.css";





const PayMentCom = () => {
    const [paymentMethod, setPaymentMethod] = useState(""); // 전체 결제 방식
    const [isSubmitting, setIsSubmitting] = useState(false); // 결제 진행 상태
    const location = useLocation(); // 현재 페이지의 state 가져오기
    const navigate = useNavigate(); // 뒤로가기 처리용
    const {
        movieDetails = {}, // 기본값 설정
        selectedDate = "정보 없음",
        selectedCinema = "정보 없음",
        selectedStartTime = "정보 없음",
        selectedSeats = [],
        totalAmount = 0,
        reservationId,
        scheduleId,
        seatIds = []
    } = location.state || {};
    console.log("현재 location.state: ", location.state);

    const renderPaymentNotice = () => {
        if (paymentMethod === "신용카드") {
            return <p className="paymentNotice">신용카드 결제 안내문</p>;
        }
        if (paymentMethod === "네이버페이") {
            return <p className="paymentNotice">네이버페이 결제 안내문</p>;
        }
        if (paymentMethod === "카카오페이") {
            return <p className="paymentNotice">카카오페이 결제 순서<br/><br/>
            우측 하단에 있는 ‘결제하기’ 버튼을 클릭해주세요.<br/>
            예매내역 확인 후 결제하기 버튼 클릭 시 ‘카카오페이’ 결제 인증창이 뜹니다.<br/>
            ‘카카오페이’ 결제 인증창에서 정보를 입력하신 후 결제해주세요.</p>;
        }

            return <p className="paymentNotice">결제 방식을 선택해주세요.</p>;
        }
        


    const handleSubmit = () => {
        
            // 결제 수단이 선택되지 않았을 때 경고창 표시
            if (!paymentMethod) {
                alert("결제수단을 선택해주세요.");
                return; // 결제 진행을 막음
        };
        setIsSubmitting(true); // 결제 진행 상태로 변경하여 경고창을 막음
    };

    

    // 뒤로가기 버튼 클릭 시 경고창 띄우기
    useEffect(() => {
        const handlePopState = async() => {
            if (!isSubmitting) {
                console.log("뒤로가기 감지!!")
                console.log("🚀 전송할 데이터:");
                console.log("reservationId:", reservationId);
                console.log("scheduleId:", scheduleId);
                console.log("seatIds:", seatIds);
                if (window.confirm("페이지를 벗어날 시 변경사항이 저장되지 않을 수 있습니다. 이동하시겠습니까?")) {
                    try {
                        console.log("뒤로가기 YES -> axios 실행!!")
                        await Axios.delete("http://192.168.0.91:8080/root/member/reserve/cancel", {
                            data: {
                                reservationId: reservationId, 
                                scheduleId: scheduleId,
                                seatIds: [...seatIds]
                            },
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        });
                        console.log("✅ 예매가 정상적으로 취소되었습니다.");
                    } catch (error) {
                        console.error("❌ 예매 취소 실패:", error);
                    }
                    console.log("axios 실행 후 뒤로가기 진행함")
                    navigate(-1); // 뒤로가기
                }
            }
        };

        window.history.pushState(null, document.title); // 초기 히스토리 추가
        window.addEventListener("popstate", handlePopState);

        // 페이지에서 벗어날 때 이벤트 제거
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [isSubmitting, navigate]);

    return (
        <div className="payMentPage">
            <div className="payMent">
                <h3>결제 내역</h3>
                <div className="movieInfo">
                    <div className="selectMovieInfoPayMent">
                        {movieDetails.posterurl && <img src={movieDetails?.posterurl} alt={movieDetails?.title} />}
                        <div>  
                            <div>{movieDetails?.title || "정보 없음"}</div>
                            <div>감독 : <span>{movieDetails?.director || "정보 없음"}</span></div>
                            <div>배우 : <span>{movieDetails?.actors || "정보 없음"}</span></div>
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
                            <p>{seatIds.length > 0 ? seatIds.join(", ") : "선택된 좌석 없음"}</p>
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
                {renderPaymentNotice()}
            </div>
            <div className="payInfo">
                <p>결제 방식</p>
                <p>{paymentMethod || ""}</p>
                <p>총 결제 금액</p>
                <p>{`${totalAmount.toLocaleString()}원` || ""}</p>
                <button onClick={handleSubmit}>결제하기</button>
            </div>
            
            
        </div>
    );
};

export default PayMentCom;