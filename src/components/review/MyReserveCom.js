import { useSearchParams } from "react-router-dom"
import styled from "styled-components"
import Sidebar from "../common/Sidebar"

const TotalDiv = styled.div`
    width:100%;
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
    position: relative;
`

const InfoPart1Div = styled(InfoPartDiv)`
    display: flex;
    align-items: center;
`

const InfoPart2Div = styled(InfoPartDiv)`
    display: flex;
    flex-direction: column; /* 버튼을 위아래 정렬 */
    align-items: center; /* 가로 가운데 정렬 */
    justify-content: center; /* 세로 가운데 정렬 */
    gap: 10px; /* 버튼 간격 조정 */
`

const ReserveButton = styled.button`
    width: 30%;
    font-size: 12px;
    background-color: blueviolet;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px;

    &:hover {
        background: red;
        color: black;
    }
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

const Modal1 = styled.div`
    display:none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999;
`

const Modal2 = styled.div`
    position: fixed;
    width: 40%;
    height:100%;
    font-size: 12px;
    background-color: #171717;
    color:white;
    border-radius:10px;
    left:30%;
    overflow-y: auto;
`

const ReviewForm = styled.form`
    background-color: #171717;
    width: 100%;
    margin-top: 10%;
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ReviewInput = styled.input`
    background-color: #171717;
    width: 100%;
    height: 60%;
    border: none;
    padding-left: 10px;
    padding-top: 5px;
    color: white;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid white;
`

const SubmitButton = styled.button`
    margin-top: 20px;
    background-color: blueviolet;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background: red;
        color: black;
    }
`

const MyReserveCom = ({ list, start, reviewStatus, handlePageChange, del, showModal, hideModal, modalData, mySubmit, onChange }) => {
    const now = new Date()

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

    const userId = list?.dto?.[0]?.userId
    const [params] = useSearchParams()
    const paramId = params.get("id")

    const customLinks = [
        { to: "/myTicket", text: "내 예매내역", },
        { to: userId ? `/myReview?id=${userId}&start=` : `/myReview?id=${paramId}&start=`, text: "내 리뷰", },
        { to: userId ? `/info_pwd?id=${userId}` : `/info_pwd?id=${paramId}`, text: "회원정보 수정", },
    ]

    return <TotalDiv>
        <Sidebar list={list} customLinks={customLinks} activeLink="내 예매내역" userId={userId} paramId={paramId} />
        <Wrapdiv>
            <h1>내 예매내역</h1><br />
            {list.dto.length === 0 ? (<Noreserveh2>예매 내역이 없습니다.</Noreserveh2>) :
                list.dto.map((data) => {
                    const endDateTime = new Date(data.endDateTime);
                    const startDateTime = new Date(
                        data.startDateTime.replace(/(\d{4})년 (\d{2})월 (\d{2})일/, "$1-$2-$3")
                    )
                    const showReviewButton = now > endDateTime
                    const showCancelButton = now < new Date(startDateTime.getTime() - 30 * 60 * 1000)

                    const hasReview = data.reservationId in reviewStatus && reviewStatus[data.reservationId] === 0
                    return (
                        <ReserveDiv key={data.reservationId}>
                            <InfoPart1Div>
                                <ReserveImg src={`/img/${data.posterUrl}`} alt="영화 포스터 이미지" />
                                <b style={{ marginLeft: "10%", marginTop: "10%" }}>{data.title}</b>
                            </InfoPart1Div>
                            <InfoPartDiv>
                                <p><b>예매번호 : {data.reservationId}</b>&nbsp;&nbsp;&nbsp;&nbsp;</p><br />
                                <p><b>상영관 : {data.screenName}</b></p><br />
                                <p><b>관람일 : {data.startDateTime}</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>좌석 : {data.seatRow}{data.seatNumber}</b></p>
                            </InfoPartDiv>
                            {list != null && (
                                <InfoPart2Div>
                                    {showReviewButton && (
                                        hasReview && <ReserveButton onClick={() => showModal(data.title, data.posterUrl, data.director, data.actors, data.movieId)}>리뷰 쓰기</ReserveButton>
                                    )}
                                    {showCancelButton && (
                                        <ReserveButton onClick={() => del(data.reservationId)}>예매 취소</ReserveButton>
                                    )}
                                </InfoPart2Div>
                            )}
                        </ReserveDiv>
                    )
                })
            }
            <PagingDiv>
                {start > 1 && <button onClick={() => handlePageChange(start - 1)}>이전</button>}
                {renderPageNumbers()}
                {start < list.page && <button onClick={() => handlePageChange(start + 1)}>다음</button>}
            </PagingDiv>
        </Wrapdiv>

        {modalData && (
            <Modal1 className="modal">
                <Modal2>
                    <div>
                        <span onClick={hideModal} style={{ cursor: "pointer", marginLeft: "5px", fontSize: "30px" }}>X</span>
                    </div>
                    <div style={{ width: "80%", height: "80%", marginTop: "10%", marginLeft: "10%" }}>
                        <h1 style={{ fontSize: "30px" }}>'{modalData.title}'의 리뷰를 작성해주세요.</h1>
                        <div style={{ display: "flex", width: "100%", height: "40%", marginTop: "10%" }}>
                            <img src={`/img/${modalData.posterUrl}`} alt="영화 포스터" style={{ width: "40%", height: "100%" }} />
                            <div style={{ display: "inline", width: "60%", height: "40%", marginTop: "30%", marginLeft: "5%" }}>
                                <p><b>{modalData.title}</b></p><br />
                                <p><b>감독 : {modalData.director}</b></p><br />
                                <b>배우 : {modalData.actors}</b>
                            </div>
                        </div>
                        <ReviewForm onSubmit={mySubmit}>
                            <ReviewInput name="review" placeholder="리뷰를 적어주세요." onChange={onChange} />
                            <SubmitButton>게시</SubmitButton>
                        </ReviewForm>
                    </div>
                </Modal2>
            </Modal1>
        )}
    </TotalDiv>
}

export default MyReserveCom