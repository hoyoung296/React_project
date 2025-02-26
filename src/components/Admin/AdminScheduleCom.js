import AdminSidebar from "./AdminSidebar"
import "../../css/admin/admin.css"

const AdminScheduleCom = ({ list, show, hide, screen, selectedMovieId, selectedOption, handleSelectChange, onChange, mySubmit, delSubmit }) => {
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
                                            {data.startDateTime}
                                        </td>
                                        <td>
                                            {data.endDateTime}
                                        </td>
                                        <td>
                                            {data.movieId}
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
                                        <td colSpan="6">데이터가 없습니다.</td>
                                    </tr>
                                    <tr>
                                        <td style={{border : "none"}}>
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
                        <span onClick={() => hide()}>X</span><br />
                        <h1>일정 추가</h1><br />
                        <form onSubmit={mySubmit}>
                            영화ID : <input type="text" name="movieId" value={selectedMovieId} onChange={onChange} readOnly={selectedMovieId !== null} /><br />
                            상영 시작 시간 : <input type="datetime-local" name="startDateTime" placeholder="상영 시작 시간" onChange={onChange} /><br />
                            상영 종료 시간 : <input type="datetime-local" name="endDateTime" placeholder="상영 종료 시간" onChange={onChange} /><br />
                            상영관 선택:
                            {screen && screen.length > 0 && (
                                screen.map((data) => (
                                    <label>
                                        {data.screenName} <input type="radio" name="screenId" value={data.screenID} onChange={onChange}></input>
                                    </label>
                                ))
                            )}
                            <br /><br />
                            <button>추가</button>
                        </form>
                    </div>
                }

                {selectedOption === "일정 삭제" &&
                    <div>
                        <span onClick={() => hide()}>X</span><br />
                        <h1>일정 삭제</h1><br />
                        <form onSubmit={delSubmit}>
                            영화id : <input type="text" name="movieId" value={selectedMovieId} onChange={onChange} readOnly={selectedMovieId !== null} /><br />
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