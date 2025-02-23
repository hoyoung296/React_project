import AdminSidebar from "./AdminSidebar"
import "../../css/admin/admin.css"

const AdminMemberCom = () => {
    return <>
        <div className="admindiv">
            <AdminSidebar activeLink="회원관리" />
            <div className="admindiv-1">
                <h1>회원관리</h1>
            </div>
        </div>
    </>
}

export default AdminMemberCom