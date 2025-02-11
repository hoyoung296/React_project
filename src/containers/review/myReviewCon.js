import { useNavigate, useSearchParams } from "react-router-dom"
import MyReviewCom from "../../components/review/MyReviewCom"
import { useEffect, useState } from "react"
import { getReviewList } from "../../service/review"

const MyReviewCon = () => {
    const [params] = useSearchParams()
    const [list, setList] = useState({ dto: [], page: 0 })
    const [start, setStart] = useState(params.get("start") || 1)
    const id = params.get("id")

    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getReviewList(id, start)
                setList(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getData()
    }, [id, start])

    const handlePageChange = (page) => {
        setStart(page)
        navigate(`/myReview?id=${id}&start=${page}`)
    }

    return (
        <>
            <MyReviewCom list={list} start={start} handlePageChange={handlePageChange} />
        </>
    )
}

export default MyReviewCon;