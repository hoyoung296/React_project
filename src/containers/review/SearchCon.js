import { useNavigate, useSearchParams } from "react-router-dom"
import SearchCom from "../../components/review/SearchCom"
import { useEffect, useState } from "react"
import { getSearchList } from "../../service/review"
import { getInfoList } from "../../service/review"

const SearchCon = () => {
    const navigate = useNavigate()
    const [params] = useSearchParams() // URL 쿼리 파라미터 가져오기
    const [list, setList] = useState([])
    const [Infolist, setInfolist] = useState([])
    const [infoId, setInfoId] = useState(); // 상태 추가
    const id = params.get("id") // URL에서 id 값 가져오기

    useEffect(() => {
        // if (!id) {
        //     console.error("유효한 ID가 없습니다.")
        //     return
        // }
        const getData = async () => {
            try {
                const data = await getSearchList(id || ""); // id를 전달하여 데이터 가져오기
                setList(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getData()
    }, [params]) // params가 변경될 때마다 다시 실행

    useEffect(() => {
        if (!infoId)
            return; // infoId가 없으면 실행 안 함
        const getInfo = async () => {
            try {
                const data = await getInfoList(infoId)
                setInfolist(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getInfo()
    }, [infoId])

    const onClick = () => {
        navigate("/ticket_date")
    }

    const showModal = (movieId) => {
        const elements = document.getElementsByClassName(`modal-${movieId}`);
        if (elements.length > 0)
            elements[0].style.display = "block"
    }

    const hideModal = (movieId) => {
        const elements = document.getElementsByClassName(`modal-${movieId}`);
        if (elements.length > 0)
            elements[0].style.display = "none"
    }

    const showInfo = (movieId) => {
        const elements = document.getElementsByClassName("info");
        if (elements.length > 0)
            elements[0].style.display = "block"
        setInfoId(movieId);
    }

    const hideInfo = () => {
        const elements = document.getElementsByClassName("info");
        if (elements.length > 0)
            elements[0].style.display = "none"
    }

    return <>
        <SearchCom list={list} Infolist={Infolist} id={id} infoId={infoId} onClick={onClick} showModal={showModal} hideModal={hideModal} showInfo={showInfo} hideInfo={hideInfo} />
    </>
}

export default SearchCon