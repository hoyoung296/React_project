import { useEffect, useState } from "react"
import AdminPaymentCom from "../../components/Admin/AdminPaymentCom"
import { getPayment } from "../../service/admin"
import { delReserve } from "../../service/review"

const AdminPaymentCon = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getPayment()
                setList(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getData()
    }, [])

    const del = async (id) => {
        try {
            const response = await delReserve(id)
            alert(response.message)
            window.location.reload();
        } catch (error) {
            alert("오류 발생: " + (error.response?.data?.message || "알 수 없는 오류"))
        }
    }

    return <>
        <AdminPaymentCom list={list} del={del} />
    </>
}

export default AdminPaymentCon