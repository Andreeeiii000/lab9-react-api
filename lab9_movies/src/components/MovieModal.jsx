import React from "react";

export default function MovieModal({ movie, loading, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          ✕
        </button>

        {loading && <p>Загрузка...</p>}

        {!loading && !movie && <p>Нет данных о фильме.</p>}

        {!loading && movie && (
          <>
            <h2>{movie.Title}</h2>
            <p>
              <strong>Год:</strong> {movie.Year}
            </p>
            <p>
              <strong>Жанр:</strong> {movie.Genre}
            </p>
            <p>
              <strong>Режиссёр:</strong> {movie.Director}
            </p>
            <p>
              <strong>Актёры:</strong> {movie.Actors}
            </p>
            <p>
              <strong>Рейтинг IMDb:</strong> {movie.imdbRating}
            </p>
            <p>
              <strong>Описание:</strong> {movie.Plot}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
