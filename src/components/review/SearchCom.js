import "../../css/review/Search.css"
import Modal from "../mainPage/Modal"

const SearchCom = ({ list, Infolist, relatedList = [], id, infoId, onClick, showInfo, hideInfo, isModalOpen, modalType }) => {
    return (
        <div className="SearchWrapdiv">
            <h1>'{id}'에 대한 검색 결과</h1><br />
            {list.length === 0 ? (
                <h2>검색 결과가 없습니다.</h2>
            ) : (
                <div className="SearchListDiv">
                    {list.map((data, index) => (
                        <div
                            key={`list-${data.movieId}-${index}`}
                            className="SearchImgDiv"
                            style={{ backgroundImage: `url('${data.posterUrl}')` }}
                            onMouseEnter={() => document.querySelector(`.modal-${data.movieId}`).style.display = "flex"}
                            onMouseLeave={() => document.querySelector(`.modal-${data.movieId}`).style.display = "none"}
                        >
                            <div className={`SearchModalWrap modal-${data.movieId}`}>
                                <button className="SearchModalButton" onClick={() => showInfo(data.movieId)}>상세보기</button>
                                <button className="SearchModalButton" onClick={() => onClick(data.title)}>예매하기</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {infoId !== null && (
                <Modal isOpen={isModalOpen} onClose={hideInfo} type={modalType} infoData={Infolist[0]} onClick={onClick} relatedList={relatedList} Infolist={Infolist} />
            )}
        </div>
    )
}

export default SearchCom;