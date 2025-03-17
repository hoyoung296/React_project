// src/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // 쿠키 전송을 위해 설정
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("jwtToken");
    if (
      accessToken &&
      accessToken.trim() !== "" &&
      accessToken !== "null" &&
      accessToken !== "undefined"
    ) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // 쿠키에 담긴 refreshToken이 자동 전송됨
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/root/member/refresh`,
          { withCredentials: true }
        );
        console.log("Refresh 응답 데이터:", data);
        if (!data || !data.jwtToken) {
          throw new Error("새로운 access token이 반환되지 않았습니다.");
        }
        console.log("새로운 access token 발급:", data.jwtToken);
        localStorage.setItem("jwtToken", data.jwtToken);
        localStorage.setItem("LoginSuccess", "true");
        originalRequest.headers.Authorization = `Bearer ${data.jwtToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("토큰 재발급 실패:", refreshError);
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
        localStorage.removeItem("LoginSuccess");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
