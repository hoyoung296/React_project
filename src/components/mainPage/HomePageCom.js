import React from 'react';
import EmblaCarousel from "../../components/mainPage/EmblaCarousel";
import MovieList from "../../components/mainPage/MovieList";

const HomePageCom = ({ TopMovies, RestMovies, translatedTitles }) => {
    return (
        <>
            <EmblaCarousel list={TopMovies} translatedTitles={translatedTitles} />
            <MovieList list={RestMovies} />
        </>
    );
};

export default HomePageCom;