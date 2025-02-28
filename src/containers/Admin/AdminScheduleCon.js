import AdminScheduleCom from "../../components/Admin/AdminScheduleCom"
import { delSchedule, getSchedule, getScreen, updateSchedule } from "../../service/admin"
import { useEffect, useState } from "react"
import { getSearchList } from "../../service/review"

const AdminScheduleCon = () => {
    const [movie, setMovie] = useState([])
    const [list, setList] = useState([])
    const [screen, setScreen] = useState([])
    const [input, setInput] = useState({
        movieId: "",
        startDate: "",
        endDate: "",
        screenId: ""
    })
    const [selectedTimes, setSelectedTimes] = useState([])
    const [timeOptions, setTimeOptions] = useState([])

    const screenTimeOptions = {
        "1": ["09:00", "11:00", "13:00", "15:00", "17:00"],
        "2": ["10:30", "12:30", "14:30", "16:30", "18:30"],
        "3": ["09:15", "11:45", "14:15", "16:45", "19:15"]
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setMovie(await getSearchList(""))
                setList(await getSchedule(""))
                setScreen(await getScreen(""))
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        fetchData()
    }, [])

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

    const onChange = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleTimeChange = (e) => {
        const { value, checked } = e.target
        setSelectedTimes(prev => checked ? [...prev, value] : prev.filter(time => time !== value))
    }
    const handleScreenChange = (e) => {
        const selectedScreenId = e.target.value;
        setInput(prev => ({ ...prev, screenId: selectedScreenId }))
        setTimeOptions(screenTimeOptions[selectedScreenId] || [])
    }

    const toKSTISOString = (date) => {

        if (!date || isNaN(date.getTime())) {
            console.error("잘못된 날짜 값:", date)
            return ""
        }

        const localDate = new Date(date.getTime())
        return `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, "0")}-${String(localDate.getDate()).padStart(2, "0")} ${String(localDate.getHours()).padStart(2, "0")}:${String(localDate.getMinutes()).padStart(2, "0")}:00`
    }

    const mySubmit = async (e) => {
        e.preventDefault()
        const { movieId, screenId, startDate, endDate } = input
        const start = new Date(startDate)
        const end = new Date(endDate)

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            alert("올바른 날짜를 입력하세요.")
            return
        }

        const dtos = []
        const selectedMovie = movie.find(m => String(m.movieId) === String(movieId))
        const runningTime = selectedMovie ? parseInt(selectedMovie.runtime, 10) : 120

        while (start <= end) {
            const currentDate = start.toISOString().split("T")[0]

            selectedTimes.forEach(time => {

                const startDateTime = toKSTISOString(new Date(`${currentDate}T${time}:00`))
                const endDateTime = toKSTISOString(new Date(new Date(startDateTime).getTime() + runningTime * 60 * 1000))
                dtos.push({ movieId, screenId, startDateTime, endDateTime })
            })

            start.setDate(start.getDate() + 1)
        }

        console.log("dtos 확인 : ", dtos)
        const response = await updateSchedule(dtos)
        alert(response.message)
        setList(await getSchedule(""))
        hide()
    }

    const delSubmit = async (id) => {
        const response = await delSchedule(id)
        alert(response.message)
        setList(await getSchedule(""))
        hide()
    }

    return (
        <AdminScheduleCom list={list} show={show} hide={hide} screen={screen} onChange={onChange} mySubmit={mySubmit} delSubmit={delSubmit} input={input} handleTimeChange={handleTimeChange}
            selectedTimes={selectedTimes} timeOptions={timeOptions} handleScreenChange={handleScreenChange} movie={movie} />
    )
}

export default AdminScheduleCon