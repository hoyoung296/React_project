
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../common/axiosConfig';
import '../../css/login.css';

const SetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState(null); // userId 설정
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    //     // 1) 로컬 스토리지에서 로그인 상태 확인
    // const loginStatus = localStorage.getItem('LoginSuccess');
    // if (loginStatus === 'true') {
    //   setIsLoggedIn(true);
    // }

    // 2) jwtToken이 있다면 /user/info 호출
    const token = localStorage.getItem('jwtToken');
    console.log("토큰 : " + token)
    if (token) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/root/member/user/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // 백엔드에서 반환한 사용자 정보 (userId, username, email 등)
          const { userId, username, email } = res.data;
          setUserId(userId);
          localStorage.setItem("LoginSuccess", JSON.stringify(true));
        })
        .catch((err) => {
          console.error('JWT 검증 실패:', err);
          //handleLogout(); // 토큰이 유효하지 않으면 로그아웃 처리
        });
    }
  }, []);

  const validatePassword = (password) => {
    // 비밀번호 유효성 검사: 최소 8자리, 영문, 숫자, 특수문자 포함
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage('비밀번호는 최소 8자리 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.');
      return;
    }
    try {
      // 비밀번호 업데이트 API 호출 (예시)
      const response = await axios.post("root/member/set-password", {
        userId: userId,
        password: password
      });
      if (response.data.success) {
        alert("비밀번호 설정이 완료되었습니다.");
        navigate("/");
      }
    } catch (error) {
      console.error("비밀번호 설정 오류:", error);
    }
  };
  

  return (
    <div className="kakao_mypagePwd">
      <p>THEFILLM에서 사용할 비밀번호를 등록해주세요.</p>
      <form  className="kakao_infoPwdMain" onSubmit={handleSubmit}>
        <div>
          <div className='kakao_loginpwdBtn'>
          <input
              type={passwordVisible ? "text" : "password"}
              className="kakao_input_pwd"
              value={password}
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="kakao_infopwdeye"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <img
                src={passwordVisible ? '../../img/pwdHide.png' : '../../img/pwdOpen.png'}
                alt="toggle visibility"
              />
            </button>
          </div>
        </div>
        <div>
          <div className='kakao_loginpwdBtn'>
          <input
              type={confirmPasswordVisible ? "text" : "password"}
              className="kakao_input_pwd"
              value={confirmPassword}
              placeholder="비밀번호 확인"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="kakao_infopwdeye"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              <img
                src={confirmPasswordVisible ? '../../img/pwdHide.png' : '../../img/pwdOpen.png'}
                alt="toggle visibility"
              />
            </button>
          </div>
        </div>
        <button type="submit" className='kakao_infoPwdBtn'>확인</button>
        {errorMessage && <div className="error_message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default SetPassword;
