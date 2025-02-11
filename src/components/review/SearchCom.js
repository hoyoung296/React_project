import { useEffect, useState } from "react"
import styled from "styled-components"
import { translateText } from "../../service/review"

const Wrapdiv = styled.div`
    width:100%;
    height:800px;
    background:#171717;
    color:white;
`

const Nolisth2 = styled.h1`
    text-align:center;
    margin-top:200px;
    color:white;
`

const ListDiv = styled.div`
    width:98%;
    min-height:600px;
    margin : 0 auto;
    display:flex;
    flex-wrap: wrap;
`

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

const ModalButton = styled.button`
    width: 60px;
    min-height: 28px;
    font-size: 12px;
    background-color: #381E72;
    color:white;
    border: none;
    border-radius:5px;
    cursor: pointer;
    &:hover{background: #7857bd;}
    bottom : 10px;
    margin-bottom:10px;
`

const InfoWrap = styled.div`
    display:none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
`

const Infodiv = styled.div`
    position: fixed;
    width: 50%;
    height:100%;
    font-size: 12px;
    background-color: #171717;
    color:white;
    border-radius:10px;
    left:25%;
    display:flex;
    flex-wrap: wrap;
    align-items: stretch;
    overflow-y: auto;
`

const Info = styled.div`
    width:50%;
    min-height:40%;
`

const Infospan = styled.span`
    curosr:pointer;
    margin-left:5px;
    font-size:30px;
`

const Info2 = styled.div`
    width:100%;
    min-height:20%;
`

const InfoButton = styled.button`
    width: 80px;
    min-height: 28px;
    font-size: 12px;
    background-color: #381E72;
    color:white;
    border: none;
    border-radius:5px;
    cursor: pointer;
    &:hover{background: #7857bd;}
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
            <Wrapdiv>
                <h1 style={{ width: "98%", margin: "0 auto" }}>'{id}'에 대한 검색 결과</h1><br />
                {list.length === 0 ? (
                    <Nolisth2>검색 결과가 없습니다.</Nolisth2>
                ) : (
                    <ListDiv>
                        {list.map((data, index) => (
                            <ImgDiv
                                key={`list-${data.movieId}-${index}`}
                                $bgImage={`/img/${data.posterUrl}`}
                                onMouseEnter={() => showModal(data.movieId)}
                                onMouseLeave={() => hideModal(data.movieId)}
                            >
                                <ModalWrap className={`modal-${data.movieId}`}>
                                    <ModalButton onClick={() => showInfo(data.movieId)}>상세보기</ModalButton>
                                    <ModalButton onClick={() => onClick()}>예매하기</ModalButton>
                                </ModalWrap>
                            </ImgDiv>
                        ))}
                    </ListDiv>
                )}

                {infoId !== null && (
                    <InfoWrap className="info">
                        <Infodiv>
                            {Infolist.length > 0 && (
                                <>
                                    <Info>
                                        <Infospan onClick={() => hideInfo()}>X</Infospan>
                                        <div style={{ marginLeft: "10%", marginTop: "50%" }}>
                                            <h1>{Infolist[0].title}</h1><br />
                                            <h2>{translatedTitle || Infolist[0].title}</h2><br />
                                            <h3>감독 : {Infolist[0].director}</h3>
                                            <h3>배우 : {Infolist[0].actors}</h3><br />
                                            <InfoButton onClick={() => onClick()}>예매하기</InfoButton>
                                        </div>
                                    </Info>

                                    <Info style={{ textAlign: 'center' }}>
                                        <img src={`/img/${Infolist[0].posterUrl}`} alt="영화 포스터 이미지" style={{width: '310px', height: '350px', marginTop: "40px"}}/>
                                    </Info>

                                    <Info style={{ position: 'relative' }}>
                                        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                                            {Infolist[0].synopsis}
                                        </div>
                                    </Info>

                                    <Info>
                                        <h1 style={{ transform: "translateX(30px)" }}>REVIEW</h1>
                                        {Infolist.map((data, index) => (
                                            <div key={`info-${data.movieId}-${data.reviewDate}-${index}`} style={{ marginBottom: "10px", marginLeft: "30px" }}>
                                                {data.content != null &&
                                                    <p>
                                                        <img src="/img/movie1.jpg" alt="프로필사진" style={{ width: "20px", height: "20px", borderRadius: "10px" }} />&nbsp;&nbsp;&nbsp;
                                                        {data.userId} {data.reviewDate}
                                                    </p>}
                                                <p>{data.content}</p>
                                            </div>
                                        ))}
                                    </Info>

                                    <Info2>
                                        <h1>관련컨텐츠</h1>
                                        <ListDiv style={{width:"100%"}}>
                                            {list
                                                .filter((data) => data.movieId !== Infolist[0].movieId)
                                                .map((data, index) => (
                                                    <ImgDiv key={`related-${data.movieId}-${index}`} $bgImage={`/img/${data.posterUrl}`} />
                                                ))}
                                        </ListDiv>
                                    </Info2>
                                </>
                            )}
                        </Infodiv>
                    </InfoWrap>
                )}
            </Wrapdiv>
        </>
    )
}

export default SearchCom;