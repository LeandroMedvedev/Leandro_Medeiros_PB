import { MoviesProvider } from '../Movies/index.jsx';
import { AuthProvider } from '../Auth/index.jsx';

export default function AppProvider({ children }) {
  return (
    <AuthProvider>
      <MoviesProvider>{children}</MoviesProvider>
    </AuthProvider>
  );
}
