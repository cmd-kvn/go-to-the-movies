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

  const laLaLand = <MovieStat key={props.movies[0].imdbID} movie={props.movies[0]} />;
  const moonlight = <MovieStat key={props.movies[1].imdbID} movie={props.movies[1]} />;

  return (
    <div>
      <div>
        <h1>And the Oscar goes to...</h1>
        {laLaLand}
      </div>

      <h3 className='center'>wait</h3>
      <h2 className='center'>wait</h2>
      <h1 className='center'><i>wait</i></h1>
      <div>
        <h1>There's been a mistake. The Oscar for best picture is...</h1>
        {moonlight}
      </div>
    </div>
  );
}

// * Decompose into meaningful components (logical parts)
function MovieStat(props) {
  // React elements which take up multiple lines need to be wrapped in '()'
  return (
    <div>
      <p>
        <strong><i>{props.movie.Title}</i></strong>, directed by {props.movie.Director}, written by {props.movie.Writer}
      </p>
      <img src={props.movie.Poster} alt='{props.movie.Title} poster'/>
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

Promise.all([
fetch('http://www.omdbapi.com/?t=la+la+land&plot=full&r=json').then(res => res.json()),
fetch('http://www.omdbapi.com/?t=moonlight&plot=full&r=json').then(res => res.json())
])
  .then(moviesArr => {
    const movies = moviesArr; // this is the value for the 'movies' key that's put on 'props'
    ReactDOM.render(
      /* Call component 'App' and put 'movies' and 'loading' on the 'props' input */ 
      // if 'loading={true}' App returns <Loader /> and exits, 'movies' doesn't render
      <App movies={movies} loading={false} />, 
      document.getElementById('root')
    );
  });
