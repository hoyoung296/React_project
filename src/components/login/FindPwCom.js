import React, { useState, useEffect } from 'react';
import '../../css/login.css';
import { useNavigate } from 'react-router-dom';
import { allList } from '../../service/search';
import axios from 'axios';

function FindPwCom() {
    const [list, setList] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const navigate = useNavigate();
    const [userId, setUserId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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

    const handleFindPw = async () => {
        try {
            console.log("📤 요청 보냄: ", { userId });

            const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/root/mail/sendTempPassword`, {
                userId
            });


            console.log("📥 서버 응답 전체:", response);
            console.log("📥 서버 응답 데이터:", response.data);

            // ✅ 서버 응답의 "status" 값이 "success"인지 확인
            if (response.data.status === "success") {
                setErrorMessage('');
                console.log("✅ 임시비밀번호 전송 성공:", response.data);
                alert("임시비밀번호가 입력하신 메일 주소로 전송되었습니다.");
                navigate("/");
            } else {
                setErrorMessage('해당 이메일(ID)로 등록된 회원이 없습니다.');
                console.log("⚠️ 비밀번호 찾기 실패: ", response.data.message);
            }
        } catch (error) {
            // ✅ 서버에서 400 응답을 보냈을 때의 처리
            if (error.response && error.response.status === 400) {
                console.log("📥 서버 응답 (400 오류):", error.response.data);

                if (error.response.data.status === "error") {
                    setErrorMessage(error.response.data.message || '해당 이메일(ID)로 등록된 회원이 없습니다.');
                    console.log("⚠️ 비밀번호 찾기 실패: ", error.response.data.message);
                } else {
                    setErrorMessage('서버에서 예상치 못한 응답을 받았습니다.');
                    console.error("❌ 예기치 않은 400 응답 데이터:", error.response.data);
                }
            } else {
                // ✅ 서버와의 연결이 실패한 경우 처리
                console.error('❌ 비밀번호 찾기 중 오류 발생:', error);
                setErrorMessage('서버와 연결할 수 없습니다. 나중에 다시 시도해 주세요.');
            }
        }
    };



    return (
        <div className='login_body'>
            <div className='login'>
                <div className='title_movie' onClick={() => navigate("/")}>THEFILLM</div>
                <div className='findId_from'>
                    <p>아이디를 입력해주세요.</p>
                    <input
                        type="email"
                        className='input_text'
                        placeholder="아이디 (이메일)"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    {errorMessage && <div className="error_message">{errorMessage}</div>}
                </div>
                {backgroundImage && <img className='backgroundImg' src={backgroundImage} alt="background" />}
                <div className="findId_btn_container">
                    <button className="findPw_btn" onClick={handleFindPw}>임시 비밀번호 전송</button>
                </div>
            </div>
        </div>
    );
};

export default FindPwCom;
