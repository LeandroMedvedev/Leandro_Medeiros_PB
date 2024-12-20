import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Constants from 'expo-constants';
import { useCallback, useEffect, useState } from 'react';

import { MovieCard, SearchBar } from '../../components';
import { colors } from '../../styles/globalStyles';
import { getMoviesService } from '../../services';
import { useFetchMovies } from '../../hooks';

const { API_FAVORITE_URL } = Constants.expoConfig.extra;

export default function Favorites() {
  const fetchMovies = useCallback(() => getMoviesService(API_FAVORITE_URL), []);

  const { movies, loading, error } = useFetchMovies(fetchMovies);

  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase()) ||
          movie.original_title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

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
      <SearchBar value={searchQuery} onChangeText={handleSearch} />

      <FlatList
        data={filteredMovies}
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
    fontSize: 16,
    color: colors.darkRed,
  },
});
