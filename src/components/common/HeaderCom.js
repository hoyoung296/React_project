import '../../css/main.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


function HeaderCom({ onChange, mySubmit, input}) {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return <>
        <header className={`header_body ${isHomePage ? 'homepage_header' : ''}`}>
            <Link to="/" className="logo">TheFillm</Link>
            <form onSubmit={mySubmit} className='searchForm'>
                <input type="text" className='search' value={input.search} name="search" onChange={onChange} />
                <button className='search_btn'>
                    <img className='search_btn' src='/img/search.png' alt='search'/>
                </button>
                
            </form>
            <div className='dropDownMenu'>
                <div className='profile_img'><img src='/img/img.png' alt='profile'/></div>
                <ul className='dropDown'>
                    <li className='dropDownBtn'><a href={`/myTicket?id=&start=`}>마이페이지</a></li>
                    <li className='dropDownBtn'><a href='/'>로그아웃</a></li>
                </ul>
            </div>
        </header>
    </>
};
export default HeaderCom;