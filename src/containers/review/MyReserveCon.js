import { useNavigate, useSearchParams } from "react-router-dom"
import MyReserveCom from "../../components/review/MyReserveCom"
import { useEffect, useState } from "react"
import { getReserveList } from "../../service/review"

const MyReserveCon = () => {
    const [params] = useSearchParams()
    const [list, setList] = useState({ dto: [], page: 0 })
    const [start, setStart] = useState(params.get("start") || 1)
    const id = params.get("id")

    const navigate = useNavigate()

    useEffect(()=>{
        const getData = async() => {
            try {
                const data = await getReserveList(id,start)
                setList(data)
            } catch (error) {
                console.error("데이터 가져오기 오류 :" , error)
            }
        }
        getData()
    },[id,start])

    const handlePageChange = (page) => {
        setStart(page)
        navigate(`/myTicket?id=${id}&start=${page}`)
    }

    return <>
        <MyReserveCom list={list} start={start} handlePageChange={handlePageChange} />
    </>
}

export default MyReserveCon