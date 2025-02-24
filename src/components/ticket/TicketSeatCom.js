import { useState, useEffect } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../../css/ticket.css";

const ROWS = 7; // 세로 줄 수
const COLS = 10; // 가로 좌석 수
const SEAT_PRICE = 15000;

const TicketSeatCom = () => {
    const location = useLocation(); // ✅ useLocation()을 컴포넌트 내부에서 호출
    const [searchParams] = useSearchParams();
    const scheduleId = searchParams.get("scheduleId"); // URL에서 가져옴
    const { movieDetails, selectedDate, selectedCinema, selectedStartTime } = location.state || {}; // state에서 가져옴

    // console.log(JSON.stringify(location.state, null, 2));
    // 상태 변수 정의
    const [movieDetailsState, setMovieDetails] = useState(movieDetails || {});  // 영화 정보 상태
    const [selectedDateState, setSelectedDate] = useState(selectedDate || "");  // 선택된 날짜 상태
    const [selectedCinemaState, setSelectedCinema] = useState(selectedCinema || "");  // 선택된 상영관 상태
    const [selectedStartTimeState, setSelectedStartTime] = useState(selectedStartTime || "");  // 선택된 시작 시간 상태
    const [seatIds, setSelectedSeats] = useState(new Set());  // 선택된 좌석 목록
    const [disabledSeats, setDisabledSeats] = useState(new Set());  // 예매 완료된 좌석
    const [totalAmount, setTotalAmount] = useState(0);  // 총 금액 계산
    const navigate = useNavigate();

    

    useEffect(() => {
        // console.log("🎬 useEffect 실행됨");
        // console.log("📌 location.state:", location.state);
        // console.log("scheduleId : ",scheduleId)
        if (scheduleId) {
            console.log("📡 서버 요청 시작");
            const fetchMovieData = async () => {
                try {
                    const response = await Axios.get("http://localhost:8080/root/member/schedule/seatselect", {
                        params: { scheduleId }
                    });

                    console.log("서버에서 받은 데이터:", response.data);
                    const movieInfo = response.data.data;
                    
    
                    // 🔽 예매된 좌석을 Set으로 변환하여 저장
                    const reservedSeats = new Set(movieInfo.reservedSeats.map(seat => seat.SEATID));
                    setDisabledSeats(reservedSeats);
                } catch (error) {
                    console.error("❌ 영화 데이터를 가져오는 데 실패했습니다.", error);
                }
            };

            fetchMovieData();
        }
    }, [location.state, scheduleId]);

    // 좌석 클릭 핸들러
    const handleSeatClick = (row, col) => {
        const seatId = `${String.fromCharCode(65 + row)}${col+1}`;

        // 예매된 좌석은 클릭하지 못하도록 처리
        if (disabledSeats.has(seatId)) return;

        setSelectedSeats((prev) => {
            const newSelected = new Set(prev);
            newSelected.has(seatId) ? newSelected.delete(seatId) : newSelected.add(seatId);
            return newSelected;
        });
    };

    // 총 금액 계산
    useEffect(() => {
        setTotalAmount(seatIds.size * SEAT_PRICE);
    }, [seatIds]);

    // 예매 정보 및 좌석 정보 정리
    const seatIdsList = [...seatIds].join(", ");

    // 결제 완료 후 페이지 이동
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (seatIds.size === 0) {
            alert("좌석을 선택해주세요.");
            return; // 예매 진행하지 않음
        }
        
        // 예매 정보를 서버에 제출하는 API 호출 (예시)
        try {
            const response = await Axios.post("http://localhost:8080/root/member/reserve/reservation", {
                scheduleId,
                seatIds: [...seatIds],
                totalAmount: totalAmount, //서버 연결해서 스케쥴id, 선택좌석, 총 금액 전달함
                withCredentials: true  // ✅ 세션 쿠키를 서버에 전달하는 설정
            });
            console.log("✅ 예매 성공:", response.data);
            navigate("/payment", { //payment 페이지로 이동
                state: {
                    movieDetails: movieDetailsState,
                    selectedDate: selectedDateState,
                    selectedCinema: selectedCinemaState,
                    selectedStartTime: selectedStartTimeState,
                    seatIds: [...seatIds],
                    totalAmount // 추가로 state에 영화정보, 좌석정보 등 전달함
                }
            });

        } catch (error) {
            console.error("❌ 예매 중 오류 발생:", error);
        }
    };

    return (
        <div className="ticketSeat">
            <div className="ticketSeatBox">
                <div className="screenView">SCREEN</div>

                {/* 좌석 배치 */}
                <div className="seatBox">
                    {Array.from({ length: ROWS }, (_, row) => (
                        <div key={row} className="seatRow">
                            {Array.from({ length: COLS }, (_, col) => {
                                const seatId = `${String.fromCharCode(65 + row)}${col + 1}`;
                                const isDisabled = disabledSeats.has(seatId);
                                const isSelected = seatIds.has(seatId);

                                return (
                                    <button
                                        key={seatId}
                                        className={`seat ${
                                            isDisabled
                                                ? "impossibleSeat"
                                                : isSelected
                                                ? "selectSeat"
                                                : "possibleSeat"
                                        }`}
                                        onClick={() => handleSeatClick(row, col)}
                                        disabled={isDisabled}
                                    >
                                        {seatId}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* 좌석 설명 */}
                <div className="seatEx">
                    <div><div className="possibleSeat" />예매 가능</div>
                    <div><div className="impossibleSeat" />예매 완료</div>
                    <div><div className="selectSeat" />선택 좌석</div>
                </div>
            </div>

            {/* 예매 정보 */}
            <div className="buySeat">
                <div className="selectMovieInfo">
                    {movieDetailsState.posterurl && <img src={`/img/${movieDetailsState?.posterurl}`} alt={movieDetailsState?.title} />}
                    <div>
                        <div>{movieDetailsState?.title || "정보 없음"}</div>
                        <div>감독 : <span>{movieDetailsState?.director || "정보 없음"}</span></div>
                        <div>배우 : <span>{movieDetailsState?.actors || "정보 없음"}</span></div>
                    </div>
                </div>
                <div className="selectDateInfo">
                    <div>
                        일시 : <span>{selectedDateState || "정보 없음"}</span> <span>{selectedStartTimeState || "정보 없음"}</span><br />
                        상영관 : {selectedCinemaState || "정보 없음"}
                    </div>
                    <div>인원 : {seatIds.size > 0 ? `${seatIds.size}명` : ""}</div>
                    <div>좌석번호 : {seatIds.size > 0 ? [...seatIds].join(", ") : ""}</div>
                    <div>총 금액 : <span className="amount">{seatIds.size > 0 ? `${totalAmount.toLocaleString()}원` : ""}</span></div>
                </div>

                <div className="buySeatBtn">
                    <button className="resetbtn" onClick={() => setSelectedSeats(new Set())}>좌석 선택 초기화</button>
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="seatIds" value={seatIdsList} />
                        <button className="ticketBuyBtn" type="submit">결제하기</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TicketSeatCom;
