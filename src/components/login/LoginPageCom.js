import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login.css';

const LoginPageCom = () => {
    const navigate = useNavigate();

    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;


    const handleLogin = () => {
        //로그인 성공하면(아이디 패스워드 일치한지 확인)
        navigate('/'

        );
    };

     // 카카오 로그인 버튼 클릭 시 호출되는 함수
     const kakaoLogin = (e) => {
        e.preventDefault();
        window.location.href = KAKAO_AUTH_URL;
    };
    return (
    <div className='login_body'>
        <div className='login'>
            <div className='title_movie'>THEFILLM</div>
            <div className='login_from'>
                <input type="text" className='input_id' required placeholder="ID"/>
                <input type="password" className='input_pwd' required placeholder="PW"/>
                <button className='login_btn' onClick={handleLogin}>Login</button>
                <div className='slmpleBtn'>
                    <button>N</button>
                    <button onClick={kakaoLogin}>K</button>
                    <button>G</button>
                </div>
                <div className='userBtn'>
                    <button>아이디찾기</button>|
                    <button>비밀번호찾기</button>|
                    <button>회원가입</button>
                </div>
                
            </div>
        </div>
        <div className='backgroundImg'/>
    </div>
    )
};

export default LoginPageCom;