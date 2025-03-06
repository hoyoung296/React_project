import axios from "axios"

const BASE_URL = "http://localhost:8080/root/review"

// 검색 결과 가져오기
const getSearchList = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/search`, {
            params: { id },
        })
        return res.data
    } catch (error) {
        console.error("검색 리스트 가져오기 오류 : ", error)
        throw error
    }
}

// 영화 상세 정보 가져오기
const getInfoList = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/searchInfo`, {
            params: { id },
        })
        return res.data
    } catch (error) {
        console.error("영화 정보 가져오기 오류 : ", error)
        throw error
    }
}

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

// 예매 내역 가져오기
const getReserveList = async (id, start) => {
    try {
        const res = await axios.get(`${BASE_URL}/reserve`, {
            params: { id, start },
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

export { getSearchList, getInfoList, getReviewList, getReserveList, checkReview, writeReview, delReserve }