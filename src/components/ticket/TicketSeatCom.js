import { useState } from "react";
import { useNavigate } from "react-router-dom";  // 🔹 useNavigate 추가
import "../../css/ticket.css";

const ROWS = 7;
const COLS = 10;
const SEAT_PRICE = 15000;

const TicketSeatCom = () => {
    const navigate = useNavigate();  // 🔹 useNavigate 사용
    const disabledSeats = new Set(["B-3", "E-6", "G-1", "G-2"]); 
    const [selectedSeats, setSelectedSeats] = useState(new Set());

    // 좌석 클릭 핸들러
    const handleSeatClick = (row, col) => {
        const seatId = `${String.fromCharCode(65 + row)}-${col}`;
        if (disabledSeats.has(seatId)) return;

        setSelectedSeats((prev) => {
            const newSelected = new Set(prev);
            newSelected.has(seatId) ? newSelected.delete(seatId) : newSelected.add(seatId);
            return newSelected;
        });
    };

    const totalAmount = selectedSeats.size > 0 ? selectedSeats.size * SEAT_PRICE : "";
    const selectedSeatsList = [...selectedSeats].join(", ");

    // 🔹 결제 버튼 클릭 시 결제 페이지로 이동
    const handleSubmit = (e) => {
        e.preventDefault(); // 🔹 기본 폼 제출 방지 (페이지 새로고침 방지)
        navigate("/payment", { state: { selectedSeats: [...selectedSeats] } });  // 🔹 선택한 좌석 정보를 state로 전달
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
                                const seatId = `${String.fromCharCode(65 + row)}-${col + 1}`;
                                const isDisabled = disabledSeats.has(seatId);
                                const isSelected = selectedSeats.has(seatId);

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
                                        onClick={() => handleSeatClick(row, col + 1)}
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
                    <div><div className="possibleSeat"/>예매 가능</div>
                    <div><div className="impossibleSeat"/>예매 완료</div>
                    <div><div className="selectSeat"/>선택 좌석</div>
                </div>
            </div>

            {/* 예매 정보 */}
            <div className="buySeat">
                <div className="selectMovieInfo">
                    <img src="../../img//poster/poster1.jpg"/>
                    <div>
                        <div>미키 17</div>
                        <div>Mickey 17</div>
                        <div>감독 : <span>봉준호</span></div>
                        <div>배우 : <span>로버트 패틴슨, 나오미 아키에</span></div>
                    </div>
                </div>
                <div className="selectDateInfo">
                    <div>
                        일시 : <span>상영날짜</span> <span>상영시간</span><br/>
                        상영관 : (상영관이름)
                    </div>
                    <div>인원 : {selectedSeats.size > 0 ? `${selectedSeats.size}명` : ""}</div>
                    <div>좌석번호 : {selectedSeats.size > 0 ? selectedSeatsList : ""}</div>
                    <div>총 금액 : <span className="amount">{selectedSeats.size > 0 ? `${totalAmount.toLocaleString()}원` : ""}</span></div>
                </div>

                {/* 🔹 결제 버튼 클릭 시 handleSubmit 실행 */}
                <div className="buySeatBtn">
                    <button className="resetbtn" onClick={() => setSelectedSeats(new Set())}>좌석 선택 초기화</button>
                    <form onSubmit={handleSubmit}>  {/* 🔹 폼을 통해 handleSubmit 실행 */}
                        <button className="ticketBuyBtn" type="submit">결제하기</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TicketSeatCom;
