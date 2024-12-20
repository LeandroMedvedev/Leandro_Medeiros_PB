import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '../../styles/globalStyles';

export default function PlanCard({ plan, onSubscribe }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{plan.name}</Text>
      <Text style={styles.price}>{plan.price}</Text>
      <Text style={styles.period}>{plan.period}</Text>
      <View style={styles.benefits}>
        {plan.benefits.map((benefit, index) => (
          <Text key={index} style={styles.benefit}>
            • {benefit}
          </Text>
        ))}
      </View>
      <TouchableOpacity
        style={{
          height: 60,
          borderRadius: 4,
          paddingHorizontal: 20,
          backgroundColor: colors.gold,
        }}
        onPress={() => onSubscribe(plan.id)}
      >
        <Text style={styles.subscribeText}>Contratar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 400,
    borderRadius: 4,
    padding: 16,
    marginVertical: 10,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: colors.ebony,
    shadowColor: colors.whiteSmoke,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.gold,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginVertical: 4,
  },
  period: {
    fontSize: 14,
    color: colors.white,
  },
  benefits: {
    marginTop: 8,
    marginBottom: 16,
  },
  benefit: {
    fontSize: 14,
    color: colors.white,
  },
  subscribeButton: {
    backgroundColor: colors.gold,
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  subscribeText: {
    height: 60,
    fontSize: 26,
    lineHeight: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.white,
  },
});
