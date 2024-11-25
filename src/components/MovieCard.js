import React from 'react';
import '../styles.css';

export default function MovieCard({movie}){
    const handleError = (e) => { e.target.src = "images/default.jpg";
    }
    return ( 
    <div key={movie.id} className='movie-card'>
        <img src={`images/${movie.image}`} alt={movie.title} onError = {handleError}/>
        <div className='movie-card-title'>
          <h3 className='mocie-card-genre'>{movie.title}</h3>
          <p className='movie-card-genre'>{movie.genre}</p>
          <p className='movie-card-rating'>{movie.rating}</p>  
        </div>
    </div>
    )
}