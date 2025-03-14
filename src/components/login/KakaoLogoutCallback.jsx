import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoLogoutCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // 로그아웃 후 추가 작업이 필요하다면 처리
    // 예: "로그아웃 되었습니다" 안내 후 홈으로 이동
    navigate('/');
  }, [navigate]);

  return (
    <div>
      <p>카카오 로그아웃 처리 완료. 잠시 후 메인 페이지로 이동합니다...</p>
    </div>
  );
}

export default KakaoLogoutCallback;
