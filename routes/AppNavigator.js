import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home.jsx';
import {
  Task01,
  Task02,
  Task03,
  Task04,
  Task05,
  Task06,
  Task07,
  Task08,
  Task09,
  Task10,
  Task11,
  Task12,
  Task13,
  Task14,
  Task15,
  Task16,
} from '../tasks';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Task01' component={Task01} />
      <Stack.Screen name='Task02' component={Task02} />
      <Stack.Screen name='Task03' component={Task03} />
      <Stack.Screen name='Task04' component={Task04} />
      <Stack.Screen name='Task05' component={Task05} />
      <Stack.Screen name='Task06' component={Task06} />
      <Stack.Screen name='Task07' component={Task07} />
      <Stack.Screen name='Task08' component={Task08} />
      <Stack.Screen name='Task09' component={Task09} />
      <Stack.Screen name='Task10' component={Task10} />
      <Stack.Screen name='Task11' component={Task11} />
      <Stack.Screen name='Task12' component={Task12} />
      <Stack.Screen name='Task13' component={Task13} />
      <Stack.Screen name='Task14' component={Task14} />
      <Stack.Screen name='Task15' component={Task15} />
      <Stack.Screen name='Task16' component={Task16} />
    </Stack.Navigator>
  );
}
