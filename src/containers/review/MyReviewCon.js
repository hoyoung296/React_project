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

                // start 값이 총 페이지 수보다 큰 경우 첫 번째 페이지로 설정
                if (start > data.page) {
                    setStart(1)
                    navigate(`/myReview?id=${id}&start=1`)  // 첫 번째 페이지로 리디렉션
                }
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getData()
    }, [id, start, navigate])

    const handlePageChange = (page) => {
        setStart(page)
        navigate(`/myReview?id=${id}&start=${page}`)
    }

    return <>
        <MyReviewCom list={list} start={start} handlePageChange={handlePageChange} />
    </>
}

export default MyReviewCon