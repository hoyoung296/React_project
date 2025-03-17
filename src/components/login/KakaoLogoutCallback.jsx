// src/components/KakaoLogoutCallback.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoLogoutCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const completeLogout = () => {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("kakaoAccessToken");
      localStorage.removeItem("LoginSuccess");
      if (window.opener) {
        window.opener.location.reload();
        navigate('/');
      } else {
        window.location.reload();
      }
      window.close();
    };

    if (window.opener && typeof window.opener.completeLogout === 'function') {
      window.opener.completeLogout();
    }

    setTimeout(() => {
      window.close();
    }, 1000);

    if (window.location.href.includes("kakao")) {
      completeLogout();
    }
  }, [navigate]);

  return (
    <div>
      <p>카카오 로그아웃 처리 완료. 잠시 후 메인 페이지로 이동합니다...</p>
    </div>
  );
}

export default KakaoLogoutCallback;
