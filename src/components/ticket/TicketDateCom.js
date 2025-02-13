import { useState, useEffect } from "react";
import "../../css/main.css";

const TicketDateCom = () => {
    const dummyShowtimes = [
        "2025 - 02 - 13", "2025 - 02 - 14", "2025 - 02 - 15", "2025 - 02 - 16", "2025 - 02 - 17",
        "2025 - 02 - 18", "2025 - 02 - 19", "2025 - 02 - 20", "2025 - 02 - 21", "2025 - 02 - 22"
    ];

    const [selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        setSelectedDate("");
    }, []);

    const handleSelect = (date) => {
        setSelectedDate(prev => (prev === date ? "" : date));
    };

    return (
        <div className="ticketCon">
            <div className="ticketDate">
                {dummyShowtimes.map((date, index) => (
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
