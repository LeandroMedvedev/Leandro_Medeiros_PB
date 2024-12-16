import { StyleSheet, Text, View } from 'react-native';

import { colors, globalStyles } from '../../styles/globalStyles';

export default function Task15() {
  return (
    <View style={globalStyles.container}>
      <Text style={styles.text}>Tarefa 15</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    color: colors.white,
  },
});
