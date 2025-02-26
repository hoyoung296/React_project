import React, { useEffect } from 'react'
import '../../css/main.css'

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
                        <div className="Searchinfo">
                            <div className="SearchInfodiv">
                                <div className="SearchInfo1">
                                    <span onClick={() => onClose()}>X</span>
                                    <div>
                                        <h1>{infoData.title}</h1><br />
                                        <h2>{infoData.entitle}</h2><br />
                                        <h3>감독 : {infoData.director}</h3>
                                        <h3>배우 : {infoData.actors}</h3><br />
                                        <button onClick={onClick}>예매하기</button>
                                    </div>
                                </div>

                                <div className="SearchInfo2">
                                    <img src={infoData.posterUrl} alt="영화 포스터 이미지" />
                                </div>

                                <div className="SearchInfo3">
                                    <div>{infoData.synopsis}</div>
                                </div>

                                <div className="SearchInfo4">
                                    <h1>REVIEW</h1>
                                    {Infolist.map((data, index) => (
                                        <div key={`info-${data.movieId}-${data.reviewDate}-${index}`}>
                                            {data.content != null &&
                                                <p>
                                                    <img src="/img/movie1.jpg" alt="프로필사진" />&nbsp;&nbsp;&nbsp;
                                                    {data.userId} {data.reviewDate}
                                                </p>}
                                            <br />
                                            <p style={{ marginLeft: "8%" }}>{data.content}</p>
                                        </div>
                                    ))}
                                </div>
                                {relatedList.length > 1 && (
                                    <div className="SearchInfo5">
                                        <h1>관련컨텐츠</h1>
                                        <div className="SearchListDiv" style={{ width: "100%" }}>
                                            {relatedList
                                                .filter(movie => movie.movieId !== Infolist[0].movieId)
                                                .map((data, index) => (
                                                    <div key={`related-${data.movieId}-${index}`} className="SearchImgDiv" style={{ backgroundImage: `url('${data.posterUrl}')` }} />
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
            case 'review':
                return (
                    <div className="Reservemodal">
                        <div>
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
            case 'complete' :
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