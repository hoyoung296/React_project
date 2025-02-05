import React, { useEffect, useRef } from 'react';
import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import '../../css/main.css';

const EmblaCarouselComponent = () => {
    const emblaRef = useRef(null);

    useEffect(() => {
        const emblaNode = emblaRef.current;
        if (!emblaNode) return;
        const options = { loop: true };
        const plugins = [Autoplay({ delay: 6000, stopOnInteraction: false })];
        const emblaApi = EmblaCarousel(emblaNode, options, plugins);

        return () => emblaApi.destroy();
    }, []);

    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                <div className="embla__slide">
                <div className='linear_gradient'/>
                    <div className='main_movie_info'>
                        <div className='main_movie_title'>말할 수 없는 비밀</div>
                        <div className='main_movie_titleE'>Secret: Untold Melody</div>
                        <div className='main_movie_director'>감독 : 서유민</div>
                        <div className='main_movie_actors'>배우 : 도경수, 원진아, 신예은 외</div>
                    </div>
                    <img src='/img/movie1.jpg'/>
                </div>
                <div className="embla__slide">
                <div className='linear_gradient'/>
                    <div className='main_movie_info'>
                        <div className='main_movie_title'>하얼빈</div>
                        <div className='main_movie_titleE'>HARBIN</div>
                        <div className='main_movie_director'>감독 : 우민호</div>
                        <div className='main_movie_actors'>배우 : 현빈, 박정민, 조우진, 전여빈 외</div>
                    </div>
                    <img src='/img/movie2.jpg'/>
                </div>
                <div className="embla__slide">
                <div className='linear_gradient'/>
                    <div className='main_movie_info'>
                        <div className='main_movie_title'>위키드</div>
                        <div className='main_movie_titleE'>Wicked</div>
                        <div className='main_movie_director'>감독 : 존 추</div>
                        <div className='main_movie_actors'>배우 : 신시아 에리보, 아리아나 그란데 외</div>
                    </div>
                    <img src='/img/movie3.jpg'/>
                </div>
                <div className="embla__slide">
                <div className='linear_gradient'/>
                    <div className='main_movie_info'>
                        <div className='main_movie_title'>더 폴: 디렉터스 컷</div>
                        <div className='main_movie_titleE'>The Fall</div>
                        <div className='main_movie_director'>감독 : 타셈 싱</div>
                        <div className='main_movie_actors'>배우 : 리 페이스, 카틴카 언타루 외</div>
                    </div>
                    <img src='/img/movie4.jpg'/>
                </div>
                <div className="embla__slide">
                <div className='linear_gradient'/>
                    <div className='main_movie_info'>
                        <div className='main_movie_title'>서브스턴스</div>
                        <div className='main_movie_titleE'>THE SUBSTANCE</div>
                        <div className='main_movie_director'>감독 : 코랄리 파르쟈</div>
                        <div className='main_movie_actors'>배우 : 데미 무어, 마가렛 퀄리, 데니스 퀘이드 외</div>
                    </div>
                    <img src='/img/movie5.jpg'/>
                </div>
            </div>
        </div>
    );
};

export default EmblaCarouselComponent;
