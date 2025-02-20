import { useLocation } from "react-router-dom";
import "../../css/ticket.css";

const PayMentCom = () => {
    const location = useLocation(); // 현재 페이지의 state 가져오기
    const { 
        movieDetails,
        selectedDate,
        selectedCinema,
        selectedStartTime,
        selectedSeats,
        totalAmount 
    } = location.state || {};  // 전달된 state 값

    return (
        <div className="payMentPage">
            <h2>결제 페이지</h2>
            <p>영화제목: {movieDetails?.title || "정보 없음"}</p>
            <p>감독: {movieDetails?.director || "정보 없음"}</p>
            <p>배우: {movieDetails?.actors || "정보 없음"}</p>
            <p>관람일자: {selectedDate || "정보 없음"}</p>
            <p>관람시간: {selectedStartTime || "정보 없음"}</p>
            <p>상영관: {selectedCinema || "정보 없음"}</p>
            <p>선택좌석: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "선택된 좌석 없음"}</p>
            <p>금액: {totalAmount ? `${totalAmount.toLocaleString()}원` : "금액 정보 없음"}</p>
        </div>
    );
};

export default PayMentCom;
