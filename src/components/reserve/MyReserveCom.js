import MypageSidebar from "../common/MypageSidebar"
import "../../css/review/MyReserve.css"
import Pagination from "../common/Pagination"
import Modal from "../mainPage/Modal"

const MyReserveCom = ({ list, start, reviewStatus, handlePageChange, del, showModal, hideModal, modalData, id, mySubmit, onChange, showResult, hideResult, onResult, isModalOpen, modalType, onPayment }) => {
    const now = new Date()
    return <>
        <div className="ReserveTotalDiv">
            <MypageSidebar activeLink="내 예매내역" />
            <div className="ReserveWrapdiv">
                <h1>내 예매내역</h1><br />
                {list.dto.length === 0 ? (<h2>예매 내역이 없습니다.</h2>) :
                    list.dto.map((data) => {
                        const endDateTime = new Date(data.endDateTime)
                        const startDateTime = new Date(data.startDateTime)
                        const showReviewButton = now > endDateTime
                        const showCancelButton = now < new Date(startDateTime.getTime() - 30 * 60 * 1000)
                        const hasReview = data.reservationId in reviewStatus && reviewStatus[data.reservationId] === 0
                        return (
                            <div className="ReserveDiv" key={data.reservationId}>
                                <div className="ReserveInfoPart1Div">
                                    <img src={`${data.posterUrl}`} alt="영화 포스터 이미지" />
                                    <b>{data.title}</b>
                                </div>
                                <div className="ReserveInfoPart2Div">
                                    <p><b>예매번호 : {data.reservationId}</b>&nbsp;&nbsp;&nbsp;&nbsp;</p><br />
                                    <p><b>상영관 : {data.screenName}</b></p><br />
                                    <p><b>관람일 : {data.startDateTime}</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>좌석 : {data.seatIds.join(", ")}</b></p><br />
                                    <p><b>예매상태 :  {data.reservationStatusId === 1 ? "예매 진행 중" : "예매 완료"}</b></p>
                                </div>
                                {list != null && (
                                    <div className="ReserveInfoPart3Div">
                                        {showReviewButton && hasReview && data.paymentId !== undefined && <button onClick={() => showModal(data.title, data.posterUrl, data.director, data.actors, data.movieId)}>리뷰 쓰기</button>}
                                        {showCancelButton && data.paymentId !== undefined && <button onClick={() => del(data.reservationId)}>예매 취소</button>}
                                        {data.paymentId === undefined && <button onClick={() => onPayment(data)}>결제 진행</button>}
                                    </div>
                                )}
                            </div>
                        )
                    })
                }
                <Pagination start={start} list={list} handlePageChange={handlePageChange} />
            </div>

            {modalData && (
                <Modal isOpen={isModalOpen} onClose={hideModal} type={modalType} modalData={modalData}  
                mySubmit={(e) => {
                    mySubmit(e);  // 기존 기능 수행
                    hideModal();  // 리뷰 모달 닫기
                    showResult(); // 리뷰 작성 완료 모달 열기
                }} 
                    onChange={onChange} showResult={showResult} />
            )}

            {modalData && !isModalOpen && !showResult && ( // showResult가 true일 때만 리뷰 완료 모달 표시
                <div className="review_modal_container" onClick={hideResult}>
                    <div className='review_modal_content' onClick={(e) => e.stopPropagation()}>
                        <div className="review_modal_body">
                            <div className='review_movieModal'>
                                <div>
                                    <img src={`${modalData.posterUrl}`} alt="영화 포스터" />
                                    <p>리뷰 작성이 완료되었습니다.</p>
                                    <button onClick={() => onResult(id)}>리뷰 보러가기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
}

export default MyReserveCom
