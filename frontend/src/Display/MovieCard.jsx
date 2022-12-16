import React from 'react'

export default function MovieCard(props) {
    const movieInfo = props.movieInfo;
  return (
    <div>
        <img id='poster' src={movieInfo.poster}alt='poster' img/>
        <h3 id='title'>{movieInfo.title}</h3>
        <p id='director'>{movieInfo.director}</p>
        <p id='cast'>{movieInfo.cast? movieInfo.cast.join(', '): "tba"}</p>
        <p id='year'>{movieInfo.year}</p>
        <p id='rating'>{movieInfo.rating? movieInfo.rating.$numberDecimal: 'tba'}</p>
    </div>
  )
}
