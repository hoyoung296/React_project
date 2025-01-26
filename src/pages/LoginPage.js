import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        //로그인 성공하면(아이디 패스워드 일치한지 확인)
        navigate('/');                                                                                                                                                                                                      
    };
    return (
    <div className='login_body'>
        <div className='login'>
            <div className='title_movie'>MOVIE</div>
            <div className='login_from'>
                <input type="text" className='input_id' required placeholder=" ID"/><br/>
                <input type="password" className='input_pwd' required placeholder=" PW"/>
                <button className='login_btn' onClick={handleLogin}>Login</button>
            </div>
            
        </div>
    </div>
)
};

export default LoginPage;