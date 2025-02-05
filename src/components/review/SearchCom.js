import { useEffect, useState } from "react"
import styled from "styled-components"
import { translateText } from "../../service/review"

const NolistDiv = styled.div`
    width:100%;
    height:600px;
    background:#171717;
`
const Nolisth1 = styled.h1`
    color:white;
`

const Nolisth2 = styled.h1`
    text-align:center;
    margin-top:200px;
    color:white;
`

const Wrapdiv = styled.div`
    background:#171717;
`
const ListDiv = styled.div`
    width:100%;
    min-height:600px;
    display:flex;
    flex-wrap: wrap;
`

const ImgDiv = styled.div`
    width : 16%;
    height: 200px;
    margin-right:5%;
    margin-top : 20px;
    background-image: ${(props) => `url("${props.$bgImage}")`};
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    position:relative;
    border-radius:10px;
    &:nth-child(5n) { margin-right: 0; }
`
const ModalWrap = styled.div`
    display:none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
`
const ModalButton = styled.button`.
    display:none;
    position: absolute;
    width: 70px;
    height: 30px;
    font-size: 12px;
    background-color: blueviolet;
    font-weight : bold;
    color:white;
    border: none;
    border-radius:5px;
    cursor: pointer;
    &:hover{background:red;}
`
const Button1 = styled(ModalButton)`
    top: 130px;
    left: 45px;
`

const Button2 = styled(ModalButton)`
    bottom: 40px;
    right: 45px;
`
const InfoWrap = styled.div`
    display:none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
`
const Infodiv = styled.div`
    position: fixed;
    width: 40%;
    height:90%;
    font-size: 12px;
    background-color: #171717;
    color:white;
    border-radius:10px;
    left:30%;
    top:5%;
    display:flex;
    flex-wrap: wrap;
    align-items: stretch;
    overflow-y: auto;
`

const Info = styled.div`
    width:50%;
    min-height:40%;
`

const Infob = styled.b`
    curosr:pointer;
    margin-left:5px;
    font-size:30px;
`

const Info2 = styled.div`
    width:100%;
    min-height:20%;
`
const InfoButton = styled.button`
    width: 70px;
    height: 30px;
    font-size: 12px;
    background-color: blueviolet;
    font-weight : bold;
    color:white;
    border: none;
    border-radius:5px;
    cursor: pointer;
    &:hover{background:red;}
`

const SearchCom = ({ list, Infolist, id, onClick, showModal, hideModal, showInfo, hideInfo }) => {
    const [translatedTitle, setTranslatedTitle] = useState("")

    useEffect(() => {
        if (Infolist.length > 0) {
            translateText(Infolist[0].title).then((translated) => {
                setTranslatedTitle(translated);
            })
        }
    }, [Infolist])

    if (list.length === 0) {
        return (
            <>
                <NolistDiv>
                    <Nolisth1>'{id}'에 대한 검색 결과</Nolisth1><br />
                    <Nolisth2>검색 결과가 없습니다.</Nolisth2>
                </NolistDiv>
            </>
        )
    }

    return (
        <>
            <Wrapdiv>
                <Nolisth1>'{id}'에 대한 검색 결과</Nolisth1><br />
                <ListDiv>
                    {list.map((data,index) => (
                        <ImgDiv key={`list-${data.movieId}-${index}`} $bgImage={`/img/${data.posterUrl}`} onMouseEnter={() => showModal(data.movieId)} onMouseLeave={() => hideModal(data.movieId)}>
                            <ModalWrap className={`modal-${data.movieId}`}>
                                <Button1 onClick={() => showInfo(data.movieId)}>상세보기</Button1>
                                <Button2 onClick={() => onClick()}>예매하기</Button2>
                            </ModalWrap>
                        </ImgDiv>
                    ))}
                </ListDiv>
                <InfoWrap className="info">
                    <Infodiv>
                        {Infolist.length > 0 && (
                            <>
                                <Info>
                                    <Infob onClick={() => hideInfo()}>X</Infob>
                                    <div style={{ marginLeft: "10%", marginTop: "25%" }}>
                                        <h1>{Infolist[0].title}</h1>
                                        <h2>{translatedTitle || Infolist[0].title}</h2>
                                        <h3>감독 : {Infolist[0].director}</h3>
                                        <h3>배우 : {Infolist[0].actors}</h3><br />
                                        <InfoButton onClick={() => onClick()}>예매하기</InfoButton>
                                    </div>
                                </Info>

                                <Info style={{ textAlign: 'center' }}>
                                    <img
                                        src={`/img/${Infolist[0].posterUrl}`}
                                        alt="영화 포스터 이미지"
                                        style={{ width: '80%', height: '80%', marginTop: "40px", borderRadius: "10px" }}
                                    />
                                </Info>

                                <Info style={{ position: 'relative' }}>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)'
                                        }}
                                    >
                                        {Infolist[0].synopsis}
                                    </div>
                                </Info>

                                <Info>
                                    <h1 style={{transform : "translateX(30px)"}}>REVIEW</h1>
                                    {Infolist.map((data, index) => (
                                        <div key={`info-${data.movieId}-${data.reviewDate}-${index}`} style={{ marginBottom: "10px", marginLeft:"30px" }}>
                                            <p><img src="#" alt="프로필사진" style={{width: "20px" , height:"20px"}}/>&nbsp;&nbsp;&nbsp;
                                            {data.userId}&nbsp;{data.reviewDate}</p>
                                            <p>{data.content}</p>
                                        </div>
                                    ))}
                                </Info>

                                <Info2>
                                    <h1>관련컨텐츠</h1>
                                    <ListDiv>
                                        {list
                                            .filter((data) => data.movieId !== Infolist[0].movieId)
                                            .map((data,index) => (
                                                <ImgDiv key={`related-${data.movieId}-${index}`} $bgImage={`/img/${data.posterUrl}`} />
                                            ))}
                                    </ListDiv>
                                </Info2>
                            </>
                        )}
                    </Infodiv>
                </InfoWrap>
            </Wrapdiv>
        </>
    )
}

export default SearchCom;