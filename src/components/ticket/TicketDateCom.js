import { useState, useEffect } from "react";
import Axios from "axios";
import { useSearchParams } from "react-router-dom";
import "../../css/ticket.css";

// TicketDateCom 컴포넌트: URL 쿼리에서 영화 제목(title)을 받아 해당 영화의 상영 날짜 데이터를 API로부터 불러와 표시합니다.
const TicketDateCom = () => {
    // 1. 상태 변수 선언
    // showtimes: API에서 불러온 상영 날짜 데이터를 저장 (초기값은 빈 배열)
    // selectedDate: 사용자가 선택한 날짜를 저장 (초기값은 빈 문자열)
    const [showtimes, setShowtimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");

    // 2. URL 쿼리 파라미터에서 title 값 추출
    // useSearchParams를 이용해 현재 URL에 포함된 쿼리 파라미터에 접근합니다.
    const [searchParams] = useSearchParams();
    const title = searchParams.get("title"); // 예: URL에 ?title=말할수없는비밀 이면 "말할수없는비밀"을 추출

    // 3. useEffect: 컴포넌트 마운트 후 또는 title이 변경될 때 API 호출
    useEffect(() => {
        // title 파라미터가 없으면 경고 메시지 출력 후 종료
        if (!title) {
            console.warn("URL에 title 파라미터가 없습니다.");
            return;
        }
        // API 요청을 위한 비동기 함수 정의
        const fetchShowtimes = async () => {
            try {
                // Axios를 사용해 GET 요청을 보내고, 쿼리 파라미터로 title 전달
                const response = await Axios.get("http://192.168.0.91:8080/root/member/schedule/title", {
                    params: { title }
                });
                console.log("데이터 : ", response.data);
                // 응답 데이터 구조가 {"code":200,"message":"Success","data":[...]} 형태라면,
                // 내부 data 배열에서 각 항목의 STARTDATE 값을 추출하여 showtimes 상태를 업데이트합니다.
                setShowtimes(response.data.data.map(item => item.STARTDATE));
            } catch (error) {
                console.error("날짜 데이터를 가져오는 데 실패했습니다.", error);
            }
        };

        // 정의한 함수를 호출하여 API로부터 데이터를 가져옵니다.
        fetchShowtimes();
    }, [title]);  // 의존성 배열에 title을 넣어, title이 변경될 때마다 API 요청을 재실행

    // 4. handleSelect 함수: 날짜 버튼 클릭 시 선택 상태 토글
    const handleSelect = (date) => {
        setSelectedDate(prev => (prev === date ? "" : date));
    };

    // 5. JSX를 통해 UI 렌더링
    return (
        <div className="ticketCon">
            {/* 상영 날짜 버튼들을 표시하는 영역 */}
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
            {/* 추가 정보: 상영관 및 선택된 내용 표시 */}
            <div className="cinema">상영관</div>
            <div className="buyTicket">선택내용</div>
        </div>
    );
};

export default TicketDateCom;
