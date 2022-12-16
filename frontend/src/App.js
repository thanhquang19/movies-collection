
import './App.css';
import UserInputForm from './Form/UserInputForm';
import DisplayPanel from './Display/DisplayPanel';
import { useState } from 'react';
import Modal from 'react-modal';
import MovieModal from './MovieModal/MovieModal';

 
 
Modal.setAppElement('#root');

function App() {
    const [moviesToDislay, getMoviesToDisplay] = useState([]);
    // const [isModalOpen, getIsModalOpen] = useState(true);

    const findMovies = async (title, director, cast, year, rating, poster) => {
        const searchParam = new URLSearchParams();
        if(title) searchParam.append('title', title);
        if(director) searchParam.append('director', director);
        if(cast) searchParam.append('cast', cast);
        if(year) searchParam.append('year', year);
        if(rating) searchParam.append('rating', rating);
        
        console.log(searchParam.toString())
        const movies = await fetch(`http://localhost:4001/movies?${searchParam.toString()}`, {
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
