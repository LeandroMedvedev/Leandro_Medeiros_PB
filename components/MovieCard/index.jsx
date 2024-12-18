import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '../../styles/globalStyles';
import { IMAGE_BASE_URL } from '../../constants';

export default function MovieCard({ movie }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.link}
        onPress={() =>
          navigation.navigate('MovieDetails', { movieId: movie.id })
        }
        activeOpacity={0.8} // Simular o efeito de hover com um toque
      >
        <Image
          style={styles.image}
          source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
          resizeMode='cover'
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 233.33,
    height: 349,
    borderRadius: 4,
    borderWidth: 1,
    filter: 'grayscale(50%)',
    borderColor: colors.white,
  },
  link: {
    borderRadius: 4,
    transform: [{ scale: 1 }],
    transitionDuration: '0.7s',
  },
});
