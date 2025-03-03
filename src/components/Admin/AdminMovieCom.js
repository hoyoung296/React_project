import AdminSidebar from "./AdminSidebar"
import "../../css/admin/admin.css"

const AdminMovieCom = ({ list, editMovie, InputChange, EditClick, Update, manualUpdate, show, hide, handleChange, manualinsert, newMovie }) => {
    return (
        <div className="admindiv">
            <AdminSidebar activeLink="영화관리" />
            <div className="admindiv-1">
                <h1>영화관리</h1>
                <button onClick={show}>추가</button>
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
            <div className="modal">
                <div style={{ height: "45%", bottom: "30%" }}>
                    <span onClick={hide}>X</span><br />
                    <h1>영화 추가</h1>
                    <form onSubmit={manualinsert}>
                        <input type="text" name="movieId" placeholder="영화 ID" value={newMovie.movieId} onChange={handleChange} required />
                        <input type="text" name="title" placeholder="영화 제목" value={newMovie.title} onChange={handleChange} required />
                        <input type="text" name="entitle" placeholder="영어 제목" value={newMovie.entitle} onChange={handleChange} required />
                        <input type="text" name="posterUrl" placeholder="포스터 URL" value={newMovie.posterUrl} onChange={handleChange} required />
                        <input type="text" name="stillUrl" placeholder="스틸컷 URL" value={newMovie.stillUrl} onChange={handleChange} required />
                        <textarea name="movieSynopsis" placeholder="시놉시스" value={newMovie.movieSynopsis} onChange={handleChange} required />
                        <input type="text" name="directorName" placeholder="감독" value={newMovie.directorName} onChange={handleChange} required />
                        <input type="text" name="actors" placeholder="배우" value={newMovie.actors} onChange={handleChange} required />
                        <input type="text" name="movieRank" placeholder="순위 (YYYYMMDD-R)" value={newMovie.movieRank} onChange={handleChange} required />
                        <input type="text" name="openDt" placeholder="개봉일 (YYYY-MM-DD)" value={newMovie.openDt} onChange={handleChange} required />
                        <input type="text" name="runtime" placeholder="러닝타임" value={newMovie.runtime} onChange={handleChange} required /><br /><br />
                        <button>등록</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminMovieCom;