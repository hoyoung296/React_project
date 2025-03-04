import AdminSidebar from "./AdminSidebar"
import "../../css/admin/admin.css"

const AdminScheduleCom = ({ list, show, hide, screen, onChange, mySubmit, delSubmit, input,
    handleTimeChange, selectedTimes, timeOptions, handleScreenChange, movie }) => {

    return (
        <div className="admindiv">
            <AdminSidebar activeLink="상영관리" />
            <div className="admindiv-1">
                <h1>상영관리</h1>
                <button className="movieBtn" onClick={() => show()}>추가</button>
                <div className="table-wrapper">
                    <table className="movie-table">
                        <thead>
                            <tr>
                                <th>일정순번</th>
                                <th>상영시작시간</th>
                                <th>상영종료시간</th>
                                <th>영화id</th>
                                <th>영화제목</th>
                                <th>상영관id</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.length > 0 ? (
                                list.map((data) => (
                                    <tr key={data.scheduleId}>
                                        <td>
                                            {data.scheduleId}
                                        </td>
                                        <td>{data.startDateTime ? new Date(data.startDateTime).toLocaleString() : "날짜 없음"}</td>
                                        <td>{data.endDateTime ? new Date(data.endDateTime).toLocaleString() : "날짜 없음"}</td>
                                        <td>
                                            {data.movieId}
                                        </td>
                                        <td>
                                            {data.title}
                                        </td>
                                        <td>
                                            {data.screenId}
                                        </td>
                                        <td><button onClick={() => delSubmit(data.scheduleId)}>삭제</button></td>
                                    </tr>
                                ))
                            ) : (
                                <>
                                    <tr>
                                        <td colSpan="7">데이터가 없습니다.</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="modal">
                <div  className="newMovie">
                    <h1>일정 추가</h1>
                    <form onSubmit={mySubmit}>
                        <p>영화 선택</p>
                        <select name="movieId" value={input.movieId} onChange={onChange}>
                            <option value="">영화를 선택하세요</option>
                            {movie.map((data) => (
                                <option key={data.movieId} value={data.movieId}>
                                    {data.movieId} - {data.title}
                                </option>
                            ))}
                        </select>
                        <br />
                        <p>상영 기간</p>
                        <input type="date" name="startDate" onChange={onChange} /> ~ <input type="date" name="endDate" onChange={onChange} /><br />
                        <p>상영관 선택</p>
                        <div>
                        {screen.map((data) => (
                            <label key={data.screenID}>
                                <span>{data.screenName}</span> <input type="radio" name="screenId" value={data.screenID} onChange={handleScreenChange} />
                            </label>
                        ))}
                        </div>
                        <br />

                        <p>상영 시간</p>
                        <div>
                        {timeOptions.map((time) => (
                            <label key={time}>
                                <input type="checkbox" value={time} checked={selectedTimes.includes(time)} onChange={handleTimeChange} />
                                <span>{time}</span>
                            </label>
                        ))}
                        </div>
                        <br />
                        <button>등록</button>
                        <button onClick={hide}>취소</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminScheduleCom