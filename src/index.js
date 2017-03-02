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
    <p>
      Movie title: {props.movie.Title}
    </p>
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
  .then(res => res.json())
  .then(json => {
    const movies = json.Search; // this is the value for the 'movies' key that's put on 'props'
    ReactDOM.render(
      /* Call component 'App' and put 'movies' and 'loading' on the 'props' input */ 
      <App movies={movies} loading={false} />, 
      document.getElementById('root')
    );
  });
