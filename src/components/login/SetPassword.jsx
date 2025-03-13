
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../common/axiosConfig';
// import '../../css/setPassword.css';

const SetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState(null); // userId 설정

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
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
    <div className="setPasswordContainer">
      <h2>비밀번호 설정</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호 확인:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">설정 완료</button>
      </form>
    </div>
  );
};

export default SetPassword;
