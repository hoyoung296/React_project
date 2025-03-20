import React, { useState } from 'react';
import MypageSidebar from "../common/MypageSidebar"
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../../css/mypage.css';

function InfoPwdCom() {
    const navigate = useNavigate();
    const [params] = useSearchParams()
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const userId = params.get("id")

    const handleInfoPwd = async () => {
        try {
            const response = await axios.post('http://localhost:8080/root/check-password', {
                userId,
                password
            });
            console.log('서버 응답:', response);

            // 서버로부터 받은 응답 처리
            if (response.data.code === 1) {
                navigate(`/mypage/info?id=${userId}`);
            } else {
                setErrorMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('로그인 중 오류 발생:', error);
            setErrorMessage('서버와 연결할 수 없습니다. 나중에 다시 시도해 주세요.');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleInfoPwd();
        }
    };

    return (
    <div className='mypagePwd'>
        <MypageSidebar activeLink="회원정보 수정" />
        <div className='infoPwdMain'>
            <p>비밀번호를 입력해주세요.</p>
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
                    className='infopwdeye'
                    onClick={() => setPasswordVisible(!passwordVisible)}
                >
                    <img 
                        src={passwordVisible ? '../../img/pwdHide.png' : '../../img/pwdOpen.png'} 
                        alt="toggle visibility" 
                    />
                </button>
            </span>
            <button className='infoPwdBtn' onClick={handleInfoPwd}>확인</button>
            {errorMessage && <div className="error_message">{errorMessage}</div>}
        </div>
    </div>
)
};

export default InfoPwdCom;