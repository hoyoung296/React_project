import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoLogoutCallback() {
  const navigate = useNavigate();

  useEffect(() => {

    // 카카오 로그아웃 후 부모 창에 적용하기
    const completeLogout = () => {
      // 로그아웃 후 로컬 스토리지 정보 삭제
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("kakaoAccessToken");
      localStorage.removeItem("LoginSuccess");

      // 부모 창 새로 고침
      if (window.opener) {
        window.opener.location.reload();
        navigate('/')
      } else {
        // 팝업에서 직접 새로 고침을 하는 경우
        window.location.reload();
      }

      // 팝업을 닫는다
      window.close();
    };

    // 로그아웃 후 리디렉션된 페이지에서 부모 창을 새로 고침하고 팝업을 닫는다
    if (window.opener && typeof window.opener.completeLogout === 'function') {
      window.opener.completeLogout();
    }

    // 일정 시간 후 팝업을 닫도록 설정
    setTimeout(() => {
      window.close(); // 팝업을 닫음
    }, 1000);

    // 리디렉션 후 로그아웃 처리
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
