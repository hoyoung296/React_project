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
                    <div className='main_movie_info'>
                        <div className='main_movie_title'>말할 수 없는 비밀</div>
                        <div className='main_movie_titleE'>Secret: Untold Melody</div>
                        <div className='main_movie_director'>감독 : 서유민</div>
                        <div className='main_movie_actors'>배우 : 도경수, 원진아, 신예은 외</div>
                    </div>
                    <img src='/img/movie1.jpg'/>
                </div>
                <div className="embla__slide">
                    <div className='main_movie_info'>
                        <div className='main_movie_title'>말할 수 없는 비밀</div>
                        <div className='main_movie_titleE'>Secret: Untold Melody</div>
                        <div className='main_movie_director'>감독 : 서유민</div>
                        <div className='main_movie_actors'>배우 : 도경수, 원진아, 신예은 외</div>
                    </div>
                    <img src='/img/movie2.jpg'/>
                </div>
                <div className="embla__slide">
                    <div className='main_movie_info'>
                        <div className='main_movie_title'>말할 수 없는 비밀</div>
                        <div className='main_movie_titleE'>Secret: Untold Melody</div>
                        <div className='main_movie_director'>감독 : 서유민</div>
                        <div className='main_movie_actors'>배우 : 도경수, 원진아, 신예은 외</div>
                    </div>
                    <img src='/img/movie3.jpg'/>
                </div>
                <div className="embla__slide">
                    <div className='main_movie_info'>
                        <div className='main_movie_title'>말할 수 없는 비밀</div>
                        <div className='main_movie_titleE'>Secret: Untold Melody</div>
                        <div className='main_movie_director'>감독 : 서유민</div>
                        <div className='main_movie_actors'>배우 : 도경수, 원진아, 신예은 외</div>
                    </div>
                    <img src='/img/movie4.jpg'/>
                </div>
                <div className="embla__slide">
                    <div className='main_movie_info'>
                        <div className='main_movie_title'>말할 수 없는 비밀</div>
                        <div className='main_movie_titleE'>Secret: Untold Melody</div>
                        <div className='main_movie_director'>감독 : 서유민</div>
                        <div className='main_movie_actors'>배우 : 도경수, 원진아, 신예은 외</div>
                    </div>
                    <img src='/img/movie5.jpg'/>
                </div>
            </div>
        </div>
    );
};

export default EmblaCarouselComponent;
