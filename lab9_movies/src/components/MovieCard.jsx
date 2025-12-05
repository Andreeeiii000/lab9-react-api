import React from "react";

export default function MovieCard({ movie, onClick }) {
  const { Title, Year, Poster, Type } = movie;

  const posterSrc =
    Poster && Poster !== "N/A"
      ? Poster
      : "https://via.placeholder.com/200x300?text=No+Image";

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={posterSrc} alt={Title} />
      <div className="movie-card__info">
        <h3>{Title}</h3>
        <p>{Year}</p>
        {Type && <p className="movie-card__type">Тип: {Type}</p>}
      </div>
    </div>
  );
}
