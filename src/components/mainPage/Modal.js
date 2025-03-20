import React, { useEffect } from 'react'
import '../../css/modal.css'

const Modal = ({ isOpen, onClose, type, infoData, onClick, Infolist, relatedList, modalData, mySubmit, onChange, setShowResult }) => {
    useEffect(() => {
        console.log('모달 상태 변경:', isOpen)

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown)
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const handleSubmit = (e) => {
        e.preventDefault();
        mySubmit(e); // 기존 기능 수행
        setShowResult(true); // 리뷰 작성 후 결과 모달을 띄우기 위해 showResult를 true로 설정
        onClose(); // 리뷰 모달 닫기
    }
    
    const renderContent = () => {
        switch (type) {
            case 'detail':
                return (
                    infoData && (
                        <div className="modal-container" onClick={onClose}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-body">
                                    <div className='movieModal'>
                                        <div className='movieInfo'>
                                            <div className='movieInfoText'>
                                                <p>
                                                    {infoData.title}
                                                </p>
                                                <p>
                                                    {infoData.entitle}
                                                </p>
                                                <p>
                                                    {infoData.director}<br />
                                                    {infoData.actors}
                                                </p>
                                                <button onClick={() => onClick(infoData.title)}>예매하기</button>
                                            </div>
                                            <img src={infoData.posterUrl} alt="영화 포스터 이미지" />

                                        </div>
                                        <div className='synops_review'>
                                            <div className='synops'>
                                                {infoData.synopsis}
                                            </div>
                                            <div className='review'>
                                                <p>REVIEW</p>
                                                {Infolist.slice(-5).map((data, index) => (
                                                    <div className='reviewList' key={`info-${data.movieId}-${data.reviewDate}-${index}`}>
                                                        {data.content != null && (
                                                            <>
                                                                <div className='reviewHeader'>
                                                                    <img className='reviewImg' src="/img/movie1.jpg" alt="프로필사진" />
                                                                    <div>
                                                                        <p className='reviewUser'>{data.userName}</p>
                                                                        <p className='reviewDate'>{data.reviewDate}</p>
                                                                    </div>
                                                                </div>
                                                                <p className='reviewContent'>{data.content}</p>
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className='nextMovie'>
                                            {console.log(relatedList)}
                                            {relatedList.length > 1 && (
                                                <div>
                                                    <h1>관련컨텐츠</h1>
                                                    {relatedList
                                                        .filter(movie => movie.movieId !== Infolist[0].movieId)
                                                        .map((data, index) => (
                                                            <div key={`related-${data.movieId}-${index}`} className="SearchImgDiv">
                                                                <img src={data.posterUrl} alt='포스터이미지' />
                                                            </div>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
            case 'review':
                return (
                    <div className="modal-container" onClick={onClose}>
                        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                            <div className="modal-body">
                                <div className='movieModal'>
                                    <div className='movieTitle'>
                                        <p>'{modalData.title}'의 리뷰를 작성해주세요.</p>
                                        <div className="reviewMovieInfo">
                                            <img src={`${modalData.posterUrl}`} alt="영화 포스터" />
                                            <div>
                                                <p>{modalData.title}</p>
                                                <p>{modalData.director}</p>
                                                <p>{modalData.actors}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='submitReview'>
                                        <form onSubmit={handleSubmit}>
                                            <textarea
                                                name="review"
                                                placeholder="리뷰를 적어주세요."
                                                onChange={onChange}
                                                autoComplete="off"
                                            />
                                            <button type="submit">게시</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
            default:
                return null
        }
    }

    return (
        renderContent()
    )
}

export default Modal