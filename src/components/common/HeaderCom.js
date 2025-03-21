// src/components/HeaderCom.jsx
import '../../css/main.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from '../common/axiosConfig';

function HeaderCom({ onChange, mySubmit, input }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [profileImage, setProfileImage] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    console.log("토큰 : " + token);
    if (token) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/root/member/user/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { userId, username } = res.data;
        setUserId(userId);
        setUsername(username);
        setIsLoggedIn(true);

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/root/info?userId=${userId}`)
        .then((res2) => {
          setProfileImage(res2.data.data.profileImage);
        })
        .catch((err2) => {
          console.error('프로필 이미지 가져오기 실패:', err2);
        });

        localStorage.setItem("LoginSuccess", JSON.stringify(true));
      })
      .catch((err) => {
        console.error('JWT 검증 실패:', err);
      });
    }
  }, []);

  const completeLogout = () => {
    localStorage.removeItem("kakaoAccessToken");
    localStorage.removeItem("jwtToken");
    // Refresh Token은 HttpOnly 쿠키로 관리되므로 localStorage에서 삭제할 필요 없음
    localStorage.removeItem("LoginSuccess");
    window.location.reload();
  };

  // handleLogout를 async 함수로 변경하여 axios 호출을 기다립니다.
  const handleLogout = async () => {
    const kakaoAccessToken = localStorage.getItem('kakaoAccessToken');
    const jwtToken = localStorage.getItem('jwtToken');
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const logoutRedirectUri = process.env.REACT_APP_LOGOUT_REDIRECT_URI;

    if (kakaoAccessToken) {
      const width = 500;
      const height = 600;
      // 카카오 로그아웃 URL을 팝업으로 열고, 팝업이 닫히면 백엔드 로그아웃 엔드포인트 호출
      const popup = window.open(
        `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${logoutRedirectUri}`,
      "KakaoLogoutPopup",
      `width=${width},height=${height},resizable=no,scrollbars=no`
    );
      const interval = setInterval(async () => {
        try {
          if (popup.closed) {
            clearInterval(interval);
            // 백엔드 로그아웃 엔드포인트 호출하여 Refresh Token 쿠키 삭제
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/root/member/logout`, {}, { withCredentials: true });
            completeLogout();
          }
        } catch (error) {
          console.error("팝업에서 에러 발생:", error);
        }
      }, 1000);
    } else if (jwtToken) {
      // jwtToken이 있는 경우에도 로그아웃 엔드포인트를 호출하여 쿠키 삭제 후 로컬 스토리지 삭제
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/root/member/logout`, {}, { withCredentials: true });
      } catch (error) {
        console.error("서버 로그아웃 호출 에러:", error);
      } finally {
        completeLogout();
      }
    } else {
      window.location.reload();
    }
  };


  return (
    <header className={`header_body ${isHomePage ? 'homepage_header' : ''}`}>
      <Link to="/" className="logo">TheFillm</Link>
      <form onSubmit={mySubmit} className='searchForm'>
        <input type="text" className='search' value={input.search} name="search" onChange={onChange} />
        <button className='search_btn'>
          <img className='search_btn' src='/img/search.png' alt='search'/>
        </button>
      </form>
      {isLoggedIn ? (
        <div className='dropDownMenu'>
          <div className='profile_img'>
            <img src={`${process.env.REACT_APP_BACKEND_URL}/root/upload/image?image=${profileImage}`} alt='profile'/>
          </div>
          <ul className='dropDown'>
            <li className='userName'>{username}</li>
            <li/>
            <li>
              <button className='dropDownBtn' onClick={() => navigate(`/mypage/ticket?id=${userId}&start=`)}>마이페이지</button>
            </li>
            <li>
              <button className='dropDownBtn' onClick={handleLogout}>로그아웃</button>
            </li>
          </ul>
        </div>
      ) : (
        <button className="loginBtn" onClick={() => navigate("/login")}>로그인</button>
      )}
    </header>
  );
}

export default HeaderCom;
