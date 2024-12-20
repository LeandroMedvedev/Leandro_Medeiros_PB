import { useNavigation } from '@react-navigation/native';
import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  validateRequestTokenService,
  getRequestTokenService,
  createSessionService,
} from '../../services';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadSessionId = async () => {
      try {
        const storedSessionId = await AsyncStorage.getItem('session_id');
        if (storedSessionId) {
          setSessionId(storedSessionId);
        }
      } catch (err) {
        console.error('Erro ao carregar o session_id:', err);
      }
    };

    loadSessionId();
  }, []);

  const signIn = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const requestToken = await getRequestTokenService();
      const validateToken = await validateRequestTokenService(
        username,
        password,
        requestToken
      );
      const newSessionId = await createSessionService(validateToken);

      await AsyncStorage.setItem('session_id', newSessionId);
      setSessionId(newSessionId);

      navigation.navigate('Watchlist');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('session_id');
      setSessionId(null);
      navigation.navigate('SignIn');
    } catch (err) {
      console.error('Erro ao remover o session_id:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ sessionId, signIn, signOut, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
