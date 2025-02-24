import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login.css';

const LoginPageCom = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        //로그인 성공하면(아이디 패스워드 일치한지 확인)
        navigate('/'

        );
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
                    <button>K</button>
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