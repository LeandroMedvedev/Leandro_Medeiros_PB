import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import { colors } from '../styles/globalStyles';
import { SignIn } from '../screens';

export default function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = () => {
      const sessionId = localStorage.getItem('session_id');
      setIsAuthenticated(!!sessionId);
    };

    checkAuthentication();
  }, []);

  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color={colors.gold} />
      </View>
    );
  }

  return isAuthenticated ? children : <SignIn />;
}
