import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import { convertDateToBrazilianFormat } from '../../utils';
import { useFetchDetailsMovie } from '../../hooks';
import { colors } from '../../styles/globalStyles';
import { IMAGE_BASE_URL } from '../../constants';
import { useAuthContext } from '../../contexts';
import {
  checkMovieStatusService,
  toggleFavoriteStatusService,
  toggleWatchlistStatusService,
} from '../../services';

export default function MovieDetails() {
  const { params } = useRoute();
  const { movieId } = params;

  const { sessionId } = useAuthContext();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const { movie, loading, error } = useFetchDetailsMovie(movieId);

  useEffect(() => {
    if (!sessionId) return;

    const loadMovieStatus = async () => {
      try {
        const data = await checkMovieStatusService(movieId, sessionId);
        setIsFavorite(data.favorite);
        setIsWatchlisted(data.watchlist);
      } catch (err) {
        console.error(err);
      }
    };

    loadMovieStatus();
  }, [movieId, sessionId]);

  const handleToggleFavorite = async () => {
    try {
      const success = await toggleFavoriteStatusService(
        movieId,
        sessionId,
        isFavorite
      );
      if (success) {
        setIsFavorite(!isFavorite);
        console.log('Sucesso ao adicionar filme aos favoritos.');
      }
    } catch (err) {
      console.error('Erro ao adicionar/remover dos favoritos:', err);
    }
  };

  const handleToggleWatchlist = async () => {
    try {
      const success = await toggleWatchlistStatusService(
        movieId,
        sessionId,
        isWatchlisted
      );
      if (success) {
        setIsWatchlisted(!isWatchlisted);
        console.log('Sucesso ao adicionar filme à lista de interesses.');
      }
    } catch (err) {
      console.error('Erro ao adicionar/remover à/da lista de interesses:', err);
    }
  };

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
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
          resizeMode='contain'
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{movie.title}</Text>

        {sessionId && (
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={handleToggleFavorite}
              style={styles.favoriteButton}
            >
              <FontAwesome
                name={isFavorite ? 'heart' : 'heart-o'}
                size={24}
                color='#FFD700'
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleToggleWatchlist}
              style={styles.watchlistButton}
            >
              <FontAwesome
                name={isWatchlisted ? 'bookmark' : 'bookmark-o'}
                size={24}
                color='#FFD700'
              />
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.voteAverage}>
          <Text style={styles.star}>&#9733;</Text>{' '}
          {movie.vote_average.toFixed(1)}
        </Text>
        <Text style={styles.originalTitle}>
          Título original: {movie.original_title}
        </Text>
        <Text style={styles.tagline}>{movie.tagline}</Text>
        <Text style={styles.releaseDateContainer}>
          {convertDateToBrazilianFormat(movie.release_date)} • {movie.runtime}{' '}
          min
        </Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 16,
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.ebony,
  },
  imgContainer: {
    alignItems: 'center',
    marginBottom: 16,
    width: 310,
    height: 466,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    borderWidth: 0.5,
    objectFit: 'contain',
    filter: 'grayscale(50%)',
    borderColor: colors.white,
  },
  infoContainer: {
    flex: 1,
    // gap: 12,
    minWidth: 350,
    maxWidth: 700,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
    paddingLeft: 18,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingLeft: 18,
  },
  favoriteButton: {
    marginRight: 16,
  },
  voteAverage: {
    fontSize: 16,
    marginBottom: 8,
    paddingLeft: 18,
    color: '#FFD700',
  },
  originalTitle: {
    fontSize: 14,
    color: colors.white,
    marginBottom: 4,
    paddingLeft: 18,
  },
  tagline: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#aaa',
    marginBottom: 4,
    paddingLeft: 18,
  },
  releaseDateContainer: {
    fontSize: 14,
    paddingLeft: 18,
    marginBottom: 16,
    color: colors.white,
  },
  overview: {
    fontSize: 14,
    color: '#ddd',
    lineHeight: 20,
    paddingLeft: 18,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ebony,
  },
  error: {
    color: colors.darkRed,
    fontSize: 16,
  },
});
