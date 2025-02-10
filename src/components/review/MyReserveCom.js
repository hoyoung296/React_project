import { useSearchParams } from "react-router-dom"
import styled from "styled-components"
import Sidebar from "../common/Sidebar"
import { checkReview } from "../../service/review"

const TotalDiv = styled.div`
    width:100%
    height:100%;
    background:#171717;
    display:flex;
    color : white;
`

const Wrapdiv = styled.div`
    width:80%;
    height:800px;
    color:white;
    position: relative;
`

const Noreserveh2 = styled.h1`
    color: white;
    text-align: center;
    margin-top: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const ReserveDiv = styled.div`
    width:95%;
    min-height:15%;
    border-radius : 5px;
    display:flex;
    align-items: stretch;
    border : 1px solid white;
    position: relative;
    margin-bottom: 20px;
    flex-wrap: wrap;
    height: auto;
`

const ReserveImg = styled.img`
    width : 30%;
    height : 80%;
    border-radius : 5px;
    margin-left : 10%
`

const InfoPartDiv = styled.div`
    flex-grow: 1;
    width:30%;
    margin-right:5%;
    &:nth-child(3n) { margin-right: 0; }
`
const InfoPart1Div = styled(InfoPartDiv)`
    display: flex;
    align-items: center;
`
const reserveButton = styled.button`.
    display:none;
    position: relative;
    width: 30%;
    min-height: 30%;
    font-size: 12px;
    background-color: blueviolet;
    font-weight : bold;
    color:white;
    border: none;
    border-radius:5px;
    cursor: pointer;
    &:hover{background:red; color:black;}
`

const Button1 = styled(reserveButton)`
    top: 60%;
    left: 20%;
`

const Button2 = styled(reserveButton)`
    top: 60%;
    left: 30%;
`

const PagingButton = styled.button`
    color: white;
    margin: 0 5px;
    cursor: pointer;
    border: none;
    background: none;
`

const PagingDiv = styled.div`
    position: absolute;
    bottom: 0;
    background: #171717;
    padding: 10px 0;
    text-align: center;
    width: 100%;
    z-index: 1;
`

const MyReserveCom = ({ list, start, handlePageChange, del }) => {
    const renderPageNumbers = () => {
        const pageNumbers = []
        for (let i = 1; i <= list.page; i++) {
            pageNumbers.push(
                <PagingButton key={i} onClick={() => { handlePageChange(i) }}>
                    [{i}]
                </PagingButton>
            )
        }
        return pageNumbers
    }

    const userId = list?.dto?.[0]?.userId;
    const [params] = useSearchParams()
    const paramId = params.get("id")

    const customLinks = [
        { to: "/myTicket", text: "내 예매내역", },
        { to: userId ? `/myReview?id=${userId}&start=` : `/myReview?id=${paramId}&start=`, text: "내 리뷰", },
        { to: userId ? `/info_pwd?id=${userId}` : `/info_pwd?id=${paramId}`, text: "회원정보 수정", },
    ]

    return <>
        <TotalDiv>
            <Sidebar list={list} customLinks={customLinks} activeLink="내 예매내역" userId={userId} paramId={paramId} />
            <Wrapdiv>
                <h1>내 예매내역</h1><br />
                {list.dto.length === 0 ? (<Noreserveh2>예매 내역이 없습니다.</Noreserveh2>) :
                    (list.dto.map((data) => {
                        const hasReview = checkReview(data.userId, data.movieId)

                        return <>
                            <ReserveDiv key={data.reservationId}>
                                <InfoPart1Div>
                                    <ReserveImg src={`/img/${data.posterUrl}`} alt="영화 포스터 이미지" />
                                    <b style={{ marginLeft: "10%", marginTop: "10%" }}>{data.title}</b>
                                </InfoPart1Div>
                                <InfoPartDiv>
                                    <p><b>끝나는 시간 : {data.endDateTime}</b></p><br />
                                    <p><b>예매번호 : {data.reservationId}</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>상영관 : {data.screenName}</b></p><br />
                                    <p><b>관람일 : {data.startDateTime}</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>좌석 : {data.seatRow}{data.seatNumber}</b></p>
                                </InfoPartDiv>
                                <InfoPartDiv>
                                    {/* {hasReview === 0 && <Button1>리뷰 쓰기</Button1>} */}
                                    <Button1 onClick>리뷰 쓰기</Button1>
                                    <Button2 onClick={()=>del(data.reservationId)}>예매 취소</Button2>
                                </InfoPartDiv>
                            </ReserveDiv>
                        </>
                    })
                    )}
                <PagingDiv>
                    {start > 1 && (
                        <button onClick={() => handlePageChange(start - 1)}>
                            이전
                        </button>
                    )}

                    {renderPageNumbers()}

                    {start < list.page && (
                        <button onClick={() => handlePageChange(start + 1)}>
                            다음
                        </button>
                    )}
                </PagingDiv>
            </Wrapdiv>
        </TotalDiv>
    </>
}

export default MyReserveCom