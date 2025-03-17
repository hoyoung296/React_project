// src/components/LoginHandler.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login.css';
import axios from '../common/axiosConfig';

const LoginHandler = () => {
  const navigate = useNavigate();
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
        // Access Token만 localStorage에 저장
        localStorage.setItem("jwtToken", response.data.jwtToken);
        localStorage.setItem("kakaoAccessToken", response.data.kakaoToken);
        // Refresh Token은 HttpOnly 쿠키로 관리되므로 저장하지 않음

        if (response.data.needPasswordSetup) {
          window.opener.location.href = '/login/set-password';
          window.close();
        } else {
          window.opener.location.href = '/';
          window.close();
        }
      } catch (error) {
        console.error("카카오 로그인 에러:", error);
      }
    };

    if (code) {
      kakaoLogin();
    }
  }, [code, navigate]);

  return (
    <div className='loginIng'>
      <p>로그인 중입니다. 잠시만 기다려주세요...</p>
    </div>
  );
}

export default LoginHandler;
