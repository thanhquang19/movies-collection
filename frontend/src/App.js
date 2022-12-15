
import './App.css';
import UserInputForm from './Form/UserInputForm';
import DisplayPanel from './Display/DisplayPanel';
import { useState } from 'react';
 
 


function App() {
  const [moviesToDislay, getMoviesToDisplay] = useState([]);

    const findMovies = async (title, director, cast, year, rating, poster) => {
        const criteria = {
            text: 'text'
        }
        
        const movies = await fetch(`http://localhost:4001/movies?${JSON.stringify(criteria)}`, {
            method: 'GET',
             
            headers: {
              'Content-Type':'application/json'
            },
          
        }).then(response => response.json())
        console.log(movies)
        getMoviesToDisplay(movies);
    }

    const addNewMovie = async (title, director, cast, year, rating, poster) => {
     

      const newMovie = {
        title: title,
        director: director,
        cast: cast,
        year: year,
        rating: rating, 
        poster: poster
      }

      const addedMovie = await fetch (`http://localhost:4001/movies`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(newMovie)
      }).then(response => response.json())
      
      getMoviesToDisplay(addedMovie);

    }

 
  return (
    <div>
      <UserInputForm findMovies = {findMovies} addNewMovie = {addNewMovie}/>
      <DisplayPanel movies = {moviesToDislay}/>
    </div>
  )
}

export default App;
