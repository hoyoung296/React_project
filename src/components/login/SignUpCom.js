import React, { useState, useEffect } from 'react';
import '../../css/login.css';

const SignUpCom = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    return(
        <div className='login_body'>
        <div className='sign'>
            <div className='title_movie'>THEFILLM</div>
            <div className='login_from'>
                <input type="text" className='input_text' required placeholder="아이디"/>
                <input type="password" className='input_text' required placeholder="비밀번호"/>
                <input type="password" className='input_text' required placeholder="비밀번호 확인"/>
                <input type="text" className='input_text' required placeholder="닉네임"/>
                <input type="email" className='input_text' required placeholder="이메일"/>
                <input type="tel" className='input_text' required placeholder="연락처"/>
                <input type="text" className='input_text' required placeholder="주소"/>
                <input type="text" className='input_text' required placeholder="상세주소"/>
                <button className='sign_btn'>Sign up</button>
            </div>
        </div>
        <div className='backgroundImg'/>
    </div>
    );
};

export default SignUpCom;