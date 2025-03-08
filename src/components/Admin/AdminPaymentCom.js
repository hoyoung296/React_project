import AdminSidebar from "./AdminSidebar"
import "../../css/admin/admin.css"

const AdminPaymentCom = ({ list, del }) => {
    return <>
        <div className="admindiv">
            <AdminSidebar activeLink="결제관리" />
            <div className="admindiv-1">
                <h1>결제관리</h1>
                <div className="table-wrapper">
                    <table className="movie-table">
                        <thead>
                            <tr>
                                <th>유저아이디</th>
                                <th>예매번호</th>
                                <th>결제번호</th>
                                <th>결제금액</th>
                                <th>결제상태</th>
                                <th>결제일</th>
                                <th>갱신일</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.length > 0 ? (
                                list.map((data) => (
                                    <tr key={data.paymentId}>
                                        <td>{data.userId}</td>
                                        <td>{data.reservationId}</td>
                                        <td>{data.paymentId}</td>
                                        <td>{data.amount}</td>
                                        <td>{data.paymentStatus}</td>
                                        <td>{new Date(parseInt(data.createdAt)).toLocaleString()}</td>
                                        <td>{new Date(parseInt(data.updatedAt)).toLocaleString()}</td>
                                        <td>
                                            {data.paymentStatus === "PAID" && <button onClick={() => del(data.reservationId)}>취소</button>}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">데이터가 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}

export default AdminPaymentCom