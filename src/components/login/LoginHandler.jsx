// src/components/LoginHandler.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


  const LoginHandler = () => {
    const navigate = useNavigate();
     // 현재 URL에서 인가코드 추출 (예: http://localhost:3000/login/oauth2/callback/kakao?code=...)
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("인가 코드:", code);

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/root/member/login/oauth2/callback/kakao`,
          {
            params: { code },
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            }
          }
        );
        // 백엔드 응답 예시: { loginSuccess: true, user: { ... }, jwtToken: "eyJhbGciOi..." }
        localStorage.setItem("jwtToken", response.data.jwtToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("LoginSuccess", JSON.stringify(response.data.loginSuccess));
        navigate("/");
      } catch (error) {
        console.error("카카오 로그인 에러:", error);
      }
    };

    if (code) {
      kakaoLogin();
    }
  }, [code, navigate]);

  return (
    <div>
      <p>로그인 중입니다. 잠시만 기다려주세요...</p>
    </div>
  );
}

export default LoginHandler;