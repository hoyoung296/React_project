import AdminSidebar from "./AdminSidebar"
import "../../css/admin/admin.css"

const AdminPaymentCom = () => {
    return<>
         <div className="admindiv">
            <AdminSidebar activeLink="결제관리" />
            <div className="admindiv-1">
                <h1>결제관리</h1>
            </div>
        </div>
    </>
}

export default AdminPaymentCom