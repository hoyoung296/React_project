import { useNavigate, useSearchParams } from "react-router-dom"
import SearchCom from "../../components/review/SearchCom"
import { useEffect, useState } from "react"
import { getSearchList, translateText } from "../../service/review"
import { getInfoList } from "../../service/review"

const SearchCon = () => {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const [list, setList] = useState([])
    const [Infolist, setInfolist] = useState([])
    const [infoId, setInfoId] = useState()
    const [translatedTitle, setTranslatedTitle] = useState("")
    const id = params.get("id")

    useEffect(() => {
        // if (!id) {
        //     console.error("유효한 ID가 없습니다.")
        //     return
        // }
        const getData = async () => {
            try {
                const data = await getSearchList(id || "")
                setList(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getData()
    }, [id])

    useEffect(() => {
        if (!infoId)
            return
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

    useEffect(() => {
        if (!infoId) return;
        const getInfo = async () => {
            try {
                const data = await getInfoList(infoId);
                setInfolist(data)
                // 영화 제목 번역
                if (data && data.length > 0) {
                    const translated = await translateText(data[0].title)
                    setTranslatedTitle(translated); // 번역된 제목 상태 설정
                }
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getInfo()
    }, [infoId])

    // 관련 영화 가져오기 (감독, 배우로 필터링)
    const getRelatedMovies = (names) => {
        const cleanedNames = names
            .split(",")
            .map(name => name.trim())
            .filter(name => name.length > 0);

        return list.filter(movie => {
            const director = movie.director || '';  
            const actors = movie.actors || '';      
            return cleanedNames.some(name =>
                director.includes(name) || actors.includes(name)
            );
        });
    };

    const onClick = () => {
        navigate("/ticket_date")
    }

    const showModal = (movieId) => {
        const elements = document.getElementsByClassName(`modal-${movieId}`)
        if (elements.length > 0)
            elements[0].style.display = "flex"
    }

    const hideModal = (movieId) => {
        const elements = document.getElementsByClassName(`modal-${movieId}`)
        if (elements.length > 0)
            elements[0].style.display = "none"
    }

    const showInfo = (movieId) => {
        const elements = document.getElementsByClassName("Searchinfo")
        if (elements.length > 0)
            elements[0].style.display = "block"
        setInfoId(movieId);
    }

    const hideInfo = () => {
        const elements = document.getElementsByClassName("Searchinfo")
        if (elements.length > 0)
            elements[0].style.display = "none"
    }

    const relatedList = Infolist.length > 0
        ? getRelatedMovies(Infolist[0].director + ',' + Infolist[0].actors)
        : [];

    return <>
        <SearchCom list={list} Infolist={Infolist} id={id} infoId={infoId} translatedTitle={translatedTitle} relatedList={relatedList} onClick={onClick} showModal={showModal} hideModal={hideModal} showInfo={showInfo} hideInfo={hideInfo} />
    </>
}

export default SearchCon