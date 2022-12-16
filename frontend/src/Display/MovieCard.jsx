import {React, useState} from 'react'
import Modal from 'react-modal';
import MovieModal from '../MovieModal/MovieModal';


Modal.setAppElement('#root');

export default function MovieCard(props) {
    const movieInfo = props.movieInfo;
    const [isModalOpen, getIsModalOpen] = useState(false);
    
    const openMovieModal = ()=> {
      getIsModalOpen(true);
    }

    const closeModal = ()=> {
      getIsModalOpen(false);
    }

  return (
    <>
      <div id = 'movie-card' onClick={openMovieModal}>
        <img id='poster' src={movieInfo.poster}alt='poster' img/>
        <h3 id='title'>{movieInfo.title}</h3>
        <p id='director'>{movieInfo.director}</p>
        <p id='cast'>{movieInfo.cast? movieInfo.cast.join(', '): "tba"}</p>
        <p id='year'>{movieInfo.year}</p>
        <p id='rating'>{movieInfo.rating? movieInfo.rating: 'tba'}</p>
        
      </div>
      <MovieModal isModalOpen={isModalOpen} movieInfo={movieInfo} closeModal={closeModal}/>
    </>
    
  )
}
