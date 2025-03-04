import React, { useEffect } from 'react'
import '../../css/modal.css'

const Modal = ({ isOpen, onClose, type, infoData, onClick, Infolist, relatedList, modalData, mySubmit, onChange, showResult }) => {
    useEffect(() => {
        console.log('모달 상태 변경:', isOpen)
    }, [isOpen])

    if (!isOpen) return null

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
                                                {Infolist.map((data, index) => (
                                                    <div key={`info-${data.movieId}-${data.reviewDate}-${index}`}>
                                                        {data.content != null &&
                                                            <p>
                                                                <img src="/img/movie1.jpg" alt="프로필사진" />&nbsp;&nbsp;&nbsp;
                                                                {data.userId} {data.reviewDate}
                                                            </p>}
                                                        <br />
                                                        <p>{data.content}</p>
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
                    <div className="Reservemodal" onClick={onClose}>
                        <div onClick={(e) => e.stopPropagation()}>
                            <div>
                                <span onClick={() => onClose()}>X</span>
                            </div>
                            <div className="Reservemodal-1">
                                <h1>'{modalData.title}'의 리뷰를 작성해주세요.</h1>
                                <div className="Reservemodal-2">
                                    <img src={`${modalData.posterUrl}`} alt="영화 포스터" />
                                    <div>
                                        <p><b>{modalData.title}</b></p><br />
                                        <p><b>감독 : {modalData.director}</b></p><br />
                                        <b>배우 : {modalData.actors}</b>
                                    </div>
                                </div>
                                <form onSubmit={mySubmit}>
                                    <input name="review" placeholder="리뷰를 적어주세요." onChange={onChange} />
                                    <button onClick={() => showResult()}>게시</button>
                                </form>
                            </div>
                        </div>
                    </div>)
            case 'complete':
                return (
                    <h1>리뷰작성완료모달창</h1>
                )
            default:
                return null
        }
    }

    return (
        renderContent()
    )
}

export default Modal