import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/login.css'
import axios from 'axios'
import { allList } from '../../service/search'

const SignUpCom = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [postcode, setPostcode] = useState('')
    const [address, setAddress] = useState('')
    const [detailAddress, setDetailAddress] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [userName, setUserName] = useState('')
    const [userBirthday, setUserBirthday] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')
    const [isEmailVerified, setIsEmailVerified] = useState(false)
    const [serverVerificationCode, setServerVerificationCode] = useState('')
    const [backgroundImage, setBackgroundImage] = useState(null)
    const [list, setList] = useState([])
    const navigate = useNavigate()

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
    const today = new Date()
    const TopMovies = list
        .map(movie => {
            const [date, rank] = movie.movieRank.split("-") // 날짜-순위 분리
            const formattedDate = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}` // '20250325' -> '2025-03-25'로 변환
            const movieDate = new Date(formattedDate)
            return {
                ...movie,
                movieDate,
                movieRank: parseInt(rank),
            }
        })
        .sort((a, b) => {
            const diffA = Math.abs(today - a.movieDate)
            const diffB = Math.abs(today - b.movieDate)
            return diffA - diffB // 날짜가 같다면 순위 비교
        })
        .filter(movie => movie.movieRank <= 5) // 순위 5 이하 필터링
        .slice(0, 5) // 상위 5개 선택

        useEffect(() => {
            if (TopMovies.length > 0 && !backgroundImage) { // 배경이 없을 때만 랜덤 이미지를 설정
                const urls = TopMovies.map(movie => movie.stillUrl)
                const randomIndex = Math.floor(Math.random() * urls.length)
                setBackgroundImage(urls[randomIndex])
            }
        }, [TopMovies, backgroundImage]) // backgroundImage가 변경되지 않으면 다시 실행되지 않도록 조건 추가

    useEffect(() => {
        // script 태그를 동적으로 추가
        const script = document.createElement('script')
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        script.async = true
        document.body.appendChild(script)
        // cleanup: 컴포넌트가 언마운트될 때 script 제거
        return () => {
            document.body.removeChild(script)
        }
    }, [])

    // 주소 검색 기능
    const handlePostcodeSearch = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                let addr = '' // 주소 변수

                if (data.userSelectedType === 'R') { // 도로명 주소
                    addr = data.roadAddress
                } else { // 지번 주소
                    addr = data.jibunAddress
                }

                setPostcode(data.zonecode)
                setAddress(addr)
                setDetailAddress('') // 상세주소는 빈 값으로 초기화
            }
        }).open()
    }

    // 이메일 인증번호 요청
    const sendVerificationCode = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/root/mail/send-auth-code`, {
                email: email
            }, {
                headers: { "Content-Type": "application/json" }
            })

            if (response.status === 200) {
                alert("인증번호가 이메일로 전송되었습니다.")
                setServerVerificationCode(response.data.verificationCode)  // 서버에서 반환한 인증번호 저장
                console.log("서버에서 받은 인증번호:", response.data.verificationCode)  // 확인용 로그
            }
        } catch (error) {
            console.error("이메일 인증 요청 실패:", error)
            alert("이메일 인증 요청 중 오류가 발생했습니다.")
        }
    }

    // 인증번호 확인
    const verifyCode = async () => {
        try {
            console.log("인증번호 확인 시작...")
            console.log("입력된 이메일:", email)
            console.log("입력된 인증번호:", verificationCode)
            console.log("서버에서 받은 인증번호:", serverVerificationCode) // 서버에서 받은 인증번호 로그

            if (verificationCode === serverVerificationCode) {
                setIsEmailVerified(true) // 인증 완료 상태 업데이트
                alert("이메일 인증이 완료되었습니다.")
                console.log("이메일 인증 성공! 인증 완료 상태:", isEmailVerified) // 상태 업데이트 후 로그
            } else {
                setIsEmailVerified(false) // 인증 실패 상태 업데이트
                alert("인증번호가 올바르지 않습니다.")
                console.log("이메일 인증 실패. 상태:", isEmailVerified) // 상태 업데이트 후 로그
            }
        } catch (error) {
            console.error("인증번호 확인 요청 실패:", error.response ? error.response.data : error.message)
            alert("인증번호 확인 중 오류가 발생했습니다.")
        }
    }
    // isEmailVerified 상태가 변경될 때마다 확인
    useEffect(() => {
        console.log("이메일 인증 상태 변경됨:", isEmailVerified)
        // 이메일 인증 완료 후, 회원가입 진행 등의 작업을 여기서 처리
    }, [isEmailVerified]) // isEmailVerified가 변경될 때마다 실행

    // 회원가입 처리 함수
    const handleSignUp = async () => {
        setErrorMessage('')

        if (!isEmailVerified) {
            setErrorMessage("이메일 인증을 완료해야 회원가입이 가능합니다.")
            return
        }
        // 비밀번호 확인
        if (password !== confirmPassword) {
            setErrorMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
            return
        }

        // 생년월일을 yyyyMMdd 형식의 숫자로 변환
        const birthdayNumber = userBirthday.replace(/-/g, '')

        try {
            const memberData = {
                userId: email,
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
            }
            console.log('회원가입 데이터:', memberData) // 데이터를 콘솔에 출력

            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/root/register`, memberData)
            console.log("서버 응답:", response)

            if (response.status === 200) {
                alert("회원가입이 완료되었습니다.")
                navigate('/login') // 로그인 페이지로 이동
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log("서버 오류:", error.response.data.message)
                setErrorMessage(error.response.data.message) // 화면에 에러 메시지 표시
            } else {
                console.log("서버 오류:", error)
                setErrorMessage("서버 오류로 인해 회원가입에 실패했습니다.")
            }
        }
    }

    return (
        <div className='login_body'>
            <div className='sign'>
                <div className='title_movie' onClick={() => navigate("/")}>THEFILLM</div>
                <div className='sign_from'>
                    <div>
                        <span className='imgBtn'>
                            <input type="email" className='img_text' placeholder="아이디 (이메일)" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <button className='emailBtn' type="button" onClick={sendVerificationCode}>인증</button>
                        </span>
                        <span className='imgBtn'>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                className='img_text'
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}>
                                <img src={passwordVisible ? '../../img/pwdHide.png' : '../../img/pwdOpen.png'} alt="toggle visibility" />
                            </button>
                        </span>
                        <span className='imgBtn'>
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                className='img_text'
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
                        <input type="tel" className='input_text' placeholder="연락처" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />




                    </div>
                    <div>
                        <span className='imgBtn'>
                            <input type="text" className='img_text' placeholder="인증번호 입력" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required />
                            <button className='emailBtn' type="button" onClick={verifyCode}>확인</button>
                        </span>

                        <span className='addrBtn'>
                            <input type="text" className="addr_text" value={postcode} placeholder="우편번호 찾기" readOnly />
                            <button type="button" onClick={handlePostcodeSearch}><img src='../../img/search.png' alt='찾기이미지'/></button>
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
                {errorMessage &&
                    <div className="error_message" key={errorMessage}>
                        {errorMessage}
                    </div>}
                <div className="sign_btn_container">

                </div>
            </div>
            {backgroundImage && <img className='backgroundImg' src={backgroundImage} alt="background" />}
        </div>
    )
}

export default SignUpCom