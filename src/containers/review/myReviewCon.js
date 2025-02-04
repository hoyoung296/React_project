import { useSearchParams } from "react-router-dom";
import MyReviewCom from "../../components/review/myReviewCom";
import { useEffect, useState } from "react";
import { getReviewList } from "../../service/review";

const MyReviewCon = () => {
    const [params] = useSearchParams();
    const [list, setList] = useState({ dto: [], page: 0 });

    // params.get("id")와 params.get("start")를 변수로 추출
    const id = params.get("id");
    const start = params.get("start");

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getReviewList(id, start);
                setList(data);
            } catch (error) {
                console.error("데이터 가져오기 오류:", error);
            }
        };
        getData();
    }, [id, start]); // 의존성 배열에 id와 start 추가

    return (
        <>
            <MyReviewCom list={list} />
        </>
    );
};

export default MyReviewCon;
