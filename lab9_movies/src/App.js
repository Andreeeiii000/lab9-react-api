// src/App.js
import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import MovieModal from "./components/MovieModal";
import "./index.css";

const API_KEY = "589e8037"; // TODO: замени на свой ключ с omdbapi.com




function App() {
  console.log("Текущий API_KEY:", API_KEY);
  const [searchTerm, setSearchTerm] = useState("");      // строка поиска
  const [movies, setMovies] = useState([]);              // список фильмов
  const [selectedMovieId, setSelectedMovieId] = useState(null); // imdbID
  const [selectedMovie, setSelectedMovie] = useState(null);     // детали фильма

  const [loading, setLoading] = useState(false);         // загрузка списка
  const [modalLoading, setModalLoading] = useState(false); // загрузка модалки
  const [error, setError] = useState(null);              // текст ошибки

  // useEffect для загрузки списка фильмов при изменении поискового запроса
  useEffect(() => {
    if (!searchTerm) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
            searchTerm
          )}`
        );
        const data = await res.json();

        if (data.Response === "False") {
          setMovies([]);
          setError(data.Error || "Фильмы не найдены");
        } else {
          setMovies(data.Search);
        }
      } catch (err) {
        setError("Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  // useEffect для загрузки деталей фильма по id (для модалки)
  useEffect(() => {
    if (!selectedMovieId) {
      setSelectedMovie(null);
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        setModalLoading(true);
        setError(null);

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedMovieId}&plot=full`
        );
        const data = await res.json();

        if (data.Response === "False") {
          setSelectedMovie(null);
          setError(data.Error || "Не удалось загрузить детали фильма");
        } else {
          setSelectedMovie(data);
        }
      } catch (err) {
        setError("Ошибка загрузки данных");
      } finally {
        setModalLoading(false);
      }
    };

    fetchMovieDetails();
  }, [selectedMovieId]);

  // обработка поиска из SearchBar
  const handleSearch = (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setSelectedMovieId(null);
    setSelectedMovie(null);
    setSearchTerm(trimmed);
  };

  // закрыть модалку
  const handleCloseModal = () => {
    setSelectedMovieId(null);
    setSelectedMovie(null);
  };

  return (
    <div className="app">
      <h1>Каталог фильмов (OMDb API)</h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="status">Загрузка...</p>}
      {error && <p className="status status--error">{error}</p>}
      {!loading && !error && searchTerm && movies.length === 0 && (
        <p className="status">По запросу ничего не найдено.</p>
      )}

      <MovieList movies={movies} onSelectMovie={setSelectedMovieId} />

      {selectedMovieId && (
        <MovieModal
          movie={selectedMovie}
          loading={modalLoading}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
