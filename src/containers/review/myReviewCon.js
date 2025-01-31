import { useSearchParams } from "react-router-dom"
import MyReviewCom from "../../components/review/myReviewCom"
import { useEffect, useState } from "react"
import { getReviewList } from "../../service/review"

const MyReviewCon = () => {
    const [params] = useSearchParams()
    const [list, setList] = useState({ dto: [], page: 0 })
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getReviewList(params.get("id"),params.get("start"))
                setList(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getData()
    },[params.get("id"),params.get("start")])

    return<>
        <MyReviewCom list={list} />
    </>
}

export default MyReviewCon