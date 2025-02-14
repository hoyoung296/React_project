import { Link } from "react-router-dom"
import '../../css/review/MypageSidebar.css';

const MypageSidebar = ({ customLinks, activeLink, userId, paramId }) => {
    return (
        <div className="SidebarDiv">
            <img src="/img/movie1.jpg" alt="프사" />
            {userId ? <b>{userId}</b> : <b>{paramId}</b>}
            {customLinks.map((link, index) => (<p key={index}>
            {activeLink === link.text ? (<span><b>{link.text}</b></span>) : (<Link to={link.to}><b>{link.text}</b></Link>)}</p>))}
        </div>
    )
}

export default MypageSidebar