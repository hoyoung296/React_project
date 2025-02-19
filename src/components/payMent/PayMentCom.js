import { useLocation } from "react-router-dom";
import "../../css/ticket.css";

const PayMentCom = () => {
    const location = useLocation(); // 🔹 현재 페이지의 state 가져오기
    const selectedSeats = location.state?.selectedSeats || [];  // 🔹 좌석 정보 가져오기

    return (
        <div className="payMentPage">
            <h2>결제 페이지</h2>
            <p>영화제목 : 
                감독 : 
                배우 : 
                관람일자 : 
                관람시간 : 
                상영관 : 
                선택좌석 : 
                금액 : 
            </p>
            <p>선택한 좌석: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "선택된 좌석 없음"}</p>
        </div>
    );
};

export default PayMentCom;
