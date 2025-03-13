// src/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// 요청 인터셉터: Access Token 첨부
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

// 응답 인터셉터: 401 오류 발생 시 Refresh Token 이용하여 토큰 재발급
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken || refreshToken.trim() === "" || refreshToken === "null" || refreshToken === "undefined") {
          console.error("Refresh token이 없습니다.");
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          localStorage.removeItem("LoginSuccess");
          window.location.href = "/login";
          return Promise.reject(error);
        }
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/root/member/refresh`, {
            headers: { Authorization: `Bearer ${refreshToken}` },
          });
          console.log("Refresh 응답 데이터:", data);
          // 수정된 부분: jwtToken으로 확인 및 저장
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
          localStorage.removeItem("refreshToken");
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
