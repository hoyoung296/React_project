import AdminSidebar from "./AdminSidebar"
import "../../css/admin/admin.css"

const AdminMovieCom = ({ list, editMovie, InputChange, EditClick, Update, manualUpdate, show, hide, handleChange, manualinsert, newMovie, delMovie }) => {
    return (
        <div className="admindiv">
            <AdminSidebar activeLink="영화관리" />
            <div className="admindiv-1">
                <h1>영화관리</h1>
                <button onClick={show} className="movieBtn">추가</button>
                <div className="table-wrapper">
    <table className="movie-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>제목</th>
                <th>영문제목</th>
                <th>포스터 URL</th>
                <th>스틸컷 URL</th>
                <th>시놉시스</th>
                <th>감독</th>
                <th>배우</th>
                <th>관리</th>
            </tr>
        </thead>
        <tbody>
            {list && list.length > 0 ? (
                list.map((data) => (
                    <tr key={data.movieId}>
                        {[
                            { name: "movieId", value: data.movieId },
                            { name: "title", value: data.title },
                            { name: "entitle", value: data.entitle },
                            { name: "posterUrl", value: data.posterUrl },
                            { name: "stillUrl", value: data.stillUrl },
                            { name: "movieSynopsis", value: data.movieSynopsis },
                            { name: "directorName", value: data.directorName },
                            { name: "actors", value: data.actors },
                        ].map((item, index) => (
                            <td key={index}>
                                {editMovie?.movieId === data.movieId ? (
                                    item.name === "movieSynopsis" ? (
                                        <textarea name={item.name} value={item.value} onChange={(e) => InputChange(e, data.movieId)} />
                                    ) : (
                                        <input type="text" name={item.name} value={item.value} onChange={(e) => InputChange(e, data.movieId)}  readOnly={item.name === "movieId"} />
                                    )
                                ) : (
                                    <span className="ellipsis">{item.value}</span>
                                )}
                            </td>
                        ))}
                        <td>
                            {editMovie?.movieId === data.movieId ? (
                                <button className="movieBtn" onClick={() => Update(data.movieId)}>수정 완료</button>
                            ) : (
                                <button className="movieBtn" onClick={() => EditClick(data.movieId)}>수정</button>
                            )}/
                            <button className="movieBtn" onClick={()=>delMovie(data.movieId)}>삭제</button>
                        </td>
                    </tr>
                ))
            ) : (
                <>
                    <tr>
                        <td colSpan="9">데이터가 없습니다.</td>
                    </tr>
                    <tr>
                        <td style={{ border: "none" }}>
                            <button className="movieBtn" onClick={() => manualUpdate()}>업데이트</button>
                        </td>
                    </tr>
                </>
            )}
        </tbody>
    </table>
</div>

            </div>
            <div className="modal">
                <div className="newMovie">
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
                        <input type="text" name="openDt" placeholder="개봉일 (YYYY-MM-DD)" value={newMovie.openDt} onChange={handleChange} required /><br /><br />
                        <button>등록</button>
                        <button onClick={hide}>취소</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminMovieCom;