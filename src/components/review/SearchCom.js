import styled from "styled-components"

const NolistDiv = styled.div`
    width:100%;
    height:600px;
`

const Nolisth1 = styled.h1`
    text-align:center;
    margin-top:200px;
`

const ListDiv = styled.div`
    width:100%;
    min-height:600px;
    border : 1px solid white;
    display:flex;
    flex-wrap: wrap;
`

const ImgDiv = styled.div`
    border : 1px solid white;
    width : 16%;
    height : 30%;
    margin-right:5%;
    margin-top : 20px;
    background: url(${(props) => props.$bgImage});
    background-size : 100% 100%;
    &:nth-child(5n){margin-right : 0;}
`

const SearchCom = ({ list, id }) => {
    if (list.length === 0) {
        return <>
            <NolistDiv>
                <h1>'{id}'에 대한 검색 결과</h1><br />
                <Nolisth1>검색 결과가 없습니다.</Nolisth1>
            </NolistDiv>
        </>
    }

    return <>
        <h1>'{id}'에 대한 검색 결과</h1><br />
        <ListDiv>
            {list.map((data) => (
                <ImgDiv key={data.movieId} $bgImage={`http://localhost:8080/project/review/image/${data.posterUrl}`} />
            ))}
        </ListDiv>
    </>
}

export default SearchCom

/* <div key={data.movieId}>
영화번호 : {data.movieId} <br />
양화제목 : {data.title} <br />
영화포스터 : {data.posterUrl} <br />
영화시놉시스 : {data.synopsis} <br />
감독 : {data.director} <br />
출연배우 : {data.actors} <br />
<hr />
</div> */