import React, { useState, useEffect } from 'react';
import '../../css/login.css';
import { allList } from '../../service/search';

function FindPwCom() {
    const [list, setList] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState(null);

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

    const stillUrls = TopMovies.length > 0 ? TopMovies.map(movie => movie.stillUrl) : [];

    useEffect(() => {
        if (stillUrls.length > 0 && !backgroundImage) {  // 배경이 없을 때만 랜덤 이미지를 설정
            const randomIndex = Math.floor(Math.random() * stillUrls.length);
                setBackgroundImage(stillUrls[randomIndex]);
        }
    }, [stillUrls, backgroundImage]);  // backgroundImage가 변경되지 않으면 다시 실행되지 않도록 조건 추가

    return (
        <div className='login_body'>
            <div className='sign'>
                <div className='title_movie'>THEFILLM</div>
                <div className='sign_from'>
                    비번찾기~~~
                </div>
                {backgroundImage && <img className='backgroundImg' src={backgroundImage} alt="background" />}
            </div>
        </div>
    );
};

export default FindPwCom;
