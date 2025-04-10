import axios from "axios"

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/root/review`

// 모든 영화 리스트 가져오기
const allList = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/list`)
        return res.data
    } catch (error) {
        console.error("모든 영화 리스트 가져오기 오류 : ", error)
        throw error
    }
}

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

export { getSearchList, getInfoList, allList}