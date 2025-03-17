import { useNavigate, useSearchParams } from "react-router-dom"
import SearchCom from "../../components/search/SearchCom"
import { useEffect, useState } from "react"
import { getSearchList, getInfoList } from "../../service/search"

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
                const data = await getInfoList(infoId)
                setInfolist(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getInfo()
    }, [infoId])

    const getRelatedMovies = () => {
        if (Infolist.length === 0) return []
        const standardDirector = Infolist[0].director ? Infolist[0].director.split(",").map(name => name.trim()) : []
        const standardActors = Infolist[0].actors ? Infolist[0].actors.split(",").map(name => name.trim()) : []
        return list.filter(movie => {
            const movieDirectors = movie.directorName ? movie.directorName.split(",").map(name => name.trim()) : []
            const movieActors = movie.actors ? movie.actors.split(",").map(name => name.trim()) : []
            const isRelated = movieDirectors.some(director => standardDirector.includes(director)) || movieActors.some(actor => standardActors.includes(actor))
            return isRelated
        })
    }

    const onClick = (id) => {
        navigate("/ticket/date?title=" + id)
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

    const relatedList = Infolist.length > 0 ? getRelatedMovies(Infolist[0].director + ',' + Infolist[0].actors) : []

    return (
        <SearchCom list={list} Infolist={Infolist} id={id} infoId={infoId} relatedList={relatedList} onClick={onClick} showInfo={showInfo}
            hideInfo={hideInfo} isModalOpen={isModalOpen} modalType={modalType}
        />
    )
}

export default SearchCon