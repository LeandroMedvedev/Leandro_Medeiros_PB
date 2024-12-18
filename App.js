import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { AppProvider } from './contexts';
import { AppNavigator } from './routes';

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </NavigationContainer>
  );
}
