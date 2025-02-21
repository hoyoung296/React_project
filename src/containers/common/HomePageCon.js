import { useEffect, useState } from "react";
import HomePageCom from "../../components/mainPage/HomePageCom";
import { getSearchList} from "../../service/review";

const HomePageCon = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getSearchList("");
                setList(data);
            } catch (error) {
                console.error("데이터 가져오기 오류:", error);
            }
        };
        getData();
    }, []);

    // rank를 기준으로 필터링 및 날짜와 순위를 분리하여 처리
    const today = new Date()
    const TopMovies = list
        .map(movie => {
            const [date, rank] = movie.movieRank.split("-") // 날짜-순위 분리 
            const movieDate = new Date(date)
            return {
                ...movie,
                movieDate,
                movieRank: parseInt(rank),
            };
        })
        .filter(movie => movie.movieRank <= 5) // 순위 5 이하인 영화들만 필터링
        .sort((a, b) => {
            const diffA = Math.abs(today - a.movieDate)
            const diffB = Math.abs(today - b.movieDate)
            return diffA - diffB; // 날짜가 오늘에 가장 가까운 영화부터 정렬
        })
        .slice(0, 5) // 상위 5개의 영화만 선택

    // Top5Movies를 제외한 나머지 영화들
    const RestMovies = list
        .filter(movie => !TopMovies.includes(movie)) // Top5Movies를 제외
        .map(movie => {
            const [date, rank] = movie.movieRank.split("-") // 날짜-순위 분리
            const movieDate = new Date(date)
            return {
                ...movie,
                movieDate,
                movieRank: parseInt(rank),
            };
        })
        .sort((a, b) => {
            const diffA = Math.abs(today - a.movieDate)
            const diffB = Math.abs(today - b.movieDate)
            return diffA - diffB; // 날짜가 오늘에 가장 가까운 영화부터 정렬
        })

    return (
        <HomePageCom TopMovies={TopMovies} RestMovies={RestMovies} />
    )
}

export default HomePageCon;