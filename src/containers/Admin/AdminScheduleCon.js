import AdminScheduleCom from "../../components/Admin/AdminScheduleCom"
import { delSchedule, getSchedule, getScreen, updateSchedule } from "../../service/admin"
import { useEffect, useState } from "react"
import { getSearchList } from "../../service/search"

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
    const screenTimeOptions = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00",  "15:00", "16:20", "16:30", "18:00", "21:00"]

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

    const show = () => document.querySelector(".modal").style.display = "block"
    const hide = () => document.querySelector(".modal").style.display = "none"

    const onChange = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleTimeChange = (e) => {
        const { value, checked } = e.target
        // 시간이 비활성화 상태이면 체크 해제되지 않도록 함
        if (!isTimeDisabled(value)) {
            if (checked) {
                setSelectedTimes(prev => [...prev, value])
            } else {
                setSelectedTimes(prev => prev.filter(time => time !== value))
            }
        }
    }

    const handleScreenChange = (e) => {
        const newScreenId = e.target.value
        setInput(prev => ({ ...prev, screenId: newScreenId }))
        setTimeOptions(screenTimeOptions)
    
        // 기존 선택된 시간 중에서 현재 선택된 상영관과 충돌하는 시간 제거
        setSelectedTimes(prevSelectedTimes =>
            prevSelectedTimes.filter(time => !isTimeDisabled(time, newScreenId))
        )
    }
    
    const isTimeDisabled = (time, screenId = input.screenId) => {
        if (!screenId || !input.startDate || !input.endDate) return true
    
        let isDisabled = false
        const start = new Date(input.startDate)
        const end = new Date(input.endDate)
    
        while (start <= end) {
            const selectedStartDateTime = new Date(`${start.toISOString().split("T")[0]}T${time}:00`)
    
            for (const schedule of list) {
                if (String(schedule.screenId) !== String(screenId)) continue
    
                const existingStart = new Date(schedule.startDateTime)
                const existingEnd = new Date(schedule.endDateTime)
    
                if (selectedStartDateTime >= existingStart && selectedStartDateTime < existingEnd) {
                    isDisabled = true
                    break
                }
            }
    
            start.setDate(start.getDate() + 1)
        }
        return isDisabled
    }

    const toKSTISOString = (date) => {
        const localDate = new Date(date.getTime())
        return `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, "0")}-${String(localDate.getDate()).padStart(2, "0")} ${String(localDate.getHours()).padStart(2, "0")}:${String(localDate.getMinutes()).padStart(2, "0")}:00`
    }

    const mySubmit = async (e) => {
        e.preventDefault()
        const { movieId, screenId, startDate, endDate } = input
        const start = new Date(startDate)
        const end = new Date(endDate)
        const dtos = []
        const runningTime = 5

        while (start <= end) {
            const currentDate = start.toISOString().split("T")[0]

            selectedTimes.forEach(time => {
                const startDateTime = toKSTISOString(new Date(`${currentDate}T${time}:00`))
                const endDateTime = toKSTISOString(new Date(new Date(startDateTime).getTime() + runningTime * 60 * 1000))
                dtos.push({ movieId, screenId, startDateTime, endDateTime })
            })
            start.setDate(start.getDate() + 1)
        }

        try {
            console.log(dtos)
            const response = await updateSchedule(dtos)
            alert(response.message)
            setList(await getSchedule(""))
            setSelectedTimes([])  // 선택된 시간 초기화
        } catch (error) {
            alert(error.response?.data?.message || "일정 추가 중 오류 발생")
        }
        hide()
    }

    const delSubmit = async (id) => {
        try {
            const response = await delSchedule(id)
            alert(response.message)
            setList(await getSchedule(""))
        } catch (error) {
            alert(error.response?.data?.message || "일정 삭제 중 오류 발생")
        }
        hide()
    }

    return (
        <AdminScheduleCom list={list} show={show} hide={hide} screen={screen} onChange={onChange} mySubmit={mySubmit} delSubmit={delSubmit}
            input={input} handleTimeChange={handleTimeChange} selectedTimes={selectedTimes} timeOptions={timeOptions} handleScreenChange={handleScreenChange} movie={movie} isTimeDisabled={isTimeDisabled} />
    )
}

export default AdminScheduleCon