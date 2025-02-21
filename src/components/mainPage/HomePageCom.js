import React from 'react';
import EmblaCarousel from "../../components/mainPage/EmblaCarousel";
import MovieList from "../../components/mainPage/MovieList";

const HomePageCom = ({ TopMovies, RestMovies}) => {
    return (
        <>
            <EmblaCarousel list={TopMovies} />
            <MovieList list={RestMovies} />
        </>
    );
};

export default HomePageCom;