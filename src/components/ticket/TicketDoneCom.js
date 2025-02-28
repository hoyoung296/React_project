import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/ticket.css';

function TicketDoneCom() {
    const navigate = useNavigate();
    
    const storedMovieTitle = localStorage.getItem('movieTitle');
    const movieTitle = storedMovieTitle ? JSON.parse(storedMovieTitle) : null;
    const storedMovieDirector = localStorage.getItem('movieDirector');
    const movieDirector = storedMovieDirector ? JSON.parse(storedMovieDirector) : null;
    const storedMovieActors = localStorage.getItem('movieActors');
    const movieActors = storedMovieActors ? JSON.parse(storedMovieActors) : null;
    const storedMoviePosterUrl = localStorage.getItem('moviePosterUrl');
    const moviePosterUrl = storedMoviePosterUrl ? JSON.parse(storedMoviePosterUrl) : null;
    const storedSelectedDate = localStorage.getItem('selectedDate');
    const selectedDate = storedSelectedDate ? JSON.parse(storedSelectedDate) : null;
    const storedSelectedCinema = localStorage.getItem('selectedCinema');
    const selectedCinema = storedSelectedCinema ? JSON.parse(storedSelectedCinema) : null;
    const storedSelectedStartTime = localStorage.getItem('selectedStartTime');
    const selectedStartTime = storedSelectedStartTime ? JSON.parse(storedSelectedStartTime) : null;
    const storedTotalAmount = localStorage.getItem('totalAmount');
    const totalAmount = storedTotalAmount ? JSON.parse(storedTotalAmount) : 0;
    const storedReservationId = localStorage.getItem('reservationId');
    const reservationId = storedReservationId ? JSON.parse(storedReservationId) : null;
    const storedScheduleId = localStorage.getItem('scheduleId');
    const scheduleId = storedScheduleId ? JSON.parse(storedScheduleId) : null;
    const storedSeatIds = localStorage.getItem('seatIds')
    const seatIds = storedSeatIds ? JSON.parse(storedSeatIds) : []; 
    
    const goToMyPage = () => {
        navigate("/myTicket");
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