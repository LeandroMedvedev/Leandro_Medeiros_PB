import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';

import { MovieCard, SearchBar } from '../../components';
import { colors } from '../../styles/globalStyles';
import { useMoviesContext } from '../../contexts';

export default function Movies() {
  const { movies, loading, error } = useMoviesContext();

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
        keyExtractor={(_, index) => index.toString()}
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
    display: 'flex',
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
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    color: colors.white,
  },
  error: {
    fontSize: 16,
    color: colors.darkRed,
  },
});
