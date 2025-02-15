import MypageSidebar from "../common/MypageSidebar"
import "../../css/review/MyReview.css"
import Pagination from "../common/Pagination"

const MyReviewCom = ({ list, start, handlePageChange }) => {
    return <>
        <div className="ReviewTotalDiv">
            <MypageSidebar activeLink="내 리뷰" />
            <div className="ReviewWrapdiv">
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
                <Pagination start={start} list={list} handlePageChange={handlePageChange} />
            </div>
        </div>
    </>
}

export default MyReviewCom