import AdminSidebar from "./AdminSidebar"
import "../../css/admin/admin.css"

const AdminMovieCom = ({ list }) => {
    return <>
        <div className="admindiv">
            <AdminSidebar activeLink="영화/상영관리" />
            <div className="admindiv-1">
                <h1>영화/상영관리</h1><br />
                <div className="table-wrapper">
                    <table align="center">
                        <thead>
                            <tr>
                                <th>movie_id</th>
                                <th>title</th>
                                <th>entitle</th>
                                <th>poster_url</th>
                                <th>still_url</th>
                                <th>synopsis</th>
                                <th>director</th>
                                <th>actor</th>
                                <th>rank</th>
                                <th>openDt</th>
                                <th>영화정보수정</th>
                                <th>상영일정추가</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.length > 0 ? (
                                list.map((data) => (
                                    <tr key={data.movieId}>
                                        <td>{data.movieId}</td>
                                        <td>{data.title}</td>
                                        <td>{data.entitle}</td>
                                        <td>{data.posterUrl}</td>
                                        <td>{data.stillUrl}</td>
                                        <td>{data.movieSynopsis}</td>
                                        <td>{data.directorName}</td>
                                        <td>{data.actors}</td>
                                        <td>{data.movieRank}</td>
                                        <td>{data.openDt}</td>
                                        <td><button>수정</button></td>
                                        <td><button>추가</button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10">데이터가 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}

export default AdminMovieCom