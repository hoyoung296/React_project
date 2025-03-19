import AdminSidebar from "./AdminSidebar"
import "../../css/admin/admin.css"

const AdminScheduleCom = ({ list, show, hide, screen, onChange, mySubmit, delSubmit, input,
    handleTimeChange, selectedTimes, timeOptions, handleScreenChange, movie, isTimeDisabled, filterDate, filterMovie, setFilterDate, setFilterMovie }) => {
    
        const filteredList = list.filter((data) => {
        const startDate = new Date(data.startDateTime)
        const endDate = new Date(data.endDateTime)
        const matchDate = filterDate
            ? (startDate.getFullYear() === new Date(filterDate).getFullYear() &&
                startDate.getMonth() === new Date(filterDate).getMonth() &&
                startDate.getDate() === new Date(filterDate).getDate()) ||
            (endDate.getFullYear() === new Date(filterDate).getFullYear() &&
                endDate.getMonth() === new Date(filterDate).getMonth() &&
                endDate.getDate() === new Date(filterDate).getDate())
            : true
        const matchMovie = filterMovie ? data.title === filterMovie : true
        return matchDate && matchMovie
    })

    const resetFilters = () => {
        setFilterDate("")
        setFilterMovie("")
    }

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
    const day = String(today.getDate()).padStart(2, "0"); // 두 자리 숫자로 변환
    const formattedDate = `${year}-${month}-${day}`;

    return (
        <div className="admindiv">
            <AdminSidebar activeLink="상영관리" />
            <div className="admindiv-1">
                <h1>상영관리</h1>
                <div className="movieBtnBody">
                    <button className="movieBtn" onClick={() => show()}>추가</button>
                    <div className="filter">
                        <label>
                            <input
                                type="date"
                                onChange={(e) => setFilterDate(e.target.value)}
                                value={filterDate || ""}
                            />
                        </label>
                        <label>
                            <select
                                onChange={(e) => setFilterMovie(e.target.value)}
                                value={filterMovie || ""}
                            >
                                <option value="">영화를 선택하세요</option>
                                {movie.map((data) => (
                                    <option key={data.movieId} value={data.title}>
                                        {data.title}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button type="button" onClick={resetFilters}>초기화</button>
                    </div>
                </div>
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
                            {filteredList && filteredList.length > 0 ? (
                                filteredList.map((data) => (
                                    <tr key={data.scheduleId}>
                                        <td>
                                            {data.scheduleId}
                                        </td>
                                        <td>{new Date(data.startDateTime).toLocaleString()}</td>
                                        <td>{new Date(data.endDateTime).toLocaleString()}</td>
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
                <div className="newMovie">
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
                        <input type="date" name="startDate" onChange={onChange} min={formattedDate} />
                        ~
                        <input type="date" name="endDate" onChange={onChange} min={formattedDate} /><br />
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
                                    <input
                                        type="checkbox"
                                        value={time}
                                        checked={selectedTimes.includes(time)}
                                        onChange={handleTimeChange}
                                        disabled={isTimeDisabled(time)}
                                    />
                                    <span>{time}</span>
                                </label>
                            ))}
                        </div>
                        <br />
                        <button>등록</button>
                        <button type="button" onClick={hide}>취소</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminScheduleCom