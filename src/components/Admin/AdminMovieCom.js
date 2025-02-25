import AdminSidebar from "./AdminSidebar"
import "../../css/admin/admin.css"

const AdminMovieCom = ({ list, editMovie, InputChange, EditClick, Update, handleFileChange, manualUpdate, show, hide }) => {
    return (
        <div className="admindiv">
            <AdminSidebar activeLink="영화/상영관리" />
            <div className="admindiv-1">
                <h1>영화/상영관리</h1><br />
                <div className="table-wrapper">
                    <table align="center">
                        <thead>
                            <tr>
                                <th>영화제목</th>
                                <th>영어제목</th>
                                <th>포스터URL</th>
                                <th>스틸컷URL</th>
                                <th>시놉시스</th>
                                <th>감독</th>
                                <th>배우</th>
                                <th>영화관리</th>
                                <th>상영관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.length > 0 ? (
                                list.map((data) => (
                                    <tr key={data.movieId}>
                                        <td>
                                            {editMovie?.movieId === data.movieId ? (
                                                <input type="text" name="title" value={data.title} onChange={(e) => InputChange(e, data.movieId)} />
                                            ) : (
                                                data.title
                                            )}
                                        </td>
                                        <td>
                                            {editMovie?.movieId === data.movieId ? (
                                                <input type="text" name="entitle" value={data.entitle} onChange={(e) => InputChange(e, data.movieId)} />
                                            ) : (
                                                data.entitle
                                            )}
                                        </td>
                                        <td>
                                            {editMovie?.movieId === data.movieId ? (
                                                <>
                                                    {data.posterUrl === "데이터없음" && <input type="file" onChange={(e) => handleFileChange(e, data.movieId, "posterUrl")} />}
                                                    {data.posterUrl !== "데이터없음" && <input type="text" name="posterUrl" value={data.posterUrl} onChange={(e) => InputChange(e, data.movieId)} />}
                                                </>
                                            ) : (
                                                data.posterUrl
                                            )}
                                        </td>
                                        <td>
                                            {editMovie?.movieId === data.movieId ? (
                                                <>
                                                    {data.stillUrl === "데이터없음" && <input type="file" onChange={(e) => handleFileChange(e, data.movieId, "stillUrl")} />}
                                                    {data.stillUrl !== "데이터없음" && <input type="text" name="stillUrl" value={data.stillUrl} onChange={(e) => InputChange(e, data.movieId)} />}
                                                </>
                                            ) : (
                                                data.stillUrl
                                            )}
                                        </td>
                                        <td>
                                            {editMovie?.movieId === data.movieId ? (
                                                <textarea name="movieSynopsis" value={data.movieSynopsis} onChange={(e) => InputChange(e, data.movieId)} />
                                            ) : (
                                                data.movieSynopsis
                                            )}
                                        </td>
                                        <td>
                                            {editMovie?.movieId === data.movieId ? (
                                                <input type="text" name="directorName" value={data.directorName} onChange={(e) => InputChange(e, data.movieId)} />
                                            ) : (
                                                data.directorName
                                            )}
                                        </td>
                                        <td>
                                            {editMovie?.movieId === data.movieId ? (
                                                <input type="text" name="actors" value={data.actors} onChange={(e) => InputChange(e, data.movieId)} />
                                            ) : (
                                                data.actors
                                            )}
                                        </td>
                                        <td>
                                            {editMovie?.movieId === data.movieId ? (
                                                <button onClick={() => Update(data.movieId)}>수정 완료</button>
                                            ) : (
                                                <button onClick={() => EditClick(data.movieId)}>수정</button>
                                            )}
                                        </td>
                                        <td>
                                            <button onClick={()=>show()}>관리</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <>
                                    <tr>
                                        <td colSpan="10">데이터가 없습니다.</td>
                                    </tr>
                                    <button className="update" onClick={() => manualUpdate()}>
                                        업데이트
                                    </button>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="modal">
                <div>
                    <span onClick={() => hide()}>X</span>
                    <h1>모달 확인</h1>
                </div>
            </div>
        </div>
    )
}

export default AdminMovieCom;