import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";
import "../../css/ticket.css";
/*
// useUnload 훅 정의
const useUnload = (reservationId) => {
    useEffect(() => {
        const handleUnload = async (event) => {
            event.preventDefault();

            // 예약 취소 API 호출
            if (reservationId) {
                try {
                    await Axios.delete("http://localhost:8080/root/member/schedule/cancel", {
                        data: { 
                            reservationId : reservationId ,
                            // 예시로 scheduleId와 seatIds를 넘길 수 있도록 변경
                            scheduleId: 1,  // 예시 값
                            seatIds: [1, 2, 3] 
                        }
                    });
                    console.log("✅ 예매가 정상적으로 취소되었습니다.");
                } catch (error) {
                    console.error("❌ 예매 취소 실패:", error);
                }
            }

            // 경고 메시지 표시 (선택 사항)
            event.returnValue = "이 페이지를 나가면 예매가 취소됩니다. 계속하시겠습니까?";
            return event.returnValue;
        };

        // 브라우저 종료 또는 뒤로가기 시 이벤트 감지
        window.addEventListener("beforeunload", handleUnload);

        // 컴포넌트 언마운트 시 이벤트 제거
        return () => {
            window.removeEventListener("beforeunload", handleUnload);
        };
    }, [reservationId]);
};
*/
//////////////////////////mockData 임시데이터. 서버연결 후 삭제예정
const mockData = {
    movieDetailsState: {
        title: "미키17",
        director: "봉준호",
        actors: "로버트 패틴슨, 나오미 아키에",
        posterurl: "../../img/poster/poster1.jpg"  // 임시 포스터 이미지
    },
    selectedDate: "2025-02-25",
    selectedCinema: "1관",
    selectedStartTime: "19:00",
    selectedSeats: ["A1", "A2"],
    totalAmount: 30000,
    reservationId: "3488719234872947"
};///////////////////////
const PayMentCom = () => {
    //////////////const location = useLocation(); // 현재 페이지의 state 가져오기
    //////////////// const { 
    //     movieDetailsState,
    //     selectedDate,
    //     selectedCinema,
    //     selectedStartTime,
    //     selectedSeats = [], // 기본값 설정
    //     totalAmount,
    //     reservationId // 예약 ID를 받아옵니다.
    /////////////////// } = location.state || {};  // 전달된 state 값

      // 임시 데이터로 초기화
    const { 
        movieDetailsState = mockData.movieDetailsState,
        selectedDate = mockData.selectedDate,
        selectedCinema = mockData.selectedCinema,
        selectedStartTime = mockData.selectedStartTime,
        selectedSeats = mockData.selectedSeats, 
        totalAmount = mockData.totalAmount,
        reservationId = mockData.reservationId
    } = mockData;  // mockData로부터 값 할당

    // 예약 취소를 위해 useUnload 훅 호출
   // useUnload(reservationId);

    return (
        <div className="payMentPage">
            <div className="payMent">
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
                <div>
                    <label> <input type="radio" name="pay" value="credit" /> 신용카드 </label>
                    <label> <input type="radio" name="pay" value="cash" /> 무통장 </label>
                    <label> <input type="radio" name="pay" value="appPay" /> 간편결제 </label>
                </div>
            </div>
            <div className="payInfo">
                <p>결제방식 : </p>
                <p>금액: {totalAmount ? `${totalAmount.toLocaleString()}원` : "금액 정보 없음"}</p>
                <button>결제하기</button>
            </div>
        </div>
    );
};

export default PayMentCom;
