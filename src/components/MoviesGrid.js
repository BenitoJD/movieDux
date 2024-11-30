import React, {useState, useEffect} from 'react';
import '../styles.css';
import MovieCard from './MovieCard';

export default function MoviesGrid(){
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [genre, setGenre] = useState("All Genres");

    const [rating, setRating] = useState("All Ratings");


    useEffect(() => {
        fetch("movies.json")
        .then(Response => Response.json())
        .then(data=> setMovies(data))
    },[])
const handleSearchChange =(e)=>{
    setSearchTerm(e.target.value);
};
const handleGenreChange =(e)=>{
    setGenre(e.target.value);
};
const handleRatingChange =(e)=>{
    setRating(e.target.value);
};
const matchesGenre = (movie,genre) => {
    return genre === "All Genres" || movie.genre.toLowerCase() === genre.toLowerCase();
};
const matchesRating = (movie,rating) => {
switch(rating){
    case "All Ratings":
        return true;
    case "Good":
        return movie.rating >= 7;
    case "Average":
        return movie.rating >= 4 && movie.rating < 7;
    case "Bad":
        return movie.rating < 4;
    default:
        return true;
    };
}
const matchesSearch = (movie,searchTerm) => {   
    return searchTerm === "" || movie.title.toLowerCase().includes(searchTerm.toLocaleLowerCase());
};
const filteredMovies = movies.filter(movie => 
    matchesSearch(movie,searchTerm) &&
    matchesGenre(movie,genre) &&
    matchesRating(movie,rating)
);
    return(
    <div>
        <input 
        type='text' 
        className='search-input' 
        onChange={handleSearchChange} 
        placeholder='Search movies..' 
        value={searchTerm}>
        </input>
        <div className='filter-bar'>
        <div className='filter-slot'>
            <label>Genre:</label>
            <select className="filter-dropdown" value={genre} onChange={handleGenreChange}>
                <option value="All Genres">All Genres</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
            </select>

        </div>
        <div className='filter-slot'>
            <label>Rating:</label>
            <select className="filter-dropdown" value={rating} onChange={handleRatingChange}>
                <option value="All Ratings">All Ratings</option>
                <option>All</option>
                <option >Good</option>
                <option >Average</option>
                <option >Bad</option>
                
                
            </select>
        </div>

        </div>
    <div className='movies-grid'>
    {
        filteredMovies.map(movie => (
           <MovieCard movie={movie} key={movie.id}></MovieCard>
        ))
    }</div>
    </div>
    );
}