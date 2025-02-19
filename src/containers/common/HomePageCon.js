import { useEffect, useState } from "react";
import HomePageCom from "../../components/mainPage/HomePageCom";
import { getSearchList, translateText } from "../../service/review";

const HomePageCon = () => {
    const [list, setList] = useState([]);
    const [translatedTitles, setTranslatedTitles] = useState({}); // 🔹 번역된 제목들을 저장할 객체

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

    useEffect(() => {
        if (list.length > 0) {
            const translateAllTitles = async () => {
                const translations = {};
                for (const movie of list) {
                    try {
                        const translated = await translateText(movie.title);
                        translations[movie.movieId] = translated; // 🔹 movieId를 키로 저장
                    } catch (error) {
                        console.error(`번역 오류 (${movie.title}):`, error);
                        translations[movie.movieId] = movie.title; // 🔹 오류 발생 시 원본 제목 사용
                    }
                }
                setTranslatedTitles(translations);
            };
            translateAllTitles();
        }
    }, [list]);

    // movieId가 5 이하인 영화만 필터링 후 오름차순 정렬
    const Top5Movies = list
        .filter(movie => movie.movieId <= 5)
        .sort((a, b) => a.movieId - b.movieId)
        .slice(0, 5);

    const RestMovies = list
        .filter(movie => movie.movieId >= 6)
        .sort((a, b) => a.movieId - b.movieId);

    return (
        <>
            <HomePageCom TopMovies={Top5Movies} RestMovies={RestMovies} translatedTitles={translatedTitles} />
        </>
    );
};

export default HomePageCon;