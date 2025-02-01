const SearchCom = ({ list }) => {
    if(list.length===0){
        return<>
            <div>
                <h1>검색 결과가 없습니다.</h1>
            </div>
        </>
    }
    return <>
        {list.map((data) => (
            <div key={data.movieId}>
                영화번호 : {data.movieId} <br />
                양화제목 : {data.title} <br />
                영화포스터 : {data.posterUrl} <br />
                영화시놉시스 : {data.synopsis} <br />
                감독 : {data.director} <br />
                출연배우 : {data.actors} <br />
                <hr />
            </div>
        ))}
    </>
}

export default SearchCom