import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../common/axiosConfig'
import '../../css/ticket.css'

function TicketDoneCom() {
    const navigate = useNavigate()
    const moviePosterUrl = sessionStorage.getItem("moviePosterUrl")
    const movieDirector = sessionStorage.getItem("movieDirector")
    const movieActors = sessionStorage.getItem("movieActors")
    const movieTitle = sessionStorage.getItem("movieTitle")
    const selectedDate = sessionStorage.getItem("selectedDate")
    const selectedCinema = sessionStorage.getItem("selectedCinema")
    const selectedStartTime = sessionStorage.getItem("selectedStartTime")
    const reservationId = sessionStorage.getItem('reservationId')
    const seatIds = JSON.parse(sessionStorage.getItem("seatIds")) || []
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('jwtToken')
        console.log("토큰 : " + token)
        if (token) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/root/member/user/info`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // 필요한 값만 추출하여 state에 저장
                const { userId } = res.data
                setUserId(userId)
            })
            .catch((err) => {
                console.error('JWT 검증 실패:', err)
            })
        }
    }, [])

    console.log("userId : ", userId)

    const goToMyPage = () => {
        navigate(`/mypage/ticket?id=${userId}&start=`)
        sessionStorage.removeItem("moviePosterUrl")
        sessionStorage.removeItem("movieDirector")
        sessionStorage.removeItem("movieActors")
        sessionStorage.removeItem("movieTitle")
        sessionStorage.removeItem("selectedDate")
        sessionStorage.removeItem("selectedCinema")
        sessionStorage.removeItem("selectedStartTime")
        sessionStorage.removeItem("totalAmount")
        sessionStorage.removeItem("reservationId")
        sessionStorage.removeItem("seatIds")
        sessionStorage.removeItem("scheduleId")
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')
        
        return `${year}년 ${month}월 ${day}일`
    }
    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(":").map(num => num.padStart(2, '0')) // 시간과 분을 분리하고 두 자리 유지

        return `${hours}시 ${minutes}분`
    }

    const getSortedSeatIds = (seatSet) => {
        return [...seatSet].sort((a, b) => {
            const rowA = a.charAt(0)
            const rowB = b.charAt(0)
            const numA = parseInt(a.slice(1), 10)
            const numB = parseInt(b.slice(1), 10)
    
            return rowA === rowB ? numA - numB : rowA.localeCompare(rowB)
        }).join(", ")
    }
    const formatReservationId = (id) => {
        return id ? id.replace(/(\d{4})(?=\d)/g, "$1-") : ""
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
                            <p>{formatReservationId(reservationId)}</p>
                            <p>{formatDate(selectedDate)}</p>
                            <p>{formatTime(selectedStartTime)}</p>
                            <p>{selectedCinema}</p>
                            <p>{getSortedSeatIds(seatIds)}</p>
                        </div>
                    </div>
            </div>
        </div>
        <button onClick={goToMyPage}>내 예매내역 보러가기</button>
    </div>
)
}

export default TicketDoneCom