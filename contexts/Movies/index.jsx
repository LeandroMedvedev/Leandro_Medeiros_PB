import { createContext, useEffect, useState } from 'react';

import { MOVIE_CATEGORIES } from '../../constants';
import { getMoviesService } from '../../services';

const MoviesContext = createContext(undefined);

function MoviesProvider({ children }) {
  const nowPlayingMoviesUrl = MOVIE_CATEGORIES.at(0).url;

  const [url, setUrl] = useState(nowPlayingMoviesUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedMovies = await getMoviesService(url);
      setMovies(fetchedMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [url]);

  const sharedStates = {
    setUrl,
    loading,
    movies,
    error,
    url,
  };

  return (
    <MoviesContext.Provider value={sharedStates}>
      {children}
    </MoviesContext.Provider>
  );
}

export { MoviesContext, MoviesProvider };
