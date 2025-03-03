import AdminSidebar from "./AdminSidebar"
import "../../css/admin/admin.css"

const AdminPaymentCom = () => {
    return<>
        <div className="admindiv">
            <AdminSidebar activeLink="결제관리" />
            <div className="admindiv-1">
                <h1>결제관리</h1>
                <div className="table-wrapper">
                    <table  className="movie-table">
                        <thead>
                            <tr>
                                <th>항목</th>
                                <th>항목</th>
                                <th>항목</th>
                                <th>항목</th>
                                <th>항목</th>
                                <th>항목</th>
                                <th>항목</th>
                                <th>항목</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}

export default AdminPaymentCom