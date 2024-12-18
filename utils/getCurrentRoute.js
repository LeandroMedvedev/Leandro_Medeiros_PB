import { useRoute } from '@react-navigation/native';

export default function getCurrentRoute() {
  const route = useRoute();
  return route.name;
}
