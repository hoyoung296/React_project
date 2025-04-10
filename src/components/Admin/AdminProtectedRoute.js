import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"

const AdminProtectedRoute = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem("admin") === "true"
    )

    useEffect(() => {
        const checkAuth = () => {
            const authStatus = sessionStorage.getItem("admin") === "true"
            setIsAuthenticated(authStatus)
        }

        checkAuth()
        
        window.addEventListener("storage", checkAuth)

        return () => {
            window.removeEventListener("storage", checkAuth)
        }
    }, [])

    if (!isAuthenticated) {
        alert("관리자 로그인이 필요합니다.")
        return <Navigate to="/admin/login" replace />
    }

    return element
}

export default AdminProtectedRoute