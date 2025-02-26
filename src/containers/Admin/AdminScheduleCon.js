import { useNavigate } from "react-router-dom";
import AdminScheduleCom from "../../components/Admin/AdminScheduleCom"
import { getSchedule, getScreen } from "../../service/admin";
import { useEffect, useState } from "react";

const AdminScheduleCon = () => {
    const [list, setList] = useState([])
    const [screen, setScreen] = useState([])
    const [selectedMovieId, setSelectedMovieId] = useState("");
    const [input, setInput] = useState({ movieId: "", startDateTime: "", endDateTime: "", screenId: "" })
    const [selectedOption, setSelectedOption] = useState("일정 추가") // 선택한 옵션 상태
    const navigate = useNavigate()

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
        console.log(input.movieId)
        console.log(input.startDateTime)
        console.log(input.endDateTime)
        console.log(input.screenId)

        const dto = {
            movieId: input.movieId,
            startDateTime: input.startDateTime,
            endDateTime: input.endDateTime,
            screenId: input.screenId
        }

        console.log("dto : ", dto)
        // const response = await updateSchedule(dto)
        // alert(response.message)
        navigate("/adminSchedule")
        hide()
    }

    const delSubmit = async (e) => {
        e.preventDefault()
        console.log(input.movieId)
        console.log(input.scheduleId)
        // const reponse = await delSchedule(input.scheduleId)
        // alert(reponse.message)
        navigate("/adminSchedule")
        hide()
    }

    return <>
        <AdminScheduleCom list={list} show={show} hide={hide} screen={screen} selectedMovieId={selectedMovieId} selectedOption={selectedOption} handleSelectChange={handleSelectChange}
            onChange={onChange} mySubmit={mySubmit} delSubmit={delSubmit} />
    </>
}

export default AdminScheduleCon