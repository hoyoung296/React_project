import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login.css';
import axios from 'axios';

const SignUpCom = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userName, setUserName] = useState('');
    const [userBirthday, setUserBirthday] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [serverVerificationCode, setServerVerificationCode] = useState('');


    const navigate = useNavigate();

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

    // 이메일 인증번호 요청
    const sendVerificationCode = async () => {
        try {
            const response = await axios.post('http://localhost:8080/root/mail/send-auth-code', {
                email: email
            }, {
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 200) {
                alert("인증번호가 이메일로 전송되었습니다.");
                setServerVerificationCode(response.data.verificationCode);  // 서버에서 반환한 인증번호 저장
                console.log("서버에서 받은 인증번호:", response.data.verificationCode);  // 확인용 로그
            }
        } catch (error) {
            console.error("이메일 인증 요청 실패:", error);
            alert("이메일 인증 요청 중 오류가 발생했습니다.");
        }
    };

    // 인증번호 확인
    const verifyCode = async () => {
        try {
            // 요청 전에 데이터 확인
            console.log("Email:", email);
            console.log("Verification Code:", verificationCode);
            if (verificationCode === serverVerificationCode) {
                setIsEmailVerified(true); // 인증 완료 상태 업데이트
                alert("이메일 인증이 완료되었습니다.");
            } else {
                setIsEmailVerified(false); // 인증 실패 상태 업데이트
                alert("인증번호가 올바르지 않습니다.");
            }
        } catch (error) {
            console.error("인증번호 확인 요청 실패:", error.response ? error.response.data : error.message);
            alert("인증번호 확인 중 오류가 발생했습니다.");
        }
    };


    const validateInputs = () => {
        const idRegex = /^[a-zA-Z0-9]{6,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,11}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!idRegex.test(userId)) {
            setErrorMessage("아이디는 6자 이상, 영문과 숫자만 포함해야 합니다.");
            return false;
        }
        if (!emailRegex.test(email)) {
            setErrorMessage("올바른 이메일 형식을 입력해주세요.");
            return false;
        }
        if (!phoneRegex.test(phoneNumber)) {
            setErrorMessage("연락처는 10~11자리 숫자로 입력해주세요.");
            return false;
        }
        if (!passwordRegex.test(password)) {
            setErrorMessage("비밀번호는 최소 8자 이상, 영문/숫자/특수문자를 포함해야 합니다.");
            return false;
        }
        return true;
    };

    // 회원가입 처리 함수
    const handleSignUp = async () => {
        if (!validateInputs()) return;

        if (!isEmailVerified) {
            alert("이메일 인증을 완료해야 회원가입이 가능합니다.");
            return;
        }
        // 비밀번호 확인
        if (password !== confirmPassword) {
            setErrorMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        // 생년월일을 yyyyMMdd 형식의 숫자로 변환
        const birthdayNumber = userBirthday.replace(/-/g, '');

        try {
            const memberData = {
                userId: userId,
                password: password,
                confirmPassword: confirmPassword,
                userName: userName,
                email: email,
                phoneNumber: phoneNumber,
                postNum: postcode,
                addr: address,
                detailAddr: detailAddress,
                userBirthday: birthdayNumber,
                isEmailVerified: isEmailVerified // 인증 상태 전송
            };
            //console.log('회원가입 데이터:', memberData); // 데이터를 콘솔에 출력

            const response = await axios.post('http://localhost:8080/root/register', memberData);
            if (response.status === 200) {
                alert("회원가입이 완료되었습니다.");
                navigate('/login'); // 로그인 페이지로 이동
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message); // 화면에 에러 메시지 표시
            } else {
                setErrorMessage("서버 오류로 인해 회원가입에 실패했습니다.");
            }
        }
    };

    return(
        <div className='login_body'>
        <div className='sign'>
            <div className='title_movie'>THEFILLM</div>
            <div className='sign_from'>
                <div>
                    <input type="text" className='input_text' placeholder="아이디" value={userId} onChange={(e) => setUserId(e.target.value)} required />
                    <span className='addrBtn'>
                        <input 
                                type={passwordVisible ? "text" : "password"} 
                                className='addr_text' 
                                placeholder="비밀번호" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}>
                                <img src={passwordVisible ? '../../img/pwdHide.png' : '../../img/pwdOpen.png'} alt="toggle visibility" />
                            </button>
                    </span>
                    <span className='addrBtn'>
                            <input 
                                type={confirmPasswordVisible ? "text" : "password"} 
                                className='addr_text' 
                                placeholder="비밀번호 확인" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                            />
                            <button type="button" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                                <img src={confirmPasswordVisible ? '../../img/pwdHide.png' : '../../img/pwdOpen.png'} alt="toggle visibility" />
                            </button>
                    </span>
                    <input type="text" className='input_text' placeholder="닉네임" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                    <input type="email" className='input_text' placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
<button type="button" onClick={sendVerificationCode}>인증번호 요청</button>

<input type="text" className='input_text' placeholder="인증번호 입력" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required />
<button type="button" onClick={verifyCode}>인증번호 확인</button>
                </div>
                <div>
                    <input type="tel" className='input_text' placeholder="연락처" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    <span className='addrBtn'>
                        <input type="text" className="addr_text" value={postcode} placeholder="우편번호 찾기" readOnly />
                        <button type="button" onClick={handlePostcodeSearch}><img src='../../img/search.png'/></button>
                    </span>
                    <input type="text" className="input_text" value={address} placeholder="주소" readOnly />
                    <input type="text" className="input_text" value={detailAddress} placeholder="상세주소" onChange={(e) => setDetailAddress(e.target.value)} />
                    <input type="text" className="input_text" value={userBirthday} placeholder="생년월일" onChange={(e) => setUserBirthday(e.target.value)} onFocus={(e) => (e.target.type = "date")} // 클릭 시 달력 표시
                    onBlur={(e) => (e.target.type = "text")}  // 포커스 해제 시 다시 placeholder 표시
                    required />
                </div>
            </div>
            <div className="sign_btn_container">
                <button className="sign_btn" onClick={handleSignUp}>Sign up</button>
            </div>
            <div className="sign_btn_container">
            {errorMessage && 
                <div className="error_message" key={errorMessage}>
                    {errorMessage}
                </div>}
            </div>
        </div>
        <div className='backgroundImg'/>
    </div>
    );
};

export default SignUpCom;