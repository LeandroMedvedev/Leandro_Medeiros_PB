import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useCallback } from 'react';
import Constants from 'expo-constants';

import { colors } from '../../styles/globalStyles';
import { getMoviesService } from '../../services';
import { useFetchMovies } from '../../hooks';
import { MovieCard } from '../../components';

const { API_FAVORITE_URL } = Constants.expoConfig.extra;

export default function Favorites() {
  const fetchMovies = useCallback(() => getMoviesService(API_FAVORITE_URL), []);

  const { movies, loading, error } = useFetchMovies(fetchMovies);
  console.log('favoritos', movies);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color='#FFD700' />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.ebony,
  },
  list: {
    gap: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ebony,
  },
  error: {
    color: colors.darkRed,
    fontSize: 16,
  },
});
