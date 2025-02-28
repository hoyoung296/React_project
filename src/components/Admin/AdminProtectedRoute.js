import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"

const AdminProtectedRoute = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem("isAuthenticated") === "true"
    )

    useEffect(() => {
        const checkAuth = () => {
            const authStatus = sessionStorage.getItem("isAuthenticated") === "true"
            setIsAuthenticated(authStatus)
        }

        checkAuth()

        // 로그인 상태 변경 감지
        window.addEventListener("storage", checkAuth)

        return () => {
            window.removeEventListener("storage", checkAuth)
        }
    }, [])

    if (!isAuthenticated) {
        alert("관리자 로그인이 필요합니다.")
        return <Navigate to="/adminMain" replace />
    }

    return element
}

export default AdminProtectedRoute