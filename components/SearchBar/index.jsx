import { TextInput, StyleSheet } from 'react-native';

import { colors } from '../../styles/globalStyles';

export default function SearchBar({ value, onChangeText }) {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder='Buscar filmes...'
      placeholderTextColor={colors.shuttleGrey}
      onChangeText={onChangeText}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 50,
    borderRadius: 4,
    marginBottom: 30,
    paddingHorizontal: 10,
    color: colors.midnightBlue,
    backgroundColor: colors.white,
  },
});
