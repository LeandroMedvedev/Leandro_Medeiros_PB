import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/globalStyles';
import { TASKS } from '../constants';

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teste de Performance 1</Text>
      <View style={styles.list}>
        {TASKS.map((task, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => navigation.navigate(task.route)}
          >
            <Text style={styles.link}>{task.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.githubGraffiti,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.white,
  },
  list: {
    width: '100%',
    maxWidth: 620,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 10,
  },
  item: {
    maxWidth: 300,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    marginBottom: 10,
    width: '48%',
  },
  link: {
    fontSize: 16,
    fontWeight: 700,
    color: colors.blackRussian,
    textAlign: 'center',
  },
});
