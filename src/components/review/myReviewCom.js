const MyReviewCom = ({ list }) => {
    return <>
        {list.dto.map((data) => (
            <div key={data.reviewNo}>
                리뷰번호 : {data.reviewNo}<br />
                내용 : {data.content}<br />
                사용자 아이디 : {data.userId}<br />
                작성시간 : {data.reviewDate}<br />
                영화번호 : {data.movieId} <br />
                양화제목 : {data.title} <br />
                영화포스터 : {data.posterUrl} <br />
                영화시놉시스 : {data.synopsis} <br />
                감독 : {data.director} <br />
                출연배우 : {data.actors} <br />
                <hr />
            </div>
        ))}
      <p>페이지 수: {list.page}</p>
    </>
}

export default MyReviewCom