import React, { useState, useEffect } from "react"
import MypageSidebar from "../common/MypageSidebar"
import "../../css/review/MyReserve.css"
import Pagination from "../common/Pagination"
import Modal from "../mainPage/Modal"

const MyReserveCom = ({ list, start, reviewStatus, handlePageChange, del, showModal, hideModal, modalData, id, mySubmit,
    onChange, onResult, isModalOpen, modalType, onPayment }) => {
    const [showResult, setShowResult] = useState(false)
    const now = new Date()
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setShowResult(false)
            }
        }

        if (showResult) {
            window.addEventListener("keydown", handleKeyDown)
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [showResult])

    const hideResult = () => {
        setShowResult(false)
    }

    return <>
        <div className="ReserveTotalDiv">
            <MypageSidebar activeLink="내 예매내역" />
            <div className="ReserveWrapdiv">
                <p>내 예매내역</p>
                {list.dto.length === 0 ? (<h2>예매 내역이 없습니다.</h2>) :
                    list.dto.map((data) => {
                        const formatDate = (date) => {
                            const d = new Date(date)
                            const year = d.getFullYear()
                            const month = String(d.getMonth() + 1).padStart(2, '0')
                            const day = String(d.getDate()).padStart(2, '0')
                            const hours = String(d.getHours()).padStart(2, '0')
                            const minutes = String(d.getMinutes()).padStart(2, '0')
                            return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`
                        }
                        const endDateTime = new Date(data.endDateTime)
                        const startDateTime = new Date(data.startDateTime)
                        const showReviewButton = now > endDateTime
                        const showCancelButton = now < new Date(startDateTime.getTime() - 30 * 60 * 1000)
                        const hasReview = data.reservationId in reviewStatus && reviewStatus[data.reservationId] === 0
                        
                        const getSortedSeatIds = (seatSet) => {
                            return [...seatSet].sort((a, b) => {
                                const rowA = a.charAt(0)
                                const rowB = b.charAt(0)
                                const numA = parseInt(a.slice(1), 10)
                                const numB = parseInt(b.slice(1), 10)
                        
                                return rowA === rowB ? numA - numB : rowA.localeCompare(rowB)
                            }).join(", ")
                        }
                        const formatReservationId = (id) => {
                            return id ? id.replace(/(\d{4})(?=\d)/g, "$1-") : ""
                        }                    

                        return (
                            <div className="myReserveBody" key={data.reservationId}>
                                <div>
                                    <img src={`${data.posterUrl}`} alt={`${data.title}`} />
                                </div>
                                <div>
                                    <p>{data.title}</p>
                                </div>
                                <div>
                                    <p>예매번호 : {formatReservationId(data.reservationId)}</p>
                                    <p>예매일 : {formatDate(data.createdAt)}</p>
                                    <p>관람일 : {formatDate(data.startDateTime)}</p>
                                </div>
                                <div>
                                    <p>상영관 : {data.screenName}</p>
                                    <p className={data.seatIds.length > 6 ? "scrollable-seats" : ""}>
                                        좌석 : {getSortedSeatIds(data.seatIds)}
                                    </p>

                                </div>
                                <div>
                                    <div className="myReserveBodyTicketPay">
                                        <p>{data.reservationStatusId === 1 ? <>잠시 후 대기 건이 취소됩니다.<br />결제를 완료해주세요.</> : ""}</p>
                                    </div>
                                    {list != null && (
                                        <div className="myReserveBodyBtnList">
                                            {showReviewButton && hasReview && data.paymentId !== undefined &&
                                                <button className="myReserveBodyBtn" onClick={() => showModal(data.title, data.posterUrl, data.director, data.actors, data.movieId)}>리뷰 쓰기</button>}
                                            {showCancelButton && data.paymentId !== undefined &&
                                                <button className="myReserveBodyBtn_del" onClick={() => del(data.reservationId)}>예매 취소</button>}
                                            {data.paymentId === undefined &&
                                                <button className="myReserveBodyBtn" onClick={() => onPayment(data)}>결제 진행</button>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                <Pagination start={start} list={list} handlePageChange={handlePageChange} />
            </div>

            {modalData && (
                <Modal isOpen={isModalOpen} onClose={hideModal} type={modalType} modalData={modalData}
                    mySubmit={(e) => {
                        mySubmit(e) // 기존 기능 수행
                        hideModal() // 리뷰 모달 닫기
                    }} onChange={onChange}
                    setShowResult={setShowResult} /> // 상태 변경 함수 전달
            )}

            {showResult && modalData && ( // showResult가 true일 때만 리뷰 완료 모달 표시
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