import { useState } from "react";
import "../../css/ticket.css";

const ROWS = 7;  // 세로 줄 수
const COLS = 10;  // 가로 좌석 수

const TicketSeatCom = () => {
    // 선택 불가능한 좌석 예제 데이터 (랜덤 배치 가능)
    const disabledSeats = new Set(["2-3", "5-6", "10-1", "14-7"]); 

    // 선택된 좌석 목록을 저장
    const [selectedSeats, setSelectedSeats] = useState(new Set());

    // 좌석 클릭 핸들러
    const handleSeatClick = (row, col) => {
        const seatId = `${row}-${col}`;

        // 선택 불가능한 좌석이면 클릭 무시
        if (disabledSeats.has(seatId)) return;

        // 좌석 선택/해제
        setSelectedSeats((prev) => {
            const newSelected = new Set(prev);
            if (newSelected.has(seatId)) {
                newSelected.delete(seatId); // 이미 선택한 좌석이면 해제
            } else {
                newSelected.add(seatId); // 새 좌석 선택
            }
            return newSelected;
        });
    };

    return (
        <div className="ticketSeat">
            <div className="ticketSeatBox">
                <div className="screenView">스크린</div>

                {/* 좌석 배치 */}
                <div className="seatBox">
                    {Array.from({ length: ROWS }, (_, row) => (
                        <div key={row} className="seatRow">
                            {Array.from({ length: COLS }, (_, col) => {
                                const seatId = `${row + 1}-${col + 1}`;
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
                                        onClick={() => handleSeatClick(row + 1, col + 1)}
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
                    <div className="possibleSeat">선택 가능</div>
                    <div className="impossibleSeat">선택 불가</div>
                    <div className="selectSeat">선택됨</div>
                </div>
            </div>

            {/* 예매 정보 */}
            <div className="buySeat">
                <div className="selectMovieInfo">영화정보(포스터, 제목, 감독, 배우)</div>
                <div className="selectDateInfo">
                    <div>상영일시(상영시간), 상영관</div>
                    <div>인원: {selectedSeats.size}명, 좌석번호: {[...selectedSeats].join(", ")}</div>
                </div>

                <div className="buySeatBtn">
                    <button onClick={() => setSelectedSeats(new Set())}>좌석 선택 초기화</button>
                    <from>결제하기</from>
                </div>
            </div>
        </div>
    );
};

export default TicketSeatCom;
