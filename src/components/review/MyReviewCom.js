import MypageSidebar from "../common/MypageSidebar"
import "../../css/review/MyReview.css"
import Pagination from "../common/Pagination"

const MyReviewCom = ({ list, start, handlePageChange }) => {
    return <>
        <div className="ReviewTotalDiv">
            <MypageSidebar activeLink="내 리뷰" />
            <div className="ReviewWrapdiv">
                <p>내 리뷰</p>
                {list.dto.length === 0 ? (<h2>작성한 리뷰가 없습니다.</h2>) :
                    (list.dto.map((data) => (
                        <div className="myReviewBody" key={data.reviewNo}>
                            <img className="moviePoster" src={`${data.posterUrl}`} alt="영화 포스터 이미지" />
                            <div>
                                <p className="reviewTitle">{data.title}</p>
                                <div className="reviewPageContent">
                                    <img className="reviewPng" src="/img/review.png" alt="리뷰" />
                                    <p>{data.content}</p>
                                </div>
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