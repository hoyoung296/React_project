import { useEffect, useState } from "react"
import AdminMovieCom from "../../components/Admin/AdminMovieCom"
import { getSearchList } from "../../service/search"
import { deleteMovie, insert, updateMovie, updateMovieManual } from "../../service/admin"
import { useNavigate } from "react-router-dom"

const AdminMovieCon = () => {
    const [list, setList] = useState([])
    const [editMovie, setEditMovie] = useState(null) // 수정 중인 영화 정보
    const [newMovie, setNewMovie] = useState({
        movieId: "",
        title: "",
        entitle: "",
        posterUrl: "",
        stillUrl: "",
        movieSynopsis: "",
        directorName: "",
        actors: "",
        movieRank: "",
        openDt: "",
    })
    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getSearchList("")
                setList(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getData()
    }, [])

    // 입력값 변경 시 상태 업데이트 (텍스트만)
    const InputChange = (e, movieId) => {
        const { name, value } = e.target
        setList((prevList) =>
            prevList.map((movie) =>
                movie.movieId === movieId ? { ...movie, [name]: value } : movie
            )
        )
    }

    // 수동 영화 입력 내용
    const handleChange = (e) => {
        const { name, value } = e.target
        setNewMovie((prev) => ({ ...prev, [name]: value, }))
    }

    // 수동 영화 입력 결과 전송
    const manualinsert = async (e) => {
        e.preventDefault()
        console.log("입력값 확인 : ", newMovie)
        try {
            const response = await insert(newMovie)
            alert(response.message)
            const updatedData = await getSearchList("")
            setList(updatedData)
            setNewMovie({
                movieId: "",
                title: "",
                entitle: "",
                posterUrl: "",
                stillUrl: "",
                movieSynopsis: "",
                directorName: "",
                actors: "",
                movieRank: "",
                openDt: "",
            })
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message)
            } else {
                alert("영화 추가 중 오류 발생")
            }
        }

        hide()
    }

    // 수정 버튼 클릭 시 해당 영화 상태에 저장
    const EditClick = (movieId) => {
        const movieToEdit = list.find((movie) => movie.movieId === movieId)
        setEditMovie(movieToEdit)
    }

    // 수정 완료 버튼 클릭 시 백엔드로 텍스트 데이터 전송
    const Update = async (movieId) => {
        try {
            const movieToUpdate = list.find((movie) => movie.movieId === movieId)
            const response = await updateMovie(movieToUpdate) // 수정 요청 전송
            alert(response.message)
            setEditMovie(null) // 수정 모드 종료
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message)
            } else {
                alert("영화 수정 중 오류 발생")
            }
        }
    }

    // 수동으로 영화 업데이트 (영화 목록 없을 시 사용)
    const manualUpdate = async () => {
        try {
            alert("데이터 요청")
            await updateMovieManual() // 데이터 업데이트 요청
            alert("데이터 불러오기 완료")
            const updatedData = await getSearchList("") // 업데이트된 데이터 다시 가져오기
            setList(updatedData) // 상태 업데이트
            navigate("/adminMovie") // 데이터 갱신 후 페이지 이동
        } catch (error) {
            console.error("업데이트 중 오류 발생:", error)
        }
    }

    const show = () => {
        const elements = document.getElementsByClassName("modal")
        if (elements.length > 0)
            elements[0].style.display = "block"
    }

    const hide = () => {
        const elements = document.getElementsByClassName("modal")
        if (elements.length > 0)
            elements[0].style.display = "none"
    }

    // 영화 삭제
    const delMovie = async (id) => {
        try {
            const response = await deleteMovie(id)
            alert(response.message)
            const updatedData = await getSearchList("")
            setList(updatedData)
            navigate("/adminMovie")
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message)
            } else {
                alert("영화 삭제 중 오류 발생")
            }
        }
    }

    return (
        <AdminMovieCom list={list} editMovie={editMovie} InputChange={InputChange} EditClick={EditClick} Update={Update}
            manualUpdate={manualUpdate} show={show} hide={hide} handleChange={handleChange} manualinsert={manualinsert} newMovie={newMovie} delMovie={delMovie} />
    )
}

export default AdminMovieCon