import styled from "styled-components"
import MypageSidebar from "../common/MypageSidebar"
import { useSearchParams } from "react-router-dom"

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

const Noreviewh2 = styled.h1`
    color: white;
    text-align: center;
    margin-top: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const ReviewDiv = styled.div`
    width:95%;
    height:20%;
    border-radius : 5px;
    display:flex;
    border : 1px solid white;
    position: relative;
    margin-bottom: 20px;
`

const ReviewImg = styled.img`
    width : 10%;
    height : 85%;
    margin-left: 2%;
    margin-top: 1%;
`

const ReviewinfoDiv = styled.div`
    width : 70%;
    height : 80%;
    color:white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-bottom:10px;
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

const MyReviewCom = ({ list, start, handlePageChange }) => {
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
        { to: userId ? `/myTicket?id=${userId}&start=` : `/myTicket?id=${paramId}&start=`, text: "내 예매내역", },
        { to: "/myReview", text: "내 리뷰", },
        { to: userId ? `/info_pwd?id=${userId}` : `/info_pwd?id=${paramId}`, text: "회원정보 수정", },
    ]

    return <>
        <TotalDiv>
            <MypageSidebar list={list} customLinks={customLinks} activeLink="내 리뷰" userId={userId} paramId={paramId} />
            <Wrapdiv>
                <h1>내 리뷰</h1><br />
                {list.dto.length === 0 ? (<Noreviewh2>작성한 리뷰가 없습니다.</Noreviewh2>) :
                    (list.dto.map((data) => (
                        <ReviewDiv key={data.reviewNo}>
                            <ReviewImg src={`/img/${data.posterUrl}`} alt="영화 포스터 이미지" />
                            <ReviewinfoDiv>
                                <p style={{ marginTop: "3%" }}><b>{data.title}</b></p><br /><br />
                                <img src="/img/review/bloom.png" alt="말풍선" style={{ width: '30px', height: '30px', marginTop: "-10px" }} />&nbsp;&nbsp;&nbsp;
                                <b style={{ fontSize: "20px", display: "inline-block", position: "relative", top: "-7px" }}>{data.content}</b>
                            </ReviewinfoDiv>
                        </ReviewDiv>
                    ))
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

export default MyReviewCom