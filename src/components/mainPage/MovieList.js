import React, { /*useEffect, useRef, */useState } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import '../../css/main.css';


const posters = [
    { imgSrc: '/img/poster/poster1.jpg', title: '영화제목1'  },
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
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedMovie, setSelectedMovie] = useState('');
    const openModal = (type, title = '') => {
        console.log('모달 열기', type, title);
        setSelectedMovie(title);
        setModalType(type);
        setModalOpen(true);
    };
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
        <div className='moviePosterList'>
        <div className='movieList'>
            {posters.map((poster, index) => (
                <div className="poster" key={index}>
                    <img src={poster.imgSrc} alt={`Movie Poster ${index}`} />
                    <div className="overlay">
                        <button onClick={() => openModal('detail', poster.title)}>상세보기</button>
                        <button onClick={() => navigate('/ticket_date')}>예매하기</button>
                    </div>
                </div>
            ))}
        </div>
        <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            type={modalType}
            content={selectedMovie}
        />
        </div>
    )
}

export default MovieList;