import React from 'react'
import EmblaCarousel from "../../components/mainPage/EmblaCarousel"
import MovieList from "../../components/mainPage/MovieList"

const HomePageCom = ({ TopMovies, RestMovies, Infolist, infoId, showInfo, hideInfo, onClick, relatedList, isModalOpen, modalType}) => {
    return (
        <>
            <EmblaCarousel list={TopMovies} Infolist={Infolist} infoId={infoId} showInfo={showInfo} hideInfo={hideInfo} 
            onClick={onClick} relatedList={relatedList} isModalOpen={isModalOpen} modalType={modalType} />
            <MovieList list={RestMovies} Infolist={Infolist} infoId={infoId} showInfo={showInfo} hideInfo={hideInfo} 
            onClick={onClick} relatedList={relatedList} isModalOpen={isModalOpen} modalType={modalType} />
        </>
    )
}

export default HomePageCom