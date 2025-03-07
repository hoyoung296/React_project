import React from 'react';
import MypageSidebar from "../common/MypageSidebar"
import '../../css/mypage.css';

function InfoCom() {
    return (
    <div className='mypage'>
        <MypageSidebar activeLink="회원정보 수정" />
        <div className='infoMain'>
            <div>
                회원정보수정
                아이디
                닉네임
                비밀번호
                비밀번호확인
                이메일
                전화번호
                주소
                상세주소
                탈퇴하기
            </div>
            <div>
                프로필이미지
                프로필이미지수정
                저장하기
            </div>
        </div>
    </div>
)
};

export default InfoCom;