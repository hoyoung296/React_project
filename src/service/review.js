import axios from "axios"

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY
// 집에서 작업시 필요, 지우지 말아주세요 ~~ (나호영 작성)
// const BASE_URL = "http://localhost:8080/root/review"

// 학원에서만 나호영 노트북 아이피로 연결 (나호영 작성) 
const BASE_URL = "http://192.168.0.91:8080/root/review"

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
        const res = await axios.delete(`${BASE_URL}/del`, {
            params: { id },
        })
        return res.data
    } catch (error) {
        console.error("예매 취소 실패 : ", error)
        throw error
    }
}

// 번역 API 호출
const translateText = async (text, targetLang = "en") => {
    try {
        const res = await axios.post(
            `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
            {
                q: text,
                target: targetLang,
                source: "ko",
                format: "text",
            },
            {
                headers: { "Content-Type": "application/json" },
            }
        )

        if (res.data.data && res.data.data.translations.length > 0) {
            return res.data.data.translations[0].translatedText
        } else {
            throw new Error("번역 데이터를 가져오지 못했습니다.")
        }
    } catch (error) {
        console.error("번역 오류:", error)
        return text
    }
}

export { getSearchList, getInfoList, getReviewList, getReserveList, checkReview, writeReview, delReserve, translateText }