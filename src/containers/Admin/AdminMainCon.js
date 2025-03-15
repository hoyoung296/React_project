import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AdminMainCom from "../../components/Admin/AdminMainCom"

const AdminMainCon = () => {
    const [input, setInput] = useState({ id: "", pwd: "" })
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem("admin") === "true"
    )
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(sessionStorage.getItem("admin") === "true")
        }

        // 로그인 상태 변경 감지
        window.addEventListener("storage", checkAuth)
        
        return () => {
            window.removeEventListener("storage", checkAuth)
        }
    }, [])

    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const mySubmit = (e) => {
        e.preventDefault()

        if (input.id !== "admin") {
            alert("아이디가 틀렸습니다.")
            return
        }

        if (input.pwd !== "1234") {
            alert("비밀번호가 틀렸습니다.")
            return
        }

        sessionStorage.setItem("admin", "true")
        setIsAuthenticated(true)
        alert("로그인 성공")
        navigate("/admin/movie")

        window.dispatchEvent(new Event("storage"))
    }

    const handleLogout = () => {
        sessionStorage.removeItem("admin")
        setIsAuthenticated(false)
        alert("로그아웃 되었습니다.")
        navigate("/admin/login")

        window.dispatchEvent(new Event("storage"))
    }

    return (
        <AdminMainCom onChange={onChange} mySubmit={mySubmit} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
    )
}

export default AdminMainCon