import { useEffect, useState } from "react"
import AdminMemberCom from "../../components/Admin/AdminMemberCom"
import { getList, updateUser } from "../../service/admin"

const AdminMemberCon = () => {
    const [list, setList] = useState([])
    const [editUser, setEditUser] = useState(null) // 수정 중인 유저 정보

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

    // 입력값 변경 시 상태 업데이트 (텍스트만)
    const InputChange = (e, userId) => {
        const { name, value } = e.target
        setList((prevList) =>
            prevList.map((user) =>
                user.userId === userId ? { ...user, [name]: value } : user
            )
        )
    }

    // 수정 버튼 클릭 시 해당 유저 상태에 저장
    const EditUser = (userId) => {
        const userToEdit = list.find((user) => user.userId === userId)
        setEditUser(userToEdit)
    }

    // 수정 완료 버튼 클릭 시 백엔드로 텍스트 데이터 전송
    const Update = async (userId) => {
        try {
            const userToUpdate = list.find((user) => user.userId === userId)
            const response = await updateUser(userToUpdate); // 수정 요청 전송
            alert(response.message)
            setEditUser(null) // 수정 모드 종료
        } catch (error) {
            console.error("유저 정보 수정 오류", error)
        }
    }

    const del = async (userId) => {
        
    }

    return <>
        <AdminMemberCom list={list} editUser={editUser} InputChange={InputChange} EditUser={EditUser} Update={Update} del={del} />
    </>
}

export default AdminMemberCon