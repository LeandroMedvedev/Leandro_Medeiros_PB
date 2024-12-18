import Constants from 'expo-constants';
import axios from 'axios';

const { API_BASE_URL, ACCESS_TOKEN } = Constants.expoConfig.extra;

export default async function getRequestTokenService() {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/authentication/token/new`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    return response.data.request_token;
  } catch (error) {
    console.error('Erro ao solicitar token:', error.message);
    return null;
  }
}
