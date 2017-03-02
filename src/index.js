import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*********************************************************************** 
Components are like JavaScript functions. They accept arbitrary inputs (called "props") 
and return React elements describing what should appear on the screen.
Components MUST return a single React element. Returning multiple 
elements require wrapping them in a parent. 
************************************************************************/

// * Your main component takes props for
//   * `loading` - indicates app should display "loading" info
//   * `movies` - the list of movies to display
function App(props) {

  if (props.loading) {
    return <Loader />;
  }
  const movieStats = props.movies.map(movie => (
    /* Call component 'MovieStat' and put 'key' and 'movie' on the 'props' input */
    <MovieStat
      key={movie.imdbID} // * Use `key` to track list items
      movie={movie}
    />
  ));
  return (
    <div>
      <h1>lab1</h1>
      {movieStats}
    </div>
  );
}

// * Decompose into meaningful components (logical parts)
function MovieStat(props) {
  // React elements which take up multiple lines need to be wrapped in '()'
  return (
    <div>
      <p>
        Movie title: {props.movie.Title}
      </p>
      <img src={props.movie.Poster} />
    </div>
  );
}

// * Decompose into meaningful components (logical parts)
function Loader(props) {
  // React elements on a single line don't need to be wrapped in '()'
  return <h1>loading.....</h1>;
}

////////// EXECUTE ////////// EXECUTE ////////// EXECUTE ////////// EXECUTE ////////// EXECUTE 

ReactDOM.render(
  /* Call component 'App' and put 'loading' on the 'props' input */
  <App loading={true} />,
  document.getElementById('root')
);

fetch('http://www.omdbapi.com/?s=Space+Jam&plot=full&r=json')
  .then(res => res.json() )
  .then(returnObj => {
    console.log(returnObj);
    // returnObj.Search accesses the value that points to the array of returned API movies
    const movies = returnObj.Search; // this is the value for the 'movies' key that's put on 'props'
    ReactDOM.render(
      /* Call component 'App' and put 'movies' and 'loading' on the 'props' input */ 
      // if 'loading={true}' App returns <Loader /> and exits, 'movies' doesn't render
      <App movies={movies} loading={false} />, 
      document.getElementById('root')
    );
  });
