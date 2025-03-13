import '../../css/main.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from '../common/axiosConfig';
// import Axios from "axios";

function HeaderCom({ onChange, mySubmit, input}) {
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState(null); // userId 설정, 마이페이지 넘어갈 때 id가 필요해서 작성(나호영 작성)

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
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/root/member/user/info`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
          // 백엔드에서 반환한 사용자 정보 (userId, username, email 등)
            const { userId, username, email } = res.data;
                setUserId(userId);
                setUsername(username);
                setIsLoggedIn(true); // 토큰 유효 -> 로그인 상태
                localStorage.setItem("LoginSuccess", JSON.stringify(true));
        })
        .catch((err) => {
            console.error('JWT 검증 실패:', err);
          //handleLogout(); // 토큰이 유효하지 않으면 로그아웃 처리
        });
    }
}, []);

    // 로그아웃 처리
    const handleLogout = () => {
        // (1) 카카오 REST API 키
        const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    
        // (2) 로그아웃 후 리다이렉트될 URI (카카오 개발자 콘솔에 등록한 것과 동일)
        //     여기서는 http://localhost:3000/logout/oauth2/callback/kakao 로 설정
        const logoutRedirectUri = process.env.REACT_APP_LOGOUT_REDIRECT_URI;
        console.log("Logout Redirect URI:", logoutRedirectUri);
        if (!logoutRedirectUri) {
            console.error("Logout Redirect URI가 정의되어 있지 않습니다.");
        }
            
        // (3) 우리 애플리케이션에서 사용하던 로컬 스토리지 데이터 제거
        //     (kakaoAccessToken, jwtToken, refreshToken 등)
        localStorage.removeItem("kakaoAccessToken");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("LoginSuccess");
    
        // (4) 브라우저를 카카오 로그아웃 URL로 리다이렉트
        //     Kakao 측에서 로그아웃 처리 후 LOGOUT_REDIRECT_URI로 다시 돌아옴
        window.location.href =
        `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${logoutRedirectUri}`;
      };
      

    return <>
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
    </>
};
export default HeaderCom;