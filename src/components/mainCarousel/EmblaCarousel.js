import React, { useEffect } from 'react';
import EmblaCarousel from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import '../../css/main.css';

const EmblaCarouselComponent = () => {
    useEffect(() => {
        const emblaNode = document.querySelector('.embla');
        const options = { loop: false };
        const plugins = [Autoplay()];
        const emblaApi = EmblaCarousel(emblaNode, options, plugins);

        return () => {
            emblaApi.destroy();
        };
    }, []);

    return (
        <div className="embla">
            <div className="embla__container">
                <div className="embla__slide">포스터1</div>
                <div className="embla__slide">포스터2</div>
                <div className="embla__slide">포스터3</div>
                <div className="embla__slide">포스터4</div>
                <div className="embla__slide">포스터5</div>
            </div>
        </div>
    );
};

export default EmblaCarouselComponent;
