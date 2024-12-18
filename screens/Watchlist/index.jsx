import { useCallback } from 'react';
import Constants from 'expo-constants';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { colors } from '../../styles/globalStyles';
import { getMoviesService } from '../../services';
import { MovieCard } from '../../components';
import { useFetchMovies } from '../../hooks';

const { API_WATCHLIST_URL } = Constants.expoConfig.extra;

function Watchlist() {
  const fetchMovies = useCallback(
    () => getMoviesService(API_WATCHLIST_URL),
    [API_WATCHLIST_URL]
  );
  const { movies, loading, error } = useFetchMovies(fetchMovies);
  console.log('interesses', movies);

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
        renderItem={({ item }) => <MovieCard movie={item} />}
        keyExtractor={(_, index) => index.toString()}
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
  list: {
    gap: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Watchlist;
