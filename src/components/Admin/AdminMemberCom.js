import AdminSidebar from "./AdminSidebar"
import "../../css/admin/admin.css"

const AdminMemberCom = ({ list }) => {
    return <>
        <div className="admindiv">
            <AdminSidebar activeLink="회원관리" />
            <div className="admindiv-1">
                <h1>회원관리</h1>
                <div className="table-wrapper">
                    <table  className="movie-table">
                        <thead>
                            <tr>
                                <th>유저ID</th>
                                <th>유저이름</th>
                                <th>이메일</th>
                                <th>전화번호</th>
                                <th>주소</th>
                                <th>우편번호</th>
                                <th>생년월일</th>
                                <th>등급</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.length > 0 ? (
                                list.map((data) => (
                                    <tr key={data.userId}>
                                        <td>
                                            {data.userId}
                                        </td>
                                        <td>
                                            {data.userName}
                                        </td>
                                        <td>
                                            {data.email}
                                        </td>
                                        <td>
                                            {data.phoneNumber}
                                        </td>
                                        <td>
                                            {data.addr}
                                        </td>
                                        <td>
                                            {data.postNum}
                                        </td>
                                        <td>
                                            {data.userBirthday}
                                        </td>
                                        <td>
                                            {data.userGrade}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <>
                                    <tr>
                                        <td colSpan='8'>데이터가 없습니다.</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}

export default AdminMemberCom