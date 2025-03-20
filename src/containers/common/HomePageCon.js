import { useEffect, useState } from "react"
import HomePageCom from "../../components/mainPage/HomePageCom"
import { allList, getInfoList } from "../../service/search"
import Axios from "axios";
import { useNavigate } from "react-router-dom"

const HomePageCon = () => {
    const navigate = useNavigate()
    const [list, setList] = useState([]);
    const [Infolist, setInfolist] = useState([])
    const [infoId, setInfoId] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await allList()

                // 상영일정이 있는 영화만 필터링
                const moviesWithShowtimes = await Promise.all(
                    data.map(async (movie) => {
                        const response = await Axios.get("http://localhost:8080/root/member/schedule/title", {
                            params: { title: movie.title }
                        });
                        return response.data.data.length > 0 ? movie : null; // 상영일정이 있는 경우만 반환
                    })
                );

                setList(moviesWithShowtimes.filter(Boolean)); // null 값 제거
            } catch (error) {
                console.error("데이터 가져오기 오류:", error);
            }
        };
        getData();
    }, []);


    useEffect(() => {
        const getData = async () => {
            try {
                const data = await allList()
                setList(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        if (!infoId) return
        const getInfo = async () => {
            try {
                const data = await getInfoList(infoId);
                setInfolist(data)
            } catch (error) {
                console.error("데이터 가져오기 오류:", error)
            }
        }
        getInfo()
    }, [infoId])

    const getRelatedMovies = (names) => {
        const cleanedNames = names
            .split(",")
            .map(name => name.trim())
            .filter(name => name.length > 0)

        return list.filter(movie => {
            const director = movie.director || ''
            const actors = movie.actors || ''
            return cleanedNames.some(name =>
                director.includes(name) || actors.includes(name)
            )
        })
    }

    const onClick = (id) => {
        navigate("/ticket/date?title=" + id)
    }

    const showInfo = (movieId) => {
        setInfoId(movieId)
        setModalType("detail")
        setIsModalOpen(true)
    }

    const hideInfo = () => {
        setIsModalOpen(false)
        setModalType(null)
    }

    const relatedList = Infolist.length > 0
        ? getRelatedMovies(Infolist[0].director + ',' + Infolist[0].actors)
        : []

    // rank를 기준으로 필터링 및 날짜와 순위를 분리하여 처리
    const today = new Date();
    const TopMovies = list
        .map(movie => {
            const [date, rank] = movie.movieRank.split("-"); // 날짜-순위 분리
            const movieDate = new Date(date);
            return {
                ...movie,
                movieDate,
                movieRank: parseInt(rank),
            };
        })
        .sort((a, b) => {
            const diffA = Math.abs(today - a.movieDate);
            const diffB = Math.abs(today - b.movieDate);
            return diffA - diffB || a.movieRank - b.movieRank; // 날짜가 같다면 순위 비교
        })
        .filter(movie => movie.movieRank <= 5) // 순위 5 이하 필터링
        .slice(0, 5); // 상위 5개 선택


    return (
        <HomePageCom TopMovies={TopMovies} list={list} Infolist={Infolist} infoId={infoId} showInfo={showInfo} hideInfo={hideInfo} onClick={onClick}
            relatedList={relatedList} isModalOpen={isModalOpen} modalType={modalType} />
    )
}

export default HomePageCon