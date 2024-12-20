import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';

import { colors } from '../../styles/globalStyles';
import { PlanCard } from '../../components';
import { PLANS } from '../../constants';

export default function SubscriptionPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        setPlans(PLANS);
      } catch (error) {
        console.error('Erro ao carregar os planos:', error);
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = (planId) => {
    console.log('Plano contratado:', planId);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={colors.gold} />
      </View>
    );
  }

  if (plans.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>Nenhum plano disponível no momento.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={plans}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlanCard plan={item} onSubscribe={handleSubscribe} />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ebony,
  },
  list: {
    paddingVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.ebony,
  },
  message: {
    fontSize: 16,
    color: colors.white,
  },
});
