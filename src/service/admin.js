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


export { updateMovie }