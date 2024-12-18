import { createStackNavigator } from '@react-navigation/stack';

import { Favorites, Movies, MovieDetails, Watchlist, SignIn } from '../screens';
import PrivateRoute from './PrivateRoute.jsx';
import { Header } from '../components';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ header: () => <Header /> }}
      initialRouteName='Movies'
    >
      <Stack.Screen name='Movies' component={Movies} />
      <Stack.Screen name='MovieDetails' component={MovieDetails} />
      <Stack.Screen name='SignIn' component={SignIn} />

      {/* Rotas Privadas */}
      <Stack.Screen name='Watchlist'>
        {() => (
          <PrivateRoute>
            <Watchlist />
          </PrivateRoute>
        )}
      </Stack.Screen>

      <Stack.Screen name='Favorites'>
        {() => (
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
