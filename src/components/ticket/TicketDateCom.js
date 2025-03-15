import { useState, useEffect } from "react";
import Axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../css/ticket.css";

const TicketDateCom = () => {
    const [showtimes, setShowtimes] = useState([]);  // 상영 날짜 리스트
    const [selectedDate, setSelectedDate] = useState("");  // 선택된 날짜
    const [cinemaInfo, setCinemaInfo] = useState([]);  // 상영관 정보 저장
    const [movieDetails, setMovieDetails] = useState({});  // 영화 제목, 감독, 배우를 저장할 상태 추가
    const [selectedCinema, setSelectedCinema] = useState("");  // 선택된 상영관 저장
    const [selectedStartTime, setSelectedStartTime] = useState("");  // 선택된 상영 시각 저장
    const [selectedScheduleId, setSelectedScheduleId] = useState("");  // 선택된 SCHEDULE_ID 저장

    const [searchParams] = useSearchParams();
    const title = searchParams.get("title");  // URL에서 영화 제목 가져오기

    // ✅ 영화 상영 날짜 가져오기
    useEffect(() => {
        if (!title) {
            console.warn("URL에 title 파라미터가 없습니다.");
            return;
        }

        const fetchShowtimes = async () => {
            try {
                const response = await Axios.get("http://localhost:8080/root/member/schedule/title", {
                    params: { title }
                });
                console.log("✅ 상영 날짜 데이터:", response.data);
                setShowtimes(response.data.data.map(item => item.STARTDATE));

                // 영화 정보 추출 (제목, 감독, 배우) 및 상태 업데이트
                const movieInfo = response.data.data[0]; // 첫 번째 영화 정보를 사용
                setMovieDetails({
                    title: movieInfo.TITLE,
                    director: movieInfo.DIRECTOR,
                    actors: movieInfo.ACTORS,
                    posterurl: movieInfo.POSTERURL
                });

            } catch (error) {
                console.error("❌ 날짜 데이터를 가져오는 데 실패했습니다.", error);
            }
        };

        fetchShowtimes();
    }, [title]);

    // ✅ 날짜 선택 시, 상영관 정보 가져오기
    const handleSelect = async (date) => {
        const newSelectedDate = selectedDate === date ? "" : date;  // 선택된 날짜 업데이트
        setSelectedDate(newSelectedDate);  // 상태 업데이트
        setSelectedCinema("");  // 초기화
        setSelectedStartTime("");  // 초기화

        if (newSelectedDate) {
            try {
                const response = await Axios.get("http://localhost:8080/root/member/schedule/startdate", {
                    params: { startdate: newSelectedDate,title }
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

    // ✅ 상영 시간 선택 시, 해당 상영관과 상영 시각 및 SCHEDULE_ID 저장
    const handleCinemaSelect = (cinemaName, startTime, scheduleId) => {
        if (selectedCinema === cinemaName && selectedStartTime === startTime) {
            setSelectedCinema("");
            setSelectedStartTime("");
            setSelectedScheduleId("");
        } else {
            setSelectedCinema(cinemaName);
            setSelectedStartTime(startTime);
            setSelectedScheduleId(scheduleId);
        }
        console.log(`선택된 상영관: ${cinemaName}, 선택된 상영 시간: ${startTime}, SCHEDULE_ID: ${scheduleId}`);
    };

    // ✅ 데이터 필터링하여 A, B, C 그룹 나누기
    const cinemaA = cinemaInfo.filter(cinema => cinema.SCREENNAME === "1관");
    const cinemaB = cinemaInfo.filter(cinema => cinema.SCREENNAME === "2관");
    const cinemaC = cinemaInfo.filter(cinema => cinema.SCREENNAME === "3관");

    const navigate = useNavigate();

    // 좌석 선택으로 이동
    const goToSeatSelection = (e) => {

        if (!selectedDate || !selectedCinema || !selectedStartTime) {
            alert("상영일정을 선택해주세요.");
            e.preventDefault();
            return; // 선택되지 않은 경우, 좌석 선택 페이지로 이동하지 않음
        }

        navigate(`/ticket/seat?scheduleId=${selectedScheduleId}`, {
            state: {
                movieDetails,
                selectedDate,
                selectedCinema,
                selectedStartTime
            }
        });
    };

    const isPastTime = (startTime) => {
        const currentTime = new Date();
        const [hours, minutes] = startTime.split(":").map(num => parseInt(num, 10));
        const startTimeDate = new Date(currentTime);
        startTimeDate.setHours(hours);
        startTimeDate.setMinutes(minutes);
        startTimeDate.setSeconds(0);
        startTimeDate.setMilliseconds(0);
        return startTimeDate < currentTime;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
    
        return `${year}년 ${month}월 ${day}일`;
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

            <div className="cinema">
                {/* 🎥 1관 */}
                <div className="cinemaA">
                    <p>1관</p><br/>
                    {cinemaA.length > 0 ? (
                        cinemaA.map((cinema, index) => (
                            <button
                                key={index}
                                className={`cinemaItem ${selectedCinema === cinema.SCREENNAME && selectedStartTime === cinema.STARTTIME ? "selected" : ""}`}
                                onClick={() => handleCinemaSelect(cinema.SCREENNAME, cinema.STARTTIME, cinema.SCHEDULE_ID)}
                            >
                                {cinema.STARTTIME}
                            </button>
                        ))
                    ) : (
                        ""
                    )}
                </div>

                {/* 🎥 2관 */}
                <div className="cinemaB">
                    <p>2관</p><br/>
                    {cinemaB.length > 0 ? (
                        cinemaB.map((cinema, index) => (
                            <button
                                key={index}
                                className={`cinemaItem ${selectedCinema === cinema.SCREENNAME && selectedStartTime === cinema.STARTTIME ? "selected" : ""}`}
                                onClick={() => handleCinemaSelect(cinema.SCREENNAME, cinema.STARTTIME, cinema.SCHEDULE_ID)}
                            >
                                {cinema.STARTTIME}
                            </button>
                        ))
                    ) : (
                        ""
                    )}
                </div>

                {/* 🎥 3관 */}
                <div className="cinemaC">
                    <p>3관</p><br/>
                    {cinemaC.length > 0 ? (
                        cinemaC.map((cinema, index) => (
                            <button
                                key={index}
                                className={`cinemaItem ${selectedCinema === cinema.SCREENNAME && selectedStartTime === cinema.STARTTIME ? "selected" : ""}`}
                                onClick={() => handleCinemaSelect(cinema.SCREENNAME, cinema.STARTTIME, cinema.SCHEDULE_ID)}
                            >
                                {cinema.STARTTIME}
                            </button>
                        ))
                    ) : (
                        ""
                    )}
                </div>
            </div>

            <div className="buyTicket">
                <div>
                    <div className="buyTicketImg">
                        <img src={`${movieDetails.posterurl}`} alt={movieDetails.title} />
                    </div>
                    <div>
                        <div className="buyTicketTitle">
                            {movieDetails.title ? movieDetails.title : "제목 데이터가 없습니다."}
                        </div>
                        <div className="buyTicketDirector">
                            {movieDetails.director ? movieDetails.director : "감독 데이터가 없습니다."}
                        </div>
                        <div className="buyTicketActors">
                            {movieDetails.actors ? movieDetails.actors : "배우 데이터가 없습니다."}
                        </div>
                    </div>
                </div>
                <div className="buyTicketDate">
                    관람일자 : {selectedDate ? formatDate(selectedDate) : ""}
                </div>
                <div className="buyTicketCinema">
                    상영관 : {selectedCinema ? `${selectedCinema}` : ""} <br/>
                    상영시간 : {selectedStartTime ? `${selectedStartTime}` : ""}
                </div>
                <a href={`/ticket/seat?scheduleId=${encodeURIComponent(selectedScheduleId)}`}>
                    <button onClick={goToSeatSelection}>좌석선택하러가기</button>
                </a>
            </div>
        </div>
    );
};

export default TicketDateCom;
