import React, { useEffect, useRef, useState } from 'react';
import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import '../../css/main.css';

const movies = [
    { title: '말할 수 없는 비밀', titleE: 'Secret: Untold Melody', director: '서유민', actors: '도경수, 원진아, 신예은 외', imgSrc: '/img/movie1.jpg'},
    { title: '하얼빈', titleE: 'HARBIN', director: '우민호', actors: '현빈, 박정민, 조우진, 전여빈 외', imgSrc: '/img/movie2.jpg'},
    { title: '위키드', titleE: 'Wicked', director: '존 추', actors: '신시아 에리보, 아리아나 그란데 외', imgSrc: '/img/movie3.jpg'},
    { title: '더 폴: 디렉터스 컷', titleE: 'The Fall', director: '타셈 싱', actors: '리 페이스, 카틴카 언타루 외', imgSrc: '/img/movie4.jpg'},
    {title: '서브스턴스', titleE: 'THE SUBSTANCE', director: '코랄리 파르쟈', actors: '데미 무어, 마가렛 퀄리, 데니스 퀘이드 외', imgSrc: '/img/movie5.jpg'}
];

const EmblaCarouselComponent = () => {
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
            <img src='/img/prev.png'/>
        </button>
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                {movies.map((movie, index) => (
                    <div className="embla__slide" key={index}>
                        <div className='linear_gradient'/>
                        <div className='main_movie_info'>
                            <div className='main_movie_title'>{movie.title}</div>
                            <div className='main_movie_titleE'>{movie.titleE}</div>
                            <div className='main_movie_director'>연출 : {movie.director}</div>
                            <div className='main_movie_actors'>배우 : {movie.actors}</div>
                            <div className='mainBtn'>
                            <button onClick={() => openModal('detail', movie.title)}>상세보기</button>
                                <a href='/ticket_date'><button>예매하기</button></a>
                            </div>
                        </div>
                        <img src={movie.imgSrc} alt={movie.title} />
                    </div>
                ))}
            </div>
        </div>
        <button className="carousel-btn next" onClick={scrollToNext}>
            <img src='/img/next.png'/>
        </button>

        <div className="carousel-indicator">
            {movies.map((_, index) => (
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
