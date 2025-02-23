import { useEffect, useState } from "react";
import AdminMovieCom from "../../components/Admin/AdminMovieCom"
import { getSearchList } from "../../service/review";

const AdminMovieCon = () => {
     const [list, setList] = useState([]);

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

    return<>
        <AdminMovieCom list={list} />
    </>
}

export default AdminMovieCon