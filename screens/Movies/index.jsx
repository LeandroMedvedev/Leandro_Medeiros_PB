import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { colors } from '../../styles/globalStyles';
import { useMoviesContext } from '../../contexts';
import { MovieCard } from '../../components';

// const { width } = Dimensions.get('window');

export default function Movies() {
  const { movies, loading, error } = useMoviesContext();

  // const numColumns = Math.floor(width / 233.33);

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
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.white,
  },
  error: {
    fontSize: 16,
    color: colors.darkRed,
  },
});
