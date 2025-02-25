import { useEffect, useState } from "react"
import AdminMemberCom from "../../components/Admin/AdminMemberCom"
import { getList, updateUser } from "../../service/admin"

const AdminMemberCon = () => {
    const [list, setList] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getList()
                setList(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getData()
    }, [])

    return <>
        <AdminMemberCom list={list} />
    </>
}

export default AdminMemberCon