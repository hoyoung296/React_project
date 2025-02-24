import { useEffect, useState } from "react";
import AdminMovieCom from "../../components/Admin/AdminMovieCom"
import { getSearchList } from "../../service/review"
import { updateMovie } from "../../service/admin"

const AdminMovieCon = () => {
     const [list, setList] = useState([]);
     const [editMovie, setEditMovie] = useState(null); //수정 중 영화 정보

     useEffect(() => {
        const getData = async () => {
            try {
                const data = await getSearchList("")
                setList(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getData()
    }, [])

    //입력값 변경시 상태 업데이트
    const InputChange = (e, movieId) => {
        const { name, value } = e.target;
        setList((prevList) => prevList.map((movie) => movie.movieId === movieId ? { ...movie, [name]: value} : movie)
    );
    };

    //수정 버튼 클릭 시 해당 영화 상태에 저장
    const EditClick = (movieId) => {
        const movieToEdit = list.find((movie) => movie.movieId === movieId);
        setEditMovie(movieToEdit);
    };

    //수정 완료 버튼 클릭 시 백엔드로 데이터 전송
    const Update = async(movieId) => {
        try {
            const movieToUpdate = list.find((movie) => movie.movieId === movieId);
            await updateMovie(movieToUpdate); //수정 요청 전송
            alert("영화 정보 수정 성공");
            setEditMovie(null); // 수정 모드 종료
        } catch (error) {
            console.error("영화 정보 수정 오류", error);
            alert("수정 실패");
        }
    }


    return<>
        <AdminMovieCom 
        list={list}
        editMovie = {editMovie}
        InputChange = {InputChange}
        EditClick = {EditClick}
        Update = {Update}
         />
    </>
}

export default AdminMovieCon;