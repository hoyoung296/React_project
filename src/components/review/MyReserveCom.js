import MypageSidebar from "../common/MypageSidebar"
import "../../css/review/MyReserve.css"
import Pagination from "../common/Pagination"

const MyReserveCom = ({ list, start, reviewStatus, handlePageChange, del, showModal, hideModal, modalData, mySubmit, onChange }) => {
    const now = new Date()
    return <div className="ReserveTotalDiv">
        <MypageSidebar activeLink="내 예매내역" />
        <div className="ReserveWrapdiv">
            <h1>내 예매내역</h1><br />
            {list.dto.length === 0 ? (<h2>예매 내역이 없습니다.</h2>) :
                list.dto.map((data) => {
                    const endDateTime = new Date(data.endDateTime);
                    const startDateTime = new Date(
                        data.startDateTime.replace(/(\d{4})년 (\d{2})월 (\d{2})일/, "$1-$2-$3")
                    )
                    const showReviewButton = now > endDateTime
                    const showCancelButton = now < new Date(startDateTime.getTime() - 30 * 60 * 1000)

                    const hasReview = data.reservationId in reviewStatus && reviewStatus[data.reservationId] === 0
                    return (
                        <div className="ReserveDiv" key={data.reservationId}>
                            <div className="ReserveInfoPart1Div">
                                <img src={`/img/${data.posterUrl}`} alt="영화 포스터 이미지" />
                                <b>{data.title}</b>
                            </div>
                            <div className="ReserveInfoPart2Div">
                                <p><b>예매번호 : {data.reservationId}</b>&nbsp;&nbsp;&nbsp;&nbsp;</p><br />
                                <p><b>상영관 : {data.screenName}</b></p><br />
                                <p><b>관람일 : {data.startDateTime}</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>좌석 : {data.seatRow}{data.seatNumber}</b></p>
                            </div>
                            {list != null && (
                                <div className="ReserveInfoPart3Div">
                                    {showReviewButton && (
                                        hasReview && <button onClick={() => showModal(data.title, data.posterUrl, data.director, data.actors, data.movieId)}>리뷰 쓰기</button>
                                    )}
                                    {showCancelButton && (
                                        <button onClick={() => del(data.reservationId)}>예매 취소</button>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })
            }
            <Pagination start={start} list={list} handlePageChange={handlePageChange} />
        </div>

        {modalData && (
            <div className="Reservemodal">
                <div>
                    <div>
                        <span onClick={hideModal}>X</span>
                    </div>
                    <div className="Reservemodal-1">
                        <h1>'{modalData.title}'의 리뷰를 작성해주세요.</h1>
                        <div className="Reservemodal-2">
                            <img src={`/img/${modalData.posterUrl}`} alt="영화 포스터" />
                            <div>
                                <p><b>{modalData.title}</b></p><br />
                                <p><b>감독 : {modalData.director}</b></p><br />
                                <b>배우 : {modalData.actors}</b>
                            </div>
                        </div>
                        <form onSubmit={mySubmit}>
                            <input name="review" placeholder="리뷰를 적어주세요." onChange={onChange} />
                            <button>게시</button>
                        </form>
                    </div>
                </div>
            </div>
        )}
    </div>
}

export default MyReserveCom