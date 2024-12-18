import { useContext } from 'react';

import { MoviesContext } from './index.jsx';

export default function useMoviesContext() {
  const context = useContext(MoviesContext);

  if (!context)
    throw new Error('useMoviesContext must be used inside an AppProvider');

  return context;
}
