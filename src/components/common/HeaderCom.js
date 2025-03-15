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

    const completeLogout = () => {
        // 로컬 스토리지에서 로그인 정보 제거
        localStorage.removeItem("kakaoAccessToken");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("LoginSuccess")

        // 새로 고침 (리렌더링 최소화)
        window.location.reload();
    };
    // 로그아웃 처리
    const handleLogout = () => {

        const kakaoAccessToken = localStorage.getItem('kakaoAccessToken');
        const jwtToken = localStorage.getItem('jwtToken');

        if (kakaoAccessToken) {
        // (1) 카카오 REST API 키
        const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    
        // (2) 로그아웃 후 리다이렉트될 URI (카카오 개발자 콘솔에 등록한 것과 동일)
        //     여기서는 http://localhost:3000/logout/oauth2/callback/kakao 로 설정
        const logoutRedirectUri = process.env.REACT_APP_LOGOUT_REDIRECT_URI;
        console.log("Logout Redirect URI:", logoutRedirectUri);
        if (!logoutRedirectUri) {
            console.error("Logout Redirect URI가 정의되어 있지 않습니다.");
        }
            
        // 카카오 로그아웃 URL
        const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${logoutRedirectUri}`;

        // 팝업 창 열기
        const popup = window.open(
            KAKAO_LOGOUT_URL,
            "kakaoLogoutPopup",
            "width=500,height=600,scrollbars=yes"
        );
    
        // 일정 시간 후 팝업이 닫히지 않으면 강제 닫기
        const interval = setInterval(() => {
            try {
                if (popup.closed) {
                    clearInterval(interval);
                    completeLogout(); // 부모 창에서 로그아웃 처리
                }
            } catch (error) {
                // 팝업이 다른 도메인으로 로딩되는 중에는 크로스 도메인 에러가 발생할 수 있음
                console.error("팝업에서 에러 발생:", error);
            }
        }, 1000);
        } else if (jwtToken) {
            completeLogout();
        } else {
            // 로그인이 되어 있지 않으면 그냥 새로 고침
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
};
export default HeaderCom;