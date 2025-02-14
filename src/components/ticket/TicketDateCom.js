import { useState, useEffect } from "react";
import Axios from "axios";
import { useSearchParams } from "react-router-dom";
import "../../css/ticket.css";

const TicketDateCom = () => {
    const [showtimes, setShowtimes] = useState([]);  // 상영 날짜 리스트
    const [selectedDate, setSelectedDate] = useState("");  // 선택된 날짜
    const [cinemaInfo, setCinemaInfo] = useState([]);  // 상영관 정보 저장

    const [searchParams] = useSearchParams();
    const title = searchParams.get("title");  // URL에서 영화 제목 가져오기

    // ✅ (1) 영화 상영 날짜 가져오기
    useEffect(() => {
        if (!title) {
            console.warn("URL에 title 파라미터가 없습니다.");
            return;
        }

        const fetchShowtimes = async () => {
            try {
                const response = await Axios.get("http://192.168.0.91:8080/root/member/schedule/title", {
                    params: { title }
                });
                console.log("✅ 상영 날짜 데이터:", response.data);
                setShowtimes(response.data.data.map(item => item.STARTDATE));
            } catch (error) {
                console.error("❌ 날짜 데이터를 가져오는 데 실패했습니다.", error);
            }
        };

        fetchShowtimes();
    }, [title]);

    // ✅ (2) 날짜 선택 시, 상영관 정보 가져오기
    const handleSelect = async (date) => {
        const newSelectedDate = selectedDate === date ? "" : date;  // ✅ 선택된 날짜 업데이트
        setSelectedDate(newSelectedDate);  // ✅ 상태 업데이트
    
        if (newSelectedDate) {  // ✅ selectedDate가 아닌, 업데이트된 newSelectedDate를 사용
            try {
                const response = await Axios.get("http://192.168.0.91:8080/root/member/schedule/startdate", {
                    params: { startdate: newSelectedDate }  // ✅ API에서 요구하는 파라미터명 확인
                });
                console.log("✅ 상영관 정보:", response.data.data);
                setCinemaInfo(response.data.data);
            } catch (error) {
                console.error("❌ 상영관 데이터를 가져오는 데 실패했습니다.", error);
                setCinemaInfo([]);
            }
        } else {
            setCinemaInfo([]);
        }
    };

    // ✅ (3) 데이터를 필터링하여 A, B, C 그룹 나누기
    const cinemaA = cinemaInfo.filter(cinema => cinema.SCREENNAME === "1관");
    const cinemaB = cinemaInfo.filter(cinema => cinema.SCREENNAME === "2관");
    const cinemaC = cinemaInfo.filter(cinema => cinema.SCREENNAME === "3관");
    console.log("1관 : " ,cinemaInfo);

    return (
        <div className="ticketCon">
            {/* ✅ 상영 날짜 버튼 */}
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

            {/* ✅ 선택된 날짜에 대한 상영관 정보 표시 */}
            <div className="cinema">
                {/* 🎥 1관*/}
                <div className="cinemaA">
                    <h3>🎬 1관</h3>
                    {cinemaA.length > 0 ? (
                        cinemaA.map((cinema, index) => (
                            <button key={index} className="cinemaItem">
                                {cinema.STARTTIME}
                            </button>
                        ))
                    ) : (
                        <p>❌ 1관에 상영 일정이 없습니다.</p>
                    )}
                </div>

                {/* 🎥 2관 */}
                <div className="cinemaB">
                    <h3>🎬 2관</h3>
                    {cinemaB.length > 0 ? (
                        cinemaB.map((cinema, index) => (
                            <button key={index} className="cinemaItem">
                                {cinema.STARTTIME}
                            </button>
                        ))
                    ) : (
                        <p>❌ 2관에 상영 일정이 없습니다.</p>
                    )}
                </div>

                {/* 🎥 3관 */}
                <div className="cinemaC">
                    <h3>🎬 3관</h3>
                    {cinemaC.length > 0 ? (
                        cinemaC.map((cinema, index) => (
                            <button key={index} className="cinemaItem">
                                 {cinema.STARTTIME}
                            </button>
                        ))
                    ) : (
                        <p>❌ 3관에 상영 일정이 없습니다.</p>
                    )}
                </div>
            </div>

            <div className="buyTicket">선택내용</div>
        </div>
    );
};

export default TicketDateCom;
