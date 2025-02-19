import React, { useState } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import '../../css/main.css';

const MovieList = ({ list }) => {
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

    return (
        <div className='moviePosterList'>
            <div className='movieList'>
                {list.map((movie, index) => (
                    <div className="poster" key={index}>
                        <img src={`${movie.posterUrl}`} alt={`Movie Poster ${movie.movieId}`} />
                        <div className="overlay">
                            <button onClick={() => openModal('detail', movie.title)}>상세보기</button>
                            <button onClick={() => navigate(`/ticket_date?title=${encodeURIComponent(movie.title)}`)}>
                                예매하기
                            </button>
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
    );
}

export default MovieList;