import React, {useState, useEffect} from 'react';
import '../styles.css';
import MovieCard from './MovieCard';

export default function MoviesGrid(){
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        fetch("movies.json")
        .then(Response => Response.json())
        .then(data=> setMovies(data))
    },[])
const handleSearchChange =(e)=>{
    setSearchTerm(e.target.value);
};
const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
);
    return(
    <div>
        <input type='text' className='search-input' onChange={handleSearchChange} placeholder='Search movies..' value={searchTerm}></input>
    <div className='movies-grid'>
    {
        filteredMovies.map(movie => (
           <MovieCard movie={movie} key={movie.id}></MovieCard>
        ))
    }</div>
    </div>
    );
}