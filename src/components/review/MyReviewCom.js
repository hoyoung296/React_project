import MypageSidebar from "../common/MypageSidebar"
import { useSearchParams } from "react-router-dom"
import "../../css/review/MyReview.css"

const MyReviewCom = ({ list, start, handlePageChange }) => {
    const renderPageNumbers = () => {
        const pageNumbers = []
        for (let i = 1; i <= list.page; i++) {
            pageNumbers.push(
                <button className="PagingButton" key={i} onClick={() => { handlePageChange(i) }}>
                    [{i}]
                </button>
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
        <div className="TotalDiv">
            <MypageSidebar list={list} customLinks={customLinks} activeLink="내 리뷰" userId={userId} paramId={paramId} />
            <div className="Wrapdiv">
                <h1>내 리뷰</h1><br />
                {list.dto.length === 0 ? (<h2>작성한 리뷰가 없습니다.</h2>) :
                    (list.dto.map((data) => (
                        <div className="ReviewDiv" key={data.reviewNo}>
                            <img src={`/img/${data.posterUrl}`} alt="영화 포스터 이미지" />
                            <div>
                                <p><b>{data.title}</b></p><br /><br />
                                <img src="/img/review/bloom.png" alt="말풍선" />&nbsp;&nbsp;&nbsp;
                                <b>{data.content}</b>
                            </div>
                        </div>
                    ))
                    )}
                <div className="PagingDiv">
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
                </div>
            </div>
        </div>
    </>
}

export default MyReviewCom