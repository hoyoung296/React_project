import { Link, useLocation } from "react-router-dom";
import '../../css/admin/adminSidebar.css'

const AdminSidebar = () => {
    const location = useLocation(); // 현재 URL 가져오기

    const customLinks = [
        { to: "/admin/movie", text: "영화관리" },
        { to: "/admin/schedule", text: "상영관리" },
        { to: "/admin/member", text: "회원관리" },
        { to: "/admin/payment", text: "결제관리" }
    ];

    return (
        <div className="adminSidebarDiv">
            {customLinks.map((link) => (
                <p key={link.to}>
                    {location.pathname.startsWith(link.to) ? (
                        <span><b>{link.text}</b></span>
                    ) : (
                        <Link to={link.to}><b>{link.text}</b></Link>
                    )}
                </p>
            ))}
        </div>
    );
}

export default AdminSidebar;
