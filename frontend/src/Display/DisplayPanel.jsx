import React from 'react'
import MovieCard from './MovieCard'


export default function DisplayPanel(props) {

  const movies = props.movies; 

  return (
    movies.length > 0?  (
    <div id='display-panel'>
          <h1>Display Panel</h1>
        {
          movies.map(movie => <MovieCard movieInfo={movie}/>)
        }
      
       
    </div>
    ) :    (
    <div>
    <h1>Display Panel</h1>
    No Matches
    </div>  )
  )
}
