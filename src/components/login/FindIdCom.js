import React, { useState, useEffect } from 'react';
import '../../css/login.css';
import { useNavigate } from 'react-router-dom';
import { allList } from '../../service/search';
import axios from 'axios';

function FindIdCom() {
    const [list, setList] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userId, setUserId] = useState(''); // 아이디 저장 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await allList();
                setList(data);
            } catch (error) {
                console.error("데이터 가져오기 오류:", error);
            }
        };
        getData();
    }, []);

    // rank를 기준으로 필터링 및 날짜와 순위를 분리하여 처리
    const today = new Date();
    const TopMovies = list
    .map(movie => {
        const [date, rank] = movie.movieRank.split("-"); // 날짜-순위 분리
        const formattedDate = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`; // '20250325' -> '2025-03-25'로 변환
        const movieDate = new Date(formattedDate);
        return {
            ...movie,
            movieDate,
            movieRank: parseInt(rank),
        };
    })
    .sort((a, b) => {
        const diffA = Math.abs(today - a.movieDate);
        const diffB = Math.abs(today - b.movieDate);
        return diffA - diffB; // 날짜가 같다면 순위 비교
    })
    .filter(movie => movie.movieRank <= 5) // 순위 5 이하 필터링
    .slice(0, 5); // 상위 5개 선택

    const stillUrls = TopMovies.length > 0 ? TopMovies.map(movie => movie.stillUrl) : [];

    useEffect(() => {
        if (stillUrls.length > 0 && !backgroundImage) {
            const randomIndex = Math.floor(Math.random() * stillUrls.length);
            setBackgroundImage(stillUrls[randomIndex]);
        }
    }, [stillUrls, backgroundImage]);

    const maskUserId = (id) => {
        if (id.length <= 3) return id;
        return id.slice(0, 3) + '***' + id.slice(6);
    };

    const handleFindId = async () => {
        try {
            console.log("📤 요청 보냄: ", { phoneNumber });
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/root/findId`, {
                phoneNumber: phoneNumber, // 서버로 전달할 값
            });
            console.log("📥 서버 응답 전체:", response);
            console.log("📥 서버 응답 데이터:", response.data);

            if (response.data !== null) { // 서버에서 아이디 반환 시
            const maskedId = maskUserId(response.data);
            setUserId(maskedId); // 마스킹된 아이디 저장
            setErrorMessage('');
            console.log("✅ 아이디 찾기 성공 (마스킹 적용):", maskedId);
        } else { 
            setUserId('');
            setErrorMessage('해당 번호로 등록된 아이디가 없습니다.');
            console.log("⚠️ 아이디 찾기 실패: 일치하는 아이디 없음");
        }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log("📥 서버 응답: ", error.response.data);
                
                // error.response.data 내부를 확인하여 판단
                if (error.response.data.data === null) {  
                    setUserId('');
                    setErrorMessage('해당 번호로 등록된 아이디가 없습니다.');
                    console.log("⚠️ 아이디 찾기 실패: 400 Bad Request (일치하는 아이디 없음)");
                } else {
                    console.error("❌ 예기치 않은 400 응답 데이터:", error.response.data);
                    setUserId('');
                    setErrorMessage('서버에서 예상치 못한 응답을 받았습니다.');
                }
            } else {
                console.error('❌ 아이디 찾기 중 오류 발생:', error);
                setUserId('');
                setErrorMessage('서버와 연결할 수 없습니다. 나중에 다시 시도해 주세요.');
            }
        }
    };

    return (
        <div className='login_body'>
            <div className='login'>
                <div className='title_movie' onClick={() => navigate("/")}>THEFILLM</div>
                <div className='findId_from'>
                    <p>회원가입 시 등록한 연락처를 입력해주세요.</p>
                    <input
                        type="tel"
                        className='input_text'
                        placeholder="연락처"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                    {userId && <div className="success_message">회원님의 아이디는 <div>{userId}</div> 입니다.</div>}
                    {errorMessage && <div className="error_message">{errorMessage}</div>}
                </div>
                {backgroundImage && <img className='backgroundImg' src={backgroundImage} alt="background" />}
                <div className="findId_btn_container">
                    <button className="findId_btn" onClick={handleFindId}>아이디 찾기</button>
                </div>
            </div>
        </div>
    );
}

export default FindIdCom;
