import { useEffect, useState } from "react"
import AdminPaymentCom from "../../components/Admin/AdminPaymentCom"
import { getPayment } from "../../service/admin"

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

    return<>
        <AdminPaymentCom list={list} />
    </>
}

export default AdminPaymentCon