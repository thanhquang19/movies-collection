import React from 'react'
import MovieCard from './MovieCard'
import './DisplayPanel.css';


export default function DisplayPanel(props) {

  const movies = props.movies; 
  
  return (

   <>
    <h2>Search Results</h2>
    <div id='display-panel'>
          
          {
            movies.length > 0?
            movies.map(movie => <MovieCard movieInfo={movie}/>) :
            <p>No Movies Found</p>
          }        
    </div> 
   </> 
  
)
}