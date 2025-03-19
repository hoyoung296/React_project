import axios from "axios"

const BASE_URL = "http://43.203.54.252:8080/root/review"

// 리뷰 리스트 가져오기
const getReviewList = async (id, start) => {
    try {
        const res = await axios.get(`${BASE_URL}/info`, {
            params: { id, start },
        })
        return res.data
    } catch (error) {
        console.error("리뷰 리스트 가져오기 오류 : ", error)
        throw error
    }
}

export { getReviewList }