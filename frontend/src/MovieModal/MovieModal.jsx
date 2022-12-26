 
import {React, useRef, useState} from 'react'
import Modal from 'react-modal';


export default function MovieModal(props) {
  const director = useRef() , cast = useRef(), year = useRef(), rating = useRef()
  const [movieInfo, getMovieInfo] = useState(props.movieInfo)
   

  
  const updateMovie = async () => {

    const updatedInfo = {
      director: director.current.value.split(', '),
      cast: cast.current.value.split(', '),
      year: year.current.value,
      rating: rating.current.value
    }

    const updatedMovieInfo = await fetch(`http://localhost:4001/movies/${movieInfo._id}`, {
      method: 'PUT',
       
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(updatedInfo) })
      .then(response => response.json())

    getMovieInfo(updatedMovieInfo);

    props.closeModal(); // close the modal

    // fetch the updated movie to the main page and notification that update successfully

  }

  

  return (
    <Modal 
    isOpen={props.isModalOpen} 
    onRequestClose={props.closeModal}
    shouldCloseOnOverlayClick={true}
    >
        <h2>{movieInfo.title}</h2>
       
        <img alt='poster' src={movieInfo.poster}></img>
        <br></br>
        <input ref={director} type='text' className='update-inputs' defaultValue={movieInfo.director}></input>
        <input ref={cast} type='text' className='update-inputs' defaultValue={movieInfo.cast? movieInfo.cast.join(', '): "tba"}></input>
        <input ref={year} type='text'  className='update-inputs' defaultValue={movieInfo.year}></input>
        <input ref={rating} type='text'  className='update-inputs' defaultValue={movieInfo.rating? movieInfo.rating: 'tba'}></input>

        <br></br>

        <button className='buttonGroup' id='update' onClick= {updateMovie}>Update</button>
    </Modal>
  )
}
