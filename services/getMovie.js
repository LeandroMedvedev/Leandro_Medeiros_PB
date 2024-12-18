import Constants from 'expo-constants';
import axios from 'axios';

const { ACCESS_TOKEN } = Constants.expoConfig.extra;

export default async function getMoviesService(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return response.data.results;
  } catch (error) {
    throw new Error('Erro ao buscar filmes: ', error.message);
  }
}
