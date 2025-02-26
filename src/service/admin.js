import axios from "axios"

const BASE_URL = "http://localhost:8080/root/admin"

// 영화 정보 업데이트
const updateMovie = async (movieData) => {
    try {
        const res = await axios.put(`${BASE_URL}/edit_movie`, movieData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        return res.data
    } catch (error) {
        console.error("영화 정보 업데이트 실패: ", error)
        throw error
    }
}

//영화 정보 수동 업데이트
const updateMovieManual = async () => {
    try {
        await axios.post(`${BASE_URL}/movie/popular`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
    } catch (error) {
        console.error("영화 정보 업데이트 실패: ", error)
        throw error
    }
}

// 유저 정보 불러오기
const getList = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/members`)
        return res.data
    } catch (error) {
        console.error("유저 정보 불러오기 실패: ", error)
        throw error
    }
}

// 유저 정보 업데이트
const updateUser = async (userData) => {
    try {
        const res = await axios.put(`${BASE_URL}/edit_user`, userData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        return res.data
    } catch (error) {
        console.error("유저 정보 업데이트 실패: ", error)
        throw error
    }
}

export { updateMovie, updateMovieManual, getList }