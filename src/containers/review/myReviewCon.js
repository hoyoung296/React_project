import { useSearchParams } from "react-router-dom";
import MyReviewCom from "../../components/review/myReviewCom";
import { useEffect, useState } from "react";
import { getReviewList } from "../../service/review";

const MyReviewCon = () => {
    const [params] = useSearchParams()
    const [list, setList] = useState({ dto: [], page: 0 })
    const [start, setStart] = useState(Number(params.get("start") || 1));  // start는 현재 페이지로 설정
    const id = params.get("id")

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getReviewList(id, start);
                setList(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error);
            }
        };
        getData();
    }, [params, start])

    const handlePageChange = (page) => {
        setStart((prev) => {
            if (prev === page) {
                return prev // 상태가 바뀌지 않으면 리렌더링이 발생하지 않음
            }
            return page
        })
    }

    return (
        <>
            <MyReviewCom list={list} start={start} handlePageChange={handlePageChange} />
        </>
    );
};

export default MyReviewCon;