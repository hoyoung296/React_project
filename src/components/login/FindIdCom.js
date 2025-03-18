import React, { useState, useEffect } from 'react';
import '../../css/login.css';
import { allList } from '../../service/search';
import axios from 'axios';

function FindIdCom() {
    const [list, setList] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userId, setUserId] = useState(''); // 아이디 저장 상태 추가

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

    const today = new Date();
    const TopMovies = list
        .map(movie => {
            const [date, rank] = movie.movieRank.split("-");
            const movieDate = new Date(date);
            return {
                ...movie,
                movieDate,
                movieRank: parseInt(rank),
            };
        })
        .filter(movie => movie.movieRank <= 5)
        .sort((a, b) => {
            const diffA = Math.abs(today - a.movieDate);
            const diffB = Math.abs(today - b.movieDate);
            return diffA - diffB;
        })
        .slice(0, 5);

    const stillUrls = TopMovies.length > 0 ? TopMovies.map(movie => movie.stillUrl) : [];

    useEffect(() => {
        if (stillUrls.length > 0 && !backgroundImage) {
            const randomIndex = Math.floor(Math.random() * stillUrls.length);
            setBackgroundImage(stillUrls[randomIndex]);
        }
    }, [stillUrls, backgroundImage]);

    const handleFindId = async () => {
        try {
            const response = await axios.post('http://localhost:8080/root/findId', {
                phoneNumber: phoneNumber, // 서버로 전달할 값
            });

            if (response.data.code === 200 && response.data.data?.userId) {
                setUserId(response.data.data.userId); // 아이디 저장
                setErrorMessage('');
            } else {
                setUserId('');
                setErrorMessage('해당 번호로 등록된 아이디가 없습니다.');
            }
        } catch (error) {
            console.error('아이디 찾기 중 오류 발생:', error);
            setUserId('');
            setErrorMessage('서버와 연결할 수 없습니다. 나중에 다시 시도해 주세요.');
        }
    };

    return (
        <div className='login_body'>
            <div className='sign'>
                <div className='title_movie'>THEFILLM</div>
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
                    {userId && <div className="success_message">회원님의 아이디는 "{userId}" 입니다.</div>}
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
