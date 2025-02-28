import { useState } from "react"
import AdminMainCom from "../../components/Admin/AdminMainCom"
import { useNavigate } from "react-router-dom"

const AdminMainCon = () => {
    const [input, setInput] = useState({ id: "", pwd: "" })
    const navigate = useNavigate()
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const mySubmit = (e) => {
        e.preventDefault()

        if(input.id!=="admin" && input.pwd!=="1234"){
            alert("존재하지 않는 아이디입니다.")
            return
        }
        
        else if(input.id!=="admin"){
            alert("아이디가 틀렸습니다.")
            return
        }
           
        else if(input.pwd!=="1234"){
            alert("비밀번호가 틀렸습니다.")
            return
        }
        
        navigate("/adminMovie")
    }

    return <>
        <AdminMainCom onChange={onChange} mySubmit={mySubmit} />
    </>
}

export default AdminMainCon