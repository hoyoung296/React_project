import { useEffect, useState } from "react"
import { translateText } from "../../service/review"
import "../../css/review/Search.css"

const SearchCom = ({ list, Infolist, id, infoId, onClick, showModal, hideModal, showInfo, hideInfo }) => {
    const [translatedTitle, setTranslatedTitle] = useState("")

    useEffect(() => {
        if (Infolist.length > 0) {
            translateText(Infolist[0].title).then((translated) => {
                setTranslatedTitle(translated);
            })
        }
    }, [Infolist])

    return <>
        <div className="SearchWrapdiv">
            <h1>'{id}'에 대한 검색 결과</h1><br />
            {list.length === 0 ? (<h2>검색 결과가 없습니다.</h2>) : (
                <div className="SearchListDiv">
                    {list.map((data, index) => (
                        <div key={`list-${data.movieId}-${index}`} className="SearchImgDiv" style={{ backgroundImage: `url('/img/${data.posterUrl}')` }} onMouseEnter={() => showModal(data.movieId)} onMouseLeave={() => hideModal(data.movieId)}>
                            <div className={`SearchModalWrap modal-${data.movieId}`}>
                                <button className="SearchModalButton" onClick={() => showInfo(data.movieId)}>상세보기</button>
                                <button className="SearchModalButton" onClick={() => onClick()}>예매하기</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {infoId !== null && (
                <div className="Searchinfo">
                    <div className="SearchInfodiv">
                        {Infolist.length > 0 && (
                            <>
                                <div className="SearchInfo1">
                                    <span onClick={() => hideInfo()}>X</span>
                                    <div>
                                        <h1>{Infolist[0].title}</h1><br />
                                        <h2>{translatedTitle || Infolist[0].title}</h2><br />
                                        <h3>감독 : {Infolist[0].director}</h3>
                                        <h3>배우 : {Infolist[0].actors}</h3><br />
                                        <button onClick={() => onClick()}>예매하기</button>
                                    </div>
                                </div>

                                <div className="SearchInfo2">
                                    <img src={`/img/${Infolist[0].posterUrl}`} alt="영화 포스터 이미지" />
                                </div>

                                <div className="SearchInfo3">
                                    <div>
                                        {Infolist[0].synopsis}
                                    </div>
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
                                <div className="SearchInfo5">
                                    <h1>관련컨텐츠</h1>
                                    <div className="SearchListDiv" style={{ width: "100%" }}>
                                        {list
                                            .filter((data) => data.movieId !== Infolist[0].movieId)
                                            .map((data, index) => (
                                                <div key={`related-${data.movieId}-${index}`} className="SearchImgDiv" style={{ backgroundImage: `url('/img/${data.posterUrl}')` }} />
                                            ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    </>
}

export default SearchCom