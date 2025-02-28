import AdminScheduleCom from "../../components/Admin/AdminScheduleCom"
import { delSchedule, getSchedule, getScreen, updateSchedule } from "../../service/admin"
import { useEffect, useState } from "react"
import { getSearchList } from "../../service/review"

const AdminScheduleCon = () => {
    const [movie, setMovie] = useState([])
    const [list, setList] = useState([])
    const [screen, setScreen] = useState([])
    const [selectedMovieId, setSelectedMovieId] = useState("")
    const [input, setInput] = useState({ movieId: "", startDateTime: "", endDateTime: "", screenId: "" })
    const [selectedOption, setSelectedOption] = useState("일정 추가")
    const [selectedTimes, setSelectedTimes] = useState([])
    const [timeOptions, setTimeOptions] = useState([]) // 상영관별 시간 옵션
    const screenTimeOptions = {
        "1": ["09:00", "11:00", "13:00", "15:00", "17:00"],
        "2": ["10:30", "12:30", "14:30", "16:30", "18:30"],
        "3": ["09:15", "11:45", "14:15", "16:45", "19:15"]
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movies = await getSearchList("")
                console.log("영화 목록:", movies)
                setMovie(movies)
                setList(await getSchedule(""))
                setScreen(await getScreen(""))
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        setInput((prev) => ({ ...prev, movieId: selectedMovieId || "" }))
    }, [selectedMovieId])

    const show = (movieId) => {
        setSelectedMovieId(movieId)
        const elements = document.getElementsByClassName("modal")
        if (elements.length > 0)
            elements[0].style.display = "block"
    }

    const hide = () => {
        const elements = document.getElementsByClassName("modal")
        if (elements.length > 0)
            elements[0].style.display = "none"
    }

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value)
    }

    const onChange = (e) => {
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleTimeChange = (e) => {
        const { value, checked } = e.target
        setSelectedTimes((prev) => (checked ? [...prev, value] : prev.filter((time) => time !== value)))
    }

    const handleScreenChange = (e) => {
        const selectedScreenId = e.target.value
        setInput((prev) => ({ ...prev, screenId: selectedScreenId }))
        setTimeOptions(screenTimeOptions[selectedScreenId] || []) // 해당 상영관 시간 배열 설정
    }

    const toKSTISOString = (date) => {
        const kstOffset = 9 * 60 * 60 * 1000 // UTC+9 시간차
        return new Date(date.getTime() + kstOffset).toISOString().replace("Z", "") // Z 제거 (UTC 표기 방지)
    }

    const mySubmit = async (e) => {
        e.preventDefault()
        const { movieId, screenId, startDate, endDate } = input
        const start = new Date(startDate)
        const end = new Date(endDate)
        const dtos = []
        const selectedMovie = movie.find((m) => String(m.movieId) === String(movieId))
        const runningTime = selectedMovie ? parseInt(selectedMovie.runtime, 10) : 120
        while (start <= end) {
            const currentDate = start.toISOString().split("T")[0]; // yyyy-mm-dd 형식
            selectedTimes.forEach((time) => {
                const startDateTime = toKSTISOString(new Date(`${currentDate}T${time}:00`))
                const endDateTime = toKSTISOString(new Date(new Date(startDateTime).getTime() + runningTime * 60 * 1000))

                dtos.push({ movieId, screenId, startDateTime, endDateTime })
            })
            start.setDate(start.getDate() + 1)
        }
        console.log(dtos);
        const response = await updateSchedule(dtos) // 배열 전송
        alert(response.message)
        const updatedData = await getSchedule("")
        setList(updatedData)
        hide()
    }

    const delSubmit = async (e) => {
        e.preventDefault()
        const reponse = await delSchedule(input.scheduleId)
        alert(reponse.message)
        const updatedData = await getSchedule("")
        setList(updatedData)
        hide()
    }

    return <>
        <AdminScheduleCom list={list} show={show} hide={hide} screen={screen} selectedMovieId={selectedMovieId} selectedOption={selectedOption} handleSelectChange={handleSelectChange}
            onChange={onChange} mySubmit={mySubmit} delSubmit={delSubmit} input={input} handleTimeChange={handleTimeChange} selectedTimes={selectedTimes} 
            timeOptions={timeOptions} handleScreenChange={handleScreenChange} />
    </>
}

export default AdminScheduleCon