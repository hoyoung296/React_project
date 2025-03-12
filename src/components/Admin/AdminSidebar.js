import { Link } from "react-router-dom";
import '../../css/admin/adminSidebar.css'

const AdminSidebar = ({ activeLink }) => {
    const customLinks =
        [
            { to: "/admin/movie", text: "영화관리" },
            { to: "/admin/schedule", text: "상영관리" },
            { to: "/admin/member", text: "회원관리" },
            { to: "/admin/payment", text: "결제관리" }
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