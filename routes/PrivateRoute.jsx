import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors } from '../styles/globalStyles';
import { SignIn } from '../screens';

export default function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const sessionId = await AsyncStorage.getItem('session_id');
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
