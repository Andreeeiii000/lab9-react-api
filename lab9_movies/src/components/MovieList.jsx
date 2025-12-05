import React from "react";
import MovieCard from "./MovieCard";

export default function MovieList({ movies, onSelectMovie }) {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onClick={() => onSelectMovie(movie.imdbID)}
        />
      ))}
    </div>
  );
}
