import { useState, useEffect } from "react";
import Axios from "axios";
import "../../css/main.css";

const TicketDateCom = () => {
    const [showtimes, setShowtimes] = useState([]); // 날짜 데이터 저장
    const [selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        const fetchShowtimes = async (title) => {
            try {
                const response = await Axios.get("http://192.168.0.91:8080/root/member/schedule/title", {params : {title}});
                setShowtimes(response.data.map(item => item.SRATDATE)); // 데이터를 상태에 저장
                console.log("날짜 : ",showtimes);
            } catch (error) {
                console.error("날짜 데이터를 가져오는 데 실패했습니다.", error);
            }
        };
    
        fetchShowtimes(); // 함수 호출
    }, []);


    const handleSelect = (date) => {
        setSelectedDate(prev => (prev === date ? "" : date));
    };

    return (
        <div className="ticketCon">
            <div className="ticketDate">
                {showtimes.map((date, index) => (
                    <button
                        key={index}
                        className={selectedDate === date ? "selected" : ""}
                        onClick={() => handleSelect(date)}
                    >
                        {date}
                    </button>
                ))}
            </div>
            <div className="cinema">상영관</div>
            <div className="buyTicket">선택내용</div>
        </div>
    );
};

export default TicketDateCom;
