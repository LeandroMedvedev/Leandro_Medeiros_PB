import Constants from 'expo-constants';
import axios from 'axios';

const { API_DETAILS_URL, API_KEY, ACCESS_TOKEN } = Constants.expoConfig.extra;

export default async function getMovieByIdService(movieId) {
  try {
    const response = await axios.get(
      `${API_DETAILS_URL}/${movieId}?api_key=${API_KEY}&append_to_response=videos,images&language=pt-BR`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar filme: ' + error.message);
  }
}
