import axios from "axios"

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/root/review`

// 예매 내역 가져오기
const getReserveList = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/reserve`, {
            params: { id },
        })
        return res.data
    } catch (error) {
        console.error("예매 내역 가져오기 오류 : ", error)
        throw error
    }
}

// 예매 내역 리뷰쓰기 버튼 관련 리뷰 있는지 없는지 확인
const checkReview = async (id, movieid) => {
    try {
        const res = await axios.get(`${BASE_URL}/reviewCheck`, {
            params: { id, movieid },
        })
        return res.data
    } catch (error) {
        console.error("리뷰 확인 실패 : ", error)
        throw error
    }
}

// 리뷰 작성
const writeReview = async (id) => {
    try {
        const res = await axios.post(`${BASE_URL}/writeReview`, id, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        return res.data
    } catch (error) {
        console.error("리뷰 작성 실패 : ", error)
        throw error
    }
}

// 예매 취소
const delReserve = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:8080/root/member/payment/cancel`, {
            params: { id },
        })
        return res.data
    } catch (error) {
        console.error("예매 취소 실패 : ", error)
        throw error
    }
}

export { getReserveList, checkReview, writeReview, delReserve }