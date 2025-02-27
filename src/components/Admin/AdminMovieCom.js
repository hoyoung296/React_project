import AdminSidebar from "./AdminSidebar"
import "../../css/admin/admin.css"

const AdminMovieCom = ({ list, editMovie, InputChange, EditClick, Update, manualUpdate }) => {
    return (
        <div className="admindiv">
            <AdminSidebar activeLink="영화관리" />
            <div className="admindiv-1">
                <h1>영화관리</h1><br />
                <div className="table-wrapper">
                    <table align="center">
                        <thead>
                            <tr>
                                <th>영화id</th>
                                <th>영화제목</th>
                                <th>영어제목</th>
                                <th>포스터URL</th>
                                <th>스틸컷URL</th>
                                <th>시놉시스</th>
                                <th>감독</th>
                                <th>배우</th>
                                <th>러닝타임</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.length > 0 ? (
                                list.map((data) => (
                                    <tr key={data.movieId}>
                                         <td>
                                            {editMovie?.movieId === data.movieId ? (
                                                <input type="text" name="movieId" value={data.movieId} onChange={(e) => InputChange(e, data.movieId)} />
                                            ) : (
                                                data.movieId
                                            )}
                                        </td>
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
                                                <input type="text" name="posterUrl" value={data.posterUrl} onChange={(e) => InputChange(e, data.movieId)} />
                                            ) : (
                                                data.posterUrl
                                            )}
                                        </td>
                                        <td>
                                            {editMovie?.movieId === data.movieId ? (
                                                <input type="text" name="stillUrl" value={data.stillUrl} onChange={(e) => InputChange(e, data.movieId)} />
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
                                                <input type="text" name="runtime" value={data.runtime} onChange={(e) => InputChange(e, data.movieId)} />
                                            ) : (
                                                data.runtime
                                            )}
                                        </td>
                                        <td>
                                            {editMovie?.movieId === data.movieId ? (
                                                <button onClick={() => Update(data.movieId)}>수정 완료</button>
                                            ) : (
                                                <button onClick={() => EditClick(data.movieId)}>수정</button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <>
                                    <tr>
                                        <td colSpan="10">데이터가 없습니다.</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: "none" }}>
                                            <button className="update" onClick={() => manualUpdate()}>
                                                업데이트
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminMovieCom;