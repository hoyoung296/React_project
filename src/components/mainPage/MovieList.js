import React, { useEffect, useRef, useState } from 'react';
import '../../css/main.css';

const posters = [
    { imgSrc: '/img/poster/poster1.jpg' },
    { imgSrc: '/img/poster/poster2.jpg' },
    { imgSrc: '/img/poster/poster3.jpg' },
    { imgSrc: '/img/poster/poster4.jpg' },
    { imgSrc: '/img/poster/poster5.jpg' },
    { imgSrc: '/img/poster/poster6.jpg' },
    { imgSrc: '/img/poster/poster7.jpg' },
    { imgSrc: '/img/poster/poster8.jpg' },
    { imgSrc: '/img/poster/poster9.jpg' },
    { imgSrc: '/img/poster/poster10.jpg' },
    { imgSrc: '/img/poster/poster11.jpg' },
    { imgSrc: '/img/poster/poster12.jpg' },
    { imgSrc: '/img/poster/poster13.jpg' },
    { imgSrc: '/img/poster/poster14.jpg' },
    { imgSrc: '/img/poster/poster12.jpg' },
    { imgSrc: '/img/poster/poster13.jpg' },
    { imgSrc: '/img/poster/poster14.jpg' },
    { imgSrc: '/img/poster/poster1.jpg' },
    { imgSrc: '/img/poster/poster6.jpg' },
    { imgSrc: '/img/poster/poster7.jpg' },
    { imgSrc: '/img/poster/poster8.jpg' },
    { imgSrc: '/img/poster/poster9.jpg' },
    { imgSrc: '/img/poster/poster2.jpg' },
    { imgSrc: '/img/poster/poster3.jpg' },
    { imgSrc: '/img/poster/poster10.jpg' },
    { imgSrc: '/img/poster/poster11.jpg' },
    { imgSrc: '/img/poster/poster4.jpg' },
    { imgSrc: '/img/poster/poster5.jpg' },
];

const MovieList = () => {
/*
    const [posters, setPosters] = useState([]);

    useEffect(() => {
        const fetchPosters = async () => {
            try {
                const response = await fetch('/api/posters');
                const data = await response.json();
                setPosters(data);
            } catch (error) {
                console.error('데이터를 불러오는 데 실패했습니다:', error);
            }
        };

        fetchPosters();
    }, []);
*/
    return(
        <div className='movieList'>
            {posters.map((poster, index) => (
                <div className="poster" key={index}>
                    <img src={poster.imgSrc} alt={`Movie Poster ${index}`} />
                    <div className="overlay">
                        <button>상세보기</button>
                        <button>예매하기</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MovieList;