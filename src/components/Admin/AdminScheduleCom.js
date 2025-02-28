import AdminSidebar from "./AdminSidebar"
import "../../css/admin/admin.css"

const AdminScheduleCom = ({ list, show, hide, screen, selectedMovieId, selectedOption, handleSelectChange, onChange,
    mySubmit, delSubmit, input, handleTimeChange, selectedTimes, timeOptions, handleScreenChange }) => {

    return (
        <div className="admindiv">
            <AdminSidebar activeLink="상영관리" />
            <div className="admindiv-1">
                <h1>상영관리</h1><br />
                <div className="table-wrapper">
                    <table align="center">
                        <thead>
                            <tr>
                                <th>일정순번</th>
                                <th>상영시작시간</th>
                                <th>상영종료시간</th>
                                <th>영화id</th>
                                <th>영화제목</th>
                                <th>상영관id</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.length > 0 ? (
                                list.map((data) => (
                                    <tr key={data.scheduleId}>
                                        <td>
                                            {data.scheduleId}
                                        </td>
                                        <td>
                                            {new Date(data.startDateTime).toLocaleString()}
                                        </td>
                                        <td>
                                            {new Date(data.endDateTime).toLocaleString()}
                                        </td>
                                        <td>
                                            {data.movieId}
                                        </td>
                                        <td>
                                            {data.title}
                                        </td>
                                        <td>
                                            {data.screenId}
                                        </td>
                                        <td>
                                            <button onClick={() => show(data.movieId)}>관리</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <>
                                    <tr>
                                        <td colSpan="7">데이터가 없습니다.</td>
                                    </tr>
                                    <tr>
                                        <td style={{ border: "none" }}>
                                            <button className="update" onClick={() => show(null)}>관리</button>
                                        </td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="modal">
                <select name="version" onChange={handleSelectChange} value={selectedOption}>
                    <option>일정 추가</option>
                    <option>일정 삭제</option>
                </select>

                {selectedOption === "일정 추가" &&
                    <div>
                        <span onClick={hide}>X</span><br />
                        <h1>일정 추가</h1><br />
                        <form onSubmit={mySubmit}>
                            영화ID: <input type="text" name="movieId" value={input.movieId} onChange={onChange} /><br />
                            상영관 선택:
                            {screen.map((data) => (
                                <label key={data.screenID}>
                                    {data.screenName} <input type="radio" name="screenId" value={data.screenID} onChange={handleScreenChange} />
                                </label>
                            ))}
                            <br />
                            상영 기간: <input type="date" name="startDate" onChange={onChange} /> ~
                            <input type="date" name="endDate" onChange={onChange} /><br />
                            <h3>상영 시간</h3>
                            {timeOptions.map((time) => (
                                <label key={time}>
                                    <input type="checkbox" value={time} checked={selectedTimes.includes(time)} onChange={handleTimeChange} />
                                    {time}&nbsp;&nbsp;
                                </label>
                            ))}
                            <br />
                            <button>추가</button>
                        </form>
                    </div>
                }

                {selectedOption === "일정 삭제" &&
                    <div>
                        <span onClick={() => hide()}>X</span><br />
                        <h1>일정 삭제</h1><br />
                        <form onSubmit={delSubmit}>
                            영화id : <input type="text" name="movieId" value={selectedMovieId} onChange={onChange} placeholder="영화id를 입력해주세요" /><br />
                            삭제영화일정id : <input type="text" name="scheduleId" placeholder="삭제할 상영일정id를 입력해주세요" onChange={onChange}></input><br /><br />
                            <button>삭제</button>
                        </form>
                    </div>
                }
            </div>
        </div>
    )
}

export default AdminScheduleCom