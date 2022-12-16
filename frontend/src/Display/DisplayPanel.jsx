import React from 'react'
import MovieCard from './MovieCard'
import Modal from 'react-modal';
import MovieModal from '../MovieModal/MovieModal';


Modal.setAppElement('#root');

export default function DisplayPanel(props) {

  const movies = props.movies; 

  return (
    movies.length > 0?  (
    <div id='display-panel'>
          <h1>Display Panel</h1>
        {
          movies.map(movie => <MovieCard movieInfo={movie}/>)
        }
        
        <MovieModal isModalOpen={true}/>
       
    </div>
    ) :    (
    <div id='display-panel'>
    <h1>Display Panel</h1>
    No Matches
    </div>  )
  )
}
