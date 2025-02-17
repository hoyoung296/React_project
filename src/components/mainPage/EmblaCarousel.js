import React, { useEffect, useRef, useState } from 'react';
import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import Modal from './Modal';
import '../../css/main.css';

const EmblaCarouselComponent = ({ list, translatedTitles }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedMovie, setSelectedMovie] = useState('');

    const openModal = (type, title = '') => {
        console.log('모달 열기', type, title);
        setSelectedMovie(title);
        setModalType(type);
        setModalOpen(true);
    };

    const emblaRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const emblaApiRef = useRef(null);

    useEffect(() => {
        const emblaNode = emblaRef.current;
        if (!emblaNode) return;
        const options = { loop: true };
        const plugins = [Autoplay({ delay: 6000, stopOnInteraction: false })];
        const emblaApi = EmblaCarousel(emblaNode, options, plugins);
        emblaApiRef.current = emblaApi;

        const onSelect = () => {
            const newIndex = emblaApi.selectedScrollSnap();
            setSelectedIndex(newIndex);
        };

        emblaApi.on('select', onSelect);
        return () => emblaApi.destroy();
    }, []);

    const scrollToNext = () => {
        emblaApiRef.current.scrollNext();
    };

    const scrollToPrev = () => {
        emblaApiRef.current.scrollPrev();
    };

    return (
        <div className="embla-wrapper">
            <button className="carousel-btn prev" onClick={scrollToPrev}>
                <img src='/img/prev.png' alt='prev' />
            </button>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {list.map((movie, index) => (
                        <div className="embla__slide" key={index}>
                            <div className='linear_gradient' />
                            <div className='main_movie_info'>
                                <div className='main_movie_title'>{movie.title}</div>
                                <h2>{translatedTitles[movie.movieId] || "로딩 중 ..."}</h2><br />
                                <div className='main_movie_director'>연출 : {movie.directorName}</div>
                                <div className='main_movie_actors'>배우 : {movie.actors}</div>
                                <div className='mainBtn'>
                                    {/* movie.title을 movie.movieId로 수정 (나호영 작성) */}
                                    <button onClick={() => openModal('detail', movie.movieId)}>상세보기</button>
                                    <a href={`/ticket_date?title=${encodeURIComponent(movie.title)}`}>
                                        <button>예매하기</button>
                                    </a>
                                </div>
                            </div>
                            <img src={`/img/${movie.posterUrl}`} alt={movie.title} />
                        </div>
                    ))}
                </div>
            </div>
            <button className="carousel-btn next" onClick={scrollToNext}>
                <img src='/img/next.png' alt='next' />
            </button>

            <div className="carousel-indicator">
                {list.map((_, index) => (
                    <div
                        key={index}
                        className={`indicator-bar ${selectedIndex === index ? 'active' : ''}`}
                    />
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
};

export default EmblaCarouselComponent;