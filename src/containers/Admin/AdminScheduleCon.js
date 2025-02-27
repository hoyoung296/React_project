import AdminScheduleCom from "../../components/Admin/AdminScheduleCom"
import { delSchedule, getSchedule, getScreen, updateSchedule } from "../../service/admin";
import { useEffect, useState } from "react";

const AdminScheduleCon = () => {
    const [list, setList] = useState([])
    const [screen, setScreen] = useState([])
    const [selectedMovieId, setSelectedMovieId] = useState("");
    const [input, setInput] = useState({ movieId: "", startDateTime: "", endDateTime: "", screenId: "" })
    const [selectedOption, setSelectedOption] = useState("일정 추가") // 선택한 옵션 상태

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getSchedule("")
                setList(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getScreen("")
                setScreen(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        setInput((prev) => ({ ...prev, movieId: selectedMovieId }));
    }, [selectedMovieId])

    const isScheduleOverlapping = (newStart, newEnd, newScreenID) => {


        return list.some(schedule => {
            const existingStart = new Date(schedule.startDateTime)
            const existingEnd = new Date(schedule.endDateTime)
            const newStartTime = new Date(newStart)
            const newEndTime = new Date(newEnd)

            console.log(typeof schedule.screenId, schedule.screenId)
            console.log(typeof parseInt(newScreenID), parseInt(newScreenID))

            return (
                schedule.screenId === parseInt(newScreenID) && // 같은 스크린 ID일 때만 체크
                newStartTime < existingEnd &&
                newEndTime > existingStart
            )
        })
    }

    const show = (movieId) => {
        setSelectedMovieId(movieId); // 선택한 영화의 ID 저장
        console.log(movieId)
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
        // readOnly이지만 onChange 이벤트가 발생하도록 설정
        setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const mySubmit = async (e) => {
        e.preventDefault()

        const { movieId, startDateTime, endDateTime, screenId } = input

        if (isScheduleOverlapping(startDateTime, endDateTime, screenId)) {
            alert("선택한 상영관에서 해당 시간대에 이미 일정이 있습니다. 다른 시간을 선택해주세요.")
            return
        }

        const dto = { movieId, startDateTime, endDateTime, screenId }

        console.log("dto : ", dto)
        const response = await updateSchedule(dto)
        alert(response.message)
        // 일정 목록 갱신
        const updatedData = await getSchedule("");
        setList(updatedData);

        hide()
    }

    const delSubmit = async (e) => {
        e.preventDefault()
        console.log(input.movieId)
        console.log(input.scheduleId)
        const reponse = await delSchedule(input.scheduleId)
        alert(reponse.message)
        // 일정 목록 갱신
        const updatedData = await getSchedule("");
        setList(updatedData);

        hide()
    }

    return <>
        <AdminScheduleCom list={list} show={show} hide={hide} screen={screen} selectedMovieId={selectedMovieId} selectedOption={selectedOption} handleSelectChange={handleSelectChange}
            onChange={onChange} mySubmit={mySubmit} delSubmit={delSubmit} />
    </>
}

export default AdminScheduleCon