import styled from "styled-components"

const NolistDiv = styled.div`
    width:100%;
    height:600px;
    background:#171717;
`
const Nolisth1 = styled.h1`
    color:white;
`

const Nolisth2 = styled.h1`
    text-align:center;
    margin-top:200px;
    color:white;
`

const Wrapdiv = styled.div`
    background:#171717;
`
const ListDiv = styled.div`
    width:100%;
    min-height:600px;
    display:flex;
    flex-wrap: wrap;
`

const ImgDiv = styled.div`
    width : 16%;
    height: 200px;
    margin-right:5%;
    margin-top : 20px;
    background-image: ${(props) => `url("${props.$bgImage}")`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position:relative;
    &:nth-child(5n) { margin-right: 0; }
    &:hover{}
`
const ModalWrap = styled.div`
    display:none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
`
const ModalButton = styled.button`.
    display:none;
    position: absolute;
    width: 50px;
    height: 30px;
    font-size: 12px;
    background-color: #171717;
    color:white;
    border: none;
    border-radius:5px;
    cursor: pointer;
    &:hover{background:red;}
`
const Button1 = styled(ModalButton)`
    top: 130px;
    left: 65px;
`

const Button2 = styled(ModalButton)`
    bottom: 40px;
    right: 65px;
`

const SearchCom = ({ list, id, onClick,showModal,hideModal}) => {
    if (list.length === 0) {
        return (
            <>
                <NolistDiv>
                    <Nolisth1>'{id}'에 대한 검색 결과</Nolisth1><br />
                    <Nolisth2>검색 결과가 없습니다.</Nolisth2>
                </NolistDiv>
            </>
        );
    }

    return (
        <>
            <Wrapdiv>
                <Nolisth1>'{id}'에 대한 검색 결과</Nolisth1><br />
                <ListDiv>
                    {list.map((data) => (
                        <ImgDiv key={data.movieId} $bgImage={`/img/${data.posterUrl}`} onMouseEnter={()=>showModal(data.movieId)} onMouseLeave={()=>hideModal(data.movieId)}>
                            <ModalWrap className={`modal-${data.movieId}`}>
                                <Button1 onClick>상세보기</Button1>
                                <Button2 onClick={()=>onClick()}>예매하기</Button2>
                            </ModalWrap>
                        </ImgDiv>
                    ))}
                </ListDiv>
            </Wrapdiv>
        </>
    );
};

export default SearchCom;

/* <div key={data.movieId}>
영화번호 : {data.movieId} <br />
양화제목 : {data.title} <br />
영화포스터 : {data.posterUrl} <br />
영화시놉시스 : {data.synopsis} <br />
감독 : {data.director} <br />
출연배우 : {data.actors} <br />
<hr />
</div> */