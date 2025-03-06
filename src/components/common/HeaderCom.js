import '../../css/main.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';


function HeaderCom({ onChange, mySubmit, input}) {
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        // 로컬 스토리지에서 로그인 상태 확인
        const loginStatus = localStorage.getItem("LoginSuccess");
        setIsLoggedIn(loginStatus === "true");  // 문자열 "true"와 비교

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUsername(userData.username || "닉네임"); // username 없으면 기본값 설정
        }
    }, []);

    // 로그아웃 처리
    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
        localStorage.removeItem("LoginSuccess");
        setIsLoggedIn(false);
        navigate("/");  // 홈으로 이동
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
                            <button className='dropDownBtn' onClick={() => navigate("/myTicket?id=&start=")}>마이페이지</button>
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