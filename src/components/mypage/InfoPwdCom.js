import React from 'react';
import MypageSidebar from "../common/MypageSidebar"
import { useNavigate } from 'react-router-dom';
import '../../css/mypage.css';


function InfoPwdCom() {
    const navigate = useNavigate();

    const handleInfoPwd = () => {
        console.log("비밀번호 일치한지 확인");
        navigate('/info');
    };
    return (
    <div className='mypagePwd'>
        <MypageSidebar activeLink="회원정보 수정" />
        <div className='infoPwdMain'>
            <p>비밀번호를 입력해주세요.</p>
            <input type="password" className='infoPwd' required placeholder="PW"/>
            <button className='infoPwdBtn' onClick={handleInfoPwd}>확인</button>
        </div>
    </div>
)
};

export default InfoPwdCom;