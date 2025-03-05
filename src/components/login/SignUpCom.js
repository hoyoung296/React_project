import React, { useState, useEffect } from 'react';
import '../../css/login.css';

const SignUpCom = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    useEffect(() => {
        // script 태그를 동적으로 추가
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.body.appendChild(script);

        // cleanup: 컴포넌트가 언마운트될 때 script 제거
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // 주소 검색 기능
    const handlePostcodeSearch = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                let addr = ''; // 주소 변수

                if (data.userSelectedType === 'R') { // 도로명 주소
                    addr = data.roadAddress;
                } else { // 지번 주소
                    addr = data.jibunAddress;
                }

                setPostcode(data.zonecode);
                setAddress(addr);
                setDetailAddress(''); // 상세주소는 빈 값으로 초기화
            }
        }).open();
    };

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
                {/* 우편번호 찾기 버튼 */}
                <input type="text" className="input_text" value={postcode} placeholder="우편번호" readOnly />
                    <button type="button" onClick={handlePostcodeSearch}>우편번호 찾기</button>
                    <input type="text" className="input_text" value={address} placeholder="주소" readOnly />
                    <input type="text" className="input_text" value={detailAddress} placeholder="상세주소" onChange={(e) => setDetailAddress(e.target.value)} />
                
                <button className='sign_btn'>Sign up</button>
            </div>
        </div>
        <div className='backgroundImg'/>
    </div>
    );
};

export default SignUpCom;