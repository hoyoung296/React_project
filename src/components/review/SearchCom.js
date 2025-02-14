import { useEffect, useState } from "react"
import styled from "styled-components"
import { translateText } from "../../service/review"
import "../../css/review/Search.css"

const ImgDiv = styled.div`
    width : 10%;
    height: 270px;
    margin-right:5%;
    margin-top : 20px;
    background-image: ${(props) => `url("${props.$bgImage}")`};
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    position:relative;
    &:nth-child(7n) { margin-right: 0; }
`

const ModalWrap = styled.div`
    display:none;
    justify-content: center;
    align-items: flex-end;
    gap: 10px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`

const SearchCom = ({ list, Infolist, id, infoId, onClick, showModal, hideModal, showInfo, hideInfo }) => {
    const [translatedTitle, setTranslatedTitle] = useState("")

    useEffect(() => {
        if (Infolist.length > 0) {
            translateText(Infolist[0].title).then((translated) => {
                setTranslatedTitle(translated);
            })
        }
    }, [Infolist])

    return (
        <>
            <div className="Wrapdiv">
                <h1>'{id}'에 대한 검색 결과</h1><br />
                {list.length === 0 ? (<h2>검색 결과가 없습니다.</h2>) : (
                    <div className="ListDiv">
                        {list.map((data, index) => (
                            <ImgDiv key={`list-${data.movieId}-${index}`} $bgImage={`/img/${data.posterUrl}`} onMouseEnter={() => showModal(data.movieId)} onMouseLeave={() => hideModal(data.movieId)}>
                                <ModalWrap className={`modal-${data.movieId}`}>
                                    <button className="ModalButton" onClick={() => showInfo(data.movieId)}>상세보기</button>
                                    <button className="ModalButton" onClick={() => onClick()}>예매하기</button>
                                </ModalWrap>
                            </ImgDiv>
                        ))}
                    </div>
                )}

                {infoId !== null && (
                    <div className="info">
                        <div className="Infodiv">
                            {Infolist.length > 0 && (
                                <>
                                    <div className="Info1">
                                        <span onClick={() => hideInfo()}>X</span>
                                        <div>
                                            <h1>{Infolist[0].title}</h1><br />
                                            <h2>{translatedTitle || Infolist[0].title}</h2><br />
                                            <h3>감독 : {Infolist[0].director}</h3>
                                            <h3>배우 : {Infolist[0].actors}</h3><br />
                                            <button onClick={() => onClick()}>예매하기</button>
                                        </div>
                                    </div>

                                    <div className="Info2">
                                        <img src={`/img/${Infolist[0].posterUrl}`} alt="영화 포스터 이미지" />
                                    </div>

                                    <div className="Info3">
                                        <div>
                                            {Infolist[0].synopsis}
                                        </div>
                                    </div>

                                    <div className="Info4">
                                        <h1>REVIEW</h1>
                                        {Infolist.map((data, index) => (
                                            <div key={`info-${data.movieId}-${data.reviewDate}-${index}`}>
                                                {data.content != null &&
                                                    <p>
                                                        <img src="/img/movie1.jpg" alt="프로필사진" />&nbsp;&nbsp;&nbsp;
                                                        {data.userId} {data.reviewDate}
                                                    </p>}
                                                    <br />
                                                <p style={{marginLeft:"8%"}}>{data.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="Info5">
                                        <h1>관련컨텐츠</h1>
                                        <div className="ListDiv" style={{width:"100%"}}>
                                            {list
                                                .filter((data) => data.movieId !== Infolist[0].movieId)
                                                .map((data, index) => (
                                                    <ImgDiv key={`related-${data.movieId}-${index}`} $bgImage={`/img/${data.posterUrl}`} />
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
    )
}

export default SearchCom;