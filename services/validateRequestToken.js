import Constants from 'expo-constants';
import axios from 'axios';

const { API_BASE_URL, ACCESS_TOKEN } = Constants.expoConfig.extra;

export default async function validateRequestTokenService(
  username,
  password,
  request_token
) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/authentication/token/validate_with_login`,
      {
        username,
        password,
        request_token,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    return response.data.request_token;
  } catch (error) {
    throw new Error('Erro ao validar token: ' + error.message);
  }
}
