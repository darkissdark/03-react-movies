import { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";

import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery.trim());
    setMovies([]);
  }, []);

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    if (!query) return;

    const loadMovies = async () => {
      setLoading(true);
      setError(false);

      try {
        const results = await fetchMovies(query);

        if (!results.length) {
          toast("No movies found for your request.");
        }

        setMovies(results);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError(true);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [query]);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {loading && <Loader />}
      {!loading && error && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <Toaster />
    </div>
  );
};

export default App;
