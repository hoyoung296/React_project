import React from 'react';
import '../css/main.css';
import EmblaCarouselComponent from '../components/mainPage/EmblaCarousel';
import MovieList from '../components/mainPage/MovieList';

function HomePage() {
    return (
    <div>
        <EmblaCarouselComponent />
        <MovieList />
    </div>
)
};


export default HomePage;