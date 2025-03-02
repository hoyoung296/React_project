import "../../css/review/Search.css"
import Modal from "../mainPage/Modal"

const SearchCom = ({ list, Infolist, relatedList = [], id, infoId, onClick, showInfo, hideInfo, isModalOpen, modalType }) => {
    return (
        <div className="SearchWrapdiv">
            <h1>'<span>{id}</span>' 에 대한 검색 결과</h1><br />
            {list.length === 0 ? (
                <h2>검색 결과가 없습니다.</h2>
            ) : (
                <div className="movieList">
    {list.map((data, index) => (
        <div className="poster" key={index}>
            <img src={data.posterUrl} alt={data.title} className="SearchImg" />
            <div className="overlay">
                <button onClick={() => showInfo(data.movieId)}>상세보기</button>
                <button onClick={() => onClick(data.title)}>예매하기</button>
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