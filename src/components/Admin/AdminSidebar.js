import { Link} from "react-router-dom"
import '../../css/admin/adminSidebar.css'

const AdminSidebar = ({ activeLink }) => {
    const customLinks = 
        [
            { to: "/adminMovie", text: "영화관리" },
            { to: "/adminSchedule", text: "상영관리" },
            { to: "/adminMember", text: "회원관리" },
            { to: "/adminPayment", text : "결제관리" }
        ]
        
    return <>
        <div className="adminSidebarDiv">
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