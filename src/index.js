import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function MovieStat(props) {
  return (
    <p>
      Movie title: {props.movie.Title}
    </p>
  );
}

function Loader(props) {
  return <p>loading.....</p>;
}

function App(props) {
  if (props.loading) {
    return <Loader />;
  }
  const movieStats = props.movies.map(movie => (
    <MovieStat
      key={movie.imdbID}
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

ReactDOM.render(
    <App loading={true} />,
  document.getElementById('root')
);

fetch('http://www.omdbapi.com/?s=Space+Jam&plot=full&r=json')
  .then(res => res.json())
  .then(json => {
    const movies = json.Search;
    ReactDOM.render(
      <App movies={movies} loading={false} />,
      document.getElementById('root')
    );
  });