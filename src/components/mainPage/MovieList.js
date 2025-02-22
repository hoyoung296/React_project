import Modal from './Modal'
import { useNavigate } from 'react-router-dom'
import '../../css/main.css'

const MovieList = ({ list, Infolist, infoId, showInfo, hideInfo, onClick, relatedList, isModalOpen, modalType }) => {
    const navigate = useNavigate()
    // 나호영 주석 처리
    // const [modalOpen, setModalOpen] = useState(false);
    // const [modalType, setModalType] = useState('');

    // const openModal = (type, title = '') => {
    //     console.log('모달 열기', type, title);
    //     setSelectedMovie(title);
    //     setModalType(type);
    //     setModalOpen(true);
    // };

    return (
        <div className='moviePosterList'>
            <div className='movieList'>
                {list.map((movie, index) => (
                    <div className="poster" key={index}>
                        <img src={`${movie.posterUrl}`} alt={`Movie Poster ${movie.movieId}`} />
                        <div className="overlay">
                            <button onClick={() => showInfo(movie.movieId)}>상세보기</button>
                            <button onClick={() => navigate(`/ticket_date?title=${encodeURIComponent(movie.title)}`)}>
                                예매하기
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {infoId !== null && (
                <Modal isOpen={isModalOpen} onClose={hideInfo} type={modalType} infoData={Infolist[0]} onClick={onClick} relatedList={relatedList} Infolist={Infolist} />
            )}
        </div>
    );
}

export default MovieList;