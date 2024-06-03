import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className='container-fluid movie-app'>
  <div className='row mt-5 mb-5'>
    <div className='col text-center'>
      <MovieListHeading heading='Discover Movies' />
      <div className='explore-container'> {/* Added explore-container */}
        <p className='mt-3 explore-now'>Explore Now !</p>
      </div>
    </div>
    <div className='col-auto ml-auto'>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
    </div>
  </div>
  <div className='row'>
    <MovieList
      movies={movies}
      handleFavouritesClick={addFavouriteMovie}
      favouriteComponent={AddFavourites}
    />
  </div>
  <div className='row d-flex align-items-center mt-5 mb-5'>
    <MovieListHeading heading='Favourites-List' />
  </div>
  <div className='row'>
    <MovieList
      movies={favourites}
      handleFavouritesClick={removeFavouriteMovie}
      favouriteComponent={RemoveFavourites}
    />
  </div>
</div>

	);
};

export default App;
