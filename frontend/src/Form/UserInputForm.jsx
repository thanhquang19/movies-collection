import React, { useRef } from 'react'


 

export default function UserInputForm(props) {
  const title = useRef();
  const director = useRef();
  const cast = useRef();
  const year = useRef();
  const rating = useRef();
  const poster = useRef();

  const handleFind = (e) => {
    e.preventDefault();
    props.findMovies(
      title.current.value,
      director.current.value,
      cast.current.value,
      year.current.value,
      rating.current.value
    );
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    

    props.addNewMovie(
      title.current.value,
      director.current.value.split(', '),
      cast.current.value.split(', '),
      year.current.value,
      rating.current.value,
      poster.current.value
    )
  };
    
  return (
    
        <form className='inputForm' id='inputForm'>
            <h1> Input Form</h1>
            <label for='input-title'>Title</label>
            <input ref= {title}type='text' className='inputField' id='input-title'></input>   
            <br/> 

            <label for='input-director'>Director</label>
            <input ref={director} type='text' className='inputField' id='input-director'></input>   
            <br/> 

            <label for='input-cast'>Cast</label>
            <input ref={cast} type='text' className='inputField' id='input-cast'></input>   
            <br/> 

            <label for='input-year'>Release Year</label>
            <input ref={year} type='text' className='inputField' id='input-year'></input>   
            <br/> 

            <label for='input-rating'>Rating</label>
            <input  ref={rating} type='text' className='inputField' id='input-rating'></input>   
            <br/> 

            <label for='input-poster'>Poster</label>
            <input ref={poster} type='text' className='inputField' id='input-poster'></input>   
           
            <br/> 

            <button className='buttonGroup' id='find' onClick={handleFind}>Find Movies</button>
            <button className='buttonGroup' id='add-new' onClick= {handleAddNew}>Add New Movie</button>
            
        </form>
   
  )
}
