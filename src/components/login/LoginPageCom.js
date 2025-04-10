import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/login.css';
import { allList } from '../../service/search';

const LoginPageCom = () => {
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(null);

    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await allList()
                setList(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getData()
    }, [])

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
        if (stillUrls.length > 0 && !backgroundImage) {  // 배경이 없을 때만 랜덤 이미지를 설정
            const randomIndex = Math.floor(Math.random() * stillUrls.length);
            setBackgroundImage(stillUrls[randomIndex]);
        }
    }, [stillUrls, backgroundImage]);  // backgroundImage가 변경되지 않으면 다시 실행되지 않도록 조건 추가


    const handleLogin = async () => {
        try {
            // Axios를 이용한 서버 요청
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/root/login`, {
                userId,
                password
            });

            // 서버로부터 받은 응답 처리
            if (response.data.code === 200 && response.data.data) {
                // 로그인 성공 시, 서버에서 받은 데이터로 처리
                const { data } = response.data;
                console.log("로그인 data", data);

                localStorage.setItem("jwtToken", data.jwtToken);
                localStorage.setItem("refreshToken", data.refreshToken);

                navigate('/');
            } else {
                setErrorMessage('아이디나 비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('로그인 중 오류 발생:', error);
            setErrorMessage('서버와 연결할 수 없습니다. 나중에 다시 시도해 주세요.');
        }
    };

    // 카카오 로그인 버튼 클릭 시 호출되는 함수
    const kakaoLogin = (e) => {
        e.preventDefault();
        const popup = window.open(
            KAKAO_AUTH_URL,  // 로그인 URL
            "kakaoLoginPopup",  // 팝업 이름
            "width=500,height=600,scrollbars=yes"  // 팝업 창 크기와 설정
        );

        // 팝업 창이 닫히면 부모 창을 새로 고침하고, 팝업 창을 닫음
        const interval = setInterval(() => {
            if (popup.closed) {
                clearInterval(interval);
                // 부모 창 새로 고침
                window.location.reload();
            }
        }, 1000);
    };

    const goToSignPage = () => {
        navigate("/signup");
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className='login_body'>
            <div className='login'>
                <div className='title_movie' onClick={() => navigate("/")}>THEFILLM</div>
                <div className='login_from'>
                    <input
                        type="text"
                        className='input_id'
                        required
                        placeholder="ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />

                    <span className='loginpwdBtn'>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            className='input_pwd'
                            required
                            placeholder="PW"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                            <img
                                src={passwordVisible ? '../../img/pwdHide.png' : '../../img/pwdOpen.png'}
                                alt="toggle visibility"
                            />
                        </button>
                    </span>
                    <button className='login_btn' onClick={handleLogin}>Login</button>
                    {errorMessage && <div className="error_message">{errorMessage}</div>}
                    <div className='slmpleBtn'>
                        <button onClick={kakaoLogin}><img src='img/kakao_login_large.png' alt='kakaoLogin' /></button>
                    </div>
                    <div className='userBtn'>
                        <button onClick={() => navigate("/find/id")}>아이디찾기</button>|
                        <button onClick={() => navigate("/find/pw")}>비밀번호찾기</button>|
                        <button onClick={goToSignPage}>회원가입</button>
                    </div>

                </div>
            </div>
            {backgroundImage && <img className='backgroundImg' src={backgroundImage} alt="background" />}
        </div>
    )
};

export default LoginPageCom;