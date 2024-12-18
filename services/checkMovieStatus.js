import Constants from 'expo-constants';

import { API } from '../constants';

const { API_KEY } = Constants.expoConfig.extra;

export default async function checkMovieStatusService(movieId, sessionId) {
  try {
    const response = await API.get(`movie/${movieId}/account_states`, {
      params: {
        api_key: API_KEY,
        session_id: sessionId,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Erro ao verificar estado do filme:', error);
  }
}
