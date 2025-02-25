import AdminSidebar from "./AdminSidebar"
import "../../css/admin/admin.css"

const AdminMemberCom = ({ list, editUser, InputChange, EditUser, Update, del }) => {
    return <>
        <div className="admindiv">
            <AdminSidebar activeLink="회원관리" />
            <div className="admindiv-1">
                <h1>회원관리</h1><br />
                <div className="table-wrapper">
                    <table align="center">
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
                                <th>수정</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.length > 0 ? (
                                list.map((data) => (
                                    <tr key={data.userId}>
                                        <td>
                                            {editUser?.userId === data.userId ? (
                                                <input type="text" name="userId" value={data.userId} onChange={(e) => InputChange(e, data.userId)} />
                                            ) : (
                                                data.userId
                                            )}
                                        </td>
                                        <td>
                                            {editUser?.userId === data.userId ? (
                                                <input type="text" name="userName" value={data.userName} onChange={(e) => InputChange(e, data.userId)} />
                                            ) : (
                                                data.userName
                                            )}
                                        </td>
                                        <td>
                                            {editUser?.userId === data.userId ? (
                                                <input type="text" name="email" value={data.email} onChange={(e) => InputChange(e, data.userId)} />
                                            ) : (
                                                data.email
                                            )}
                                        </td>
                                        <td>
                                            {editUser?.userId === data.userId ? (
                                                <input type="text" name="phoneNumber" value={data.phoneNumber} onChange={(e) => InputChange(e, data.userId)} />
                                            ) : (
                                                data.phoneNumber
                                            )}
                                        </td>
                                        <td>
                                            {editUser?.userId === data.userId ? (
                                                <input type="text" name="addr" value={data.addr} onChange={(e) => InputChange(e, data.userId)} />
                                            ) : (
                                                data.addr
                                            )}
                                        </td>
                                        <td>
                                            {editUser?.userId === data.userId ? (
                                                <input type="text" name="postNum" value={data.postNum} onChange={(e) => InputChange(e, data.userId)} />
                                            ) : (
                                                data.postNum
                                            )}
                                        </td>
                                        <td>
                                            {editUser?.userId === data.userId ? (
                                                <input type="text" name="userGrade" value={data.userGrade} onChange={(e) => InputChange(e, data.userId)} />
                                            ) : (
                                                data.userGrade
                                            )}
                                        </td>
                                        <td>
                                            {editUser?.userId === data.userId ? (
                                                <input type="text" name="userBirthday" value={data.userBirthday} onChange={(e) => InputChange(e, data.userId)} />
                                            ) : (
                                                data.userBirthday
                                            )}
                                        </td>
                                        <td>
                                            {editUser?.userId === data.userId ? (
                                                <button onClick={() => Update(data.userId)}>수정 완료</button>
                                            ) : (
                                                <button onClick={() => EditUser(data.userId)}>수정</button>
                                            )}
                                        </td>
                                        <td>
                                            <button onClick={() => del(data.userId)}>삭제</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <>
                                    <tr>
                                        <td colSpan='10'>데이터가 없습니다.</td>
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