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

// 영화 정보 수동 업데이트
const updateMovieManual = async () => {
    try {
        await axios.post(`${BASE_URL}/movie/popular`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
    } catch (error) {
        console.error("영화 정보 수동 업데이트 실패: ", error)
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

// 상영관 정보 가져오기
const getScreen = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/screens`)
        return res.data
    } catch (error) {
        console.error("상영관 정보 불러오기 실패: ", error)
        throw error
    }
}

// 영화 일정 정보 가져오기
const getSchedule = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/schedules`)
        return res.data
    } catch (error) {
        console.error("일정 정보 불러오기 실패: ", error)
        throw error
    }
}

// 영화 일정 추가하기
const updateSchedule = async (id) => {
    try {
        const res = await axios.post(`${BASE_URL}/schedule/insert`, id, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        return res.data
    } catch (error) {
        console.error("영화 일정 추가 실패 : ", error)
        throw error
    }
}

// 영화 일정 삭제하기
const delSchedule = async (id) => {
    try {
        const res = await axios.delete(`${BASE_URL}/schedule/delete`, {
            params: { id },
        })
        return res.data
    } catch (error) {
        console.error("영화 일정 삭제 실패 : ", error)
        throw error
    }
}

// 영화 수동으로 삽입하기
const insert = async (id) => {
    try {
        const res = await axios.post(`${BASE_URL}/movie/insert`, id, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        return res.data
    } catch (error) {
        console.error("영화 수동 삽입 실패 : ", error)
        throw error
    }
}

// 영화 목록 삭제하기
const deleteMovie = async (id) => {
    try {
        const res = await axios.delete(`${BASE_URL}/movie/delete`, {
            params: { id },
        })
        return res.data
    } catch (error) {
        console.error("영화 일정 삭제 실패 : ", error)
        throw error
    }
}

// 결제 내역 가져오기
const getPayment = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/paymentList`)
        return res.data
    } catch (error) {
        console.error("결제 내역 불러오기 실패: ", error)
        throw error
    }
}

export { updateMovie, updateMovieManual, getSchedule, getScreen, getList, updateSchedule, delSchedule, insert, deleteMovie, getPayment }