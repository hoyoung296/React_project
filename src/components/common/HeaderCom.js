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

  const handleLogout = () => {
    const kakaoAccessToken = localStorage.getItem('kakaoAccessToken');
    const jwtToken = localStorage.getItem('jwtToken');

    if (kakaoAccessToken) {
      const popup = window.open(/* 카카오 로그아웃 URL */);
      const interval = setInterval(() => {
        try {
          if (popup.closed) {
            clearInterval(interval);
            completeLogout();
          }
        } catch (error) {
          console.error("팝업에서 에러 발생:", error);
        }
      }, 1000);
    } else if (jwtToken) {
      completeLogout();
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
          <div className='profile_img'><img src='/img/img.png' alt='profile'/></div>
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
