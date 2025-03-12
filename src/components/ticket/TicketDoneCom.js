import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/ticket.css';

function TicketDoneCom() {
    const navigate = useNavigate();

    const moviePosterUrl = localStorage.getItem("moviePosterUrl");
    const movieDirector = localStorage.getItem("movieDirector");
    const movieActors = localStorage.getItem("movieActors");
    const movieTitle = localStorage.getItem("movieTitle");
    const selectedDate = localStorage.getItem("selectedDate");
    const selectedCinema = localStorage.getItem("selectedCinema");
    const selectedStartTime = localStorage.getItem("selectedStartTime");
    const totalAmount = JSON.parse(localStorage.getItem("totalAmount") || "0");
    const reservationId = localStorage.getItem('reservationId');
    const seatIds = JSON.parse(localStorage.getItem("seatIds")) || [];
    
    const [userId, setUserId] = useState(null);

    const storedUser = localStorage.getItem("user");
    if (userId) {
        const userData = JSON.parse(storedUser);
        setUserId(userData.userId || null); // userId 설정, 마이페이지 넘어갈 때 id가 필요해서 작성(나호영 작성)
    }

    const goToMyPage = () => {
        navigate(`/mypage/ticket?id=${userId}&start=`);
        localStorage.removeItem("moviePosterUrl");
        localStorage.removeItem("movieDirector");
        localStorage.removeItem("movieActors");
        localStorage.removeItem("movieTitle");
        localStorage.removeItem("selectedDate");
        localStorage.removeItem("selectedCinema");
        localStorage.removeItem("selectedStartTime");
        localStorage.removeItem("totalAmount");
        localStorage.removeItem("reservationId");
        localStorage.removeItem("seatIds");
        localStorage.removeItem("scheduleId");
    }

    return (
    <div className='donePage'>
        <div>
            <h2>예매가 완료되었습니다</h2>
        </div>
        <div className='done'>
            {moviePosterUrl && <img src={moviePosterUrl} alt={movieTitle} />}
            <div className='doneInfo'>
                <div className='doneTitle'>
                    {movieTitle}
                </div>
                <div>
                    <span>{movieDirector}</span><br/>
                    <span>{movieActors}</span>
                </div>
                <div>
                        <div>
                            <p>예매번호</p>
                            <p>관람일자</p>
                            <p>관람일시</p>
                            <p>상영관</p>
                            <p>좌석번호 </p>
                        </div>
                        <div>
                            <p>{reservationId}</p>
                            <p>{selectedDate}</p>
                            <p>{selectedStartTime}</p>
                            <p>{selectedCinema}</p>
                            <p>{seatIds}</p>
                        </div>
                    </div>
            </div>
        </div>
        <button onClick={goToMyPage}>내 예매내역 보러가기</button>
    </div>
)
};

export default TicketDoneCom;