import { useSearchParams } from "react-router-dom"
import styled from "styled-components"
import Sidebar from "../common/Sidebar"

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

const MyReserveCom = ({list, start , handlePageChange}) => {
    const renderPageNumbers = () => {
        const pageNumbers = []
        for (let i = 1; i <= list.page; i++) {
            pageNumbers.push(
                <PagingButton key={i} onClick={() => {handlePageChange(i)}}>
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
        {to: "/myTicket",text: "내 예매내역",},
        {to: userId ? `/myReview?id=${userId}&start=` : `/myReview?id=${paramId}&start=`, text: "내 리뷰",},
        {to: userId ? `/info_pwd?id=${userId}` : `/info_pwd?id=${paramId}`,text: "회원정보 수정",},
    ]

    return<>
       <TotalDiv>
       <Sidebar list={list} customLinks={customLinks} activeLink="내 예매내역" userId={userId} paramId={paramId} />
       <Wrapdiv>
            <h1>내 예매내역</h1>
            {list.dto.length === 0 ? (<Noreviewh2>예매 내역이 없습니다.</Noreviewh2>) : (<h1>구상중</h1>)}
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