import { Link} from "react-router-dom"
import '../../css/admin/adminSidebar.css'

const AdminSidebar = ({ activeLink }) => {
    const customLinks = 
        [
            { to: "/adminMovie", text: "영화/상영관리" },
            { to: "/adminMember", text: "회원관리" },
            { to: "/adminPayment", text : "결제관리" }
        ]
        
    return <>
        <div className="adminSidebarDiv">
            <img src="/img/movie1.jpg" alt="프사" /><br />
            <b>관리자</b>
            {customLinks.map((link, index) => (
                <p key={index}>
                    {activeLink === link.text ? (
                        <span><b>{link.text}</b></span>
                    ) : (
                        <Link to={link.to}><b>{link.text}</b></Link>
                    )}
                </p>
            ))}
        </div>
    </>
}

export default AdminSidebar