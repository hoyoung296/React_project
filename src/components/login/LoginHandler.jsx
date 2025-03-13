// src/components/LoginHandler.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login.css'
import axios from '../common/axiosConfig';


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
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("kakaoAccessToken", response.data.kakaoToken);
        // localStorage.setItem("user", JSON.stringify(response.data.user));
        // localStorage.setItem("LoginSuccess", JSON.stringify(response.data.loginSuccess));
        
        // 만약 신규 회원이라면 비밀번호 설정 페이지로 리디렉션
        if (response.data.needPasswordSetup) {
            window.opener.location.href = '/login/set-password';
            window.close(); // 팝업 창 닫기
        } else {
          window.opener.location.href = '/';
          window.close(); // 팝업 창 닫기
        }

        //  // 부모 창 새로 고침 후 로그인 완료 페이지로 이동
        // if (window.opener) {
        //   window.opener.location.href = '/';
        //   window.close(); // 팝업 창 닫기
        // } else {
        //   window.location.href = '/'; // 팝업이 아닌 경우 일반 리디렉션
        // }
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