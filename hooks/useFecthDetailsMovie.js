import { useEffect, useState } from 'react';

import { getMovieByIdService } from '../services';

export default function useFetchDetailsMovie(movieId) {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetailsMovie() {
      try {
        const data = await getMovieByIdService(movieId);
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchDetailsMovie();
  }, []);

  return { movie, loading, error };
}
