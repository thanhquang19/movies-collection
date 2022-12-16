 
import {React, useRef} from 'react'
import Modal from 'react-modal';


export default function MovieModal(props) {
  const director = useRef() , cast = useRef(), year = useRef(), rating = useRef()
  const movieInfo = props.movieInfo;

  const getNewMovieInfo = () =>{
    console.log(director.current.value);

  }
  return (
    <Modal 
    isOpen={props.isModalOpen} 
    onRequestClose={props.closeModal}
    shouldCloseOnOverlayClick={true}
    >
        <h2>{movieInfo.title}</h2>
        {movieInfo._id}
        <img alt='poster' src={movieInfo.poster}></img>
        <br></br>
        <input ref={director} type='text' defaultValue={movieInfo.director}></input>
        <input ref={cast} type='text' defaultValue={movieInfo.cast? movieInfo.cast.join(', '): "tba"}></input>
        <input ref={year} type='text' defaultValue={movieInfo.year}></input>
        <input ref={rating} type='text' id='rating' defaultValue={movieInfo.rating? movieInfo.rating: 'tba'}></input>

        <br></br>

        <button className='buttonGroup' id='update' onClick= {getNewMovieInfo}>Update</button>
    </Modal>
  )
}
