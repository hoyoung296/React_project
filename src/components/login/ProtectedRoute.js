import { Navigate } from "react-router-dom";
import { useEffect } from 'react';

const ProtectedRoute = ({ element }) => {
    const isLoggedIn = localStorage.getItem("LoginSuccess") === "true"; // 로그인 상태 확인

    useEffect(() => {
        if (!isLoggedIn) {
            alert("로그인이 필요한 페이지입니다.");
        }
    }, [isLoggedIn]);

    return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
