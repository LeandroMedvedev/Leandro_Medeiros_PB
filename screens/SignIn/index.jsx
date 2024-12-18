import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';

import { useAuthContext } from '../../contexts';
import { colors } from '../../styles/globalStyles';

function SignIn() {
  const [username, setUsername] = useState('LeandroMedvedev');
  const [password, setPassword] = useState('');
  const { error, loading, signIn } = useAuthContext();

  const handleSubmit = async () => {
    await signIn(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Usuário'
          value={username}
          onChangeText={setUsername}
          autoCapitalize='none'
          autoCompleteType='username'
          required
        />
        <TextInput
          style={styles.input}
          placeholder='Senha'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCompleteType='password'
          required
        />

        <TouchableOpacity
          style={{
            height: 60,
            borderRadius: 4,
            paddingHorizontal: 20,
            backgroundColor: colors.gold,
            opacity: loading || !username || !password ? 0.4 : 1,
          }}
          onPress={handleSubmit}
          disabled={loading || !username || !password}
        >
          <Text style={styles.textButton}>
            {loading ? 'Carregando...' : 'Enviar'}
          </Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      {loading && (
        <ActivityIndicator size='large' color='#ffd700' style={styles.loader} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.ebony,
  },
  title: {
    fontSize: 50,
    color: colors.gold,
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    maxWidth: 350,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ffd700',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: colors.white,
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  loader: {
    marginTop: 20,
    alignSelf: 'center',
  },
  textButton: {
    height: 60,
    fontSize: 26,
    lineHeight: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default SignIn;
