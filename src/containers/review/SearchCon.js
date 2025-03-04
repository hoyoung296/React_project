import { useNavigate, useSearchParams } from "react-router-dom"
import SearchCom from "../../components/review/SearchCom"
import { useEffect, useState } from "react"
import { getSearchList, getInfoList } from "../../service/review"

const SearchCon = () => {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const [list, setList] = useState([])
    const [Infolist, setInfolist] = useState([])
    const [infoId, setInfoId] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState(null)
    const id = params.get("id")

    useEffect(() => {
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
        if (!infoId) return
        const getInfo = async () => {
            try {
                const data = await getInfoList(infoId);
                setInfolist(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getInfo()
    }, [infoId])

    const getRelatedMovies = (names) => {
        const cleanedNames = names
            .split(",")
            .map(name => name.trim())
            .filter(name => name.length > 0)

        return list.filter(movie => {
            const director = movie.director || ''
            const actors = movie.actors || ''
            return cleanedNames.some(name =>
                director.includes(name) || actors.includes(name)
            )
        })
    }

    const onClick = (id) => {
        navigate("/ticket_date?title=" + id)
    }

    const showInfo = (movieId) => {
        setInfoId(movieId)
        setModalType("detail")
        setIsModalOpen(true)
    }

    const hideInfo = () => {
        setIsModalOpen(false)
        setModalType(null)
    }

    const relatedList = Infolist.length > 0
        ? getRelatedMovies(Infolist[0].director + ',' + Infolist[0].actors)
        : []

    return (
        <SearchCom list={list} Infolist={Infolist} id={id} infoId={infoId} relatedList={relatedList} onClick={onClick} showInfo={showInfo}
            hideInfo={hideInfo} isModalOpen={isModalOpen} modalType={modalType}
        />
    )
}

export default SearchCon;
