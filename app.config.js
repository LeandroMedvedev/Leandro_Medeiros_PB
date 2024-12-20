export default ({ config }) => ({
  ...config,
  name: 'CinePlay',
  slug: 'cineplay',
  version: '0.1.0',
  orientation: 'portrait',
  icon: './assets/images/movie.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/images/movie.png',
  },
  extra: {
    API_URL: process.env.API_URL,
    API_WATCHLIST_URL: process.env.REACT_APP_TMDB_API_WATCHLIST_URL,
    API_FAVORITE_URL: process.env.REACT_APP_TMDB_API_FAVORITES_URL,
    API_DETAILS_URL: process.env.REACT_APP_TMDB_API_DETAILS_URL,
    API_POPULAR_URL: process.env.REACT_APP_TMDB_API_POPULAR_URL,
    API_BASE_URL: process.env.REACT_APP_TMDB_API_BASE_URL,
    ACCESS_TOKEN: process.env.REACT_APP_TMDB_ACCESS_TOKEN,
    ACCOUNT_ID: process.env.REACT_APP_TMDB_ACCOUNT_ID,
    API_KEY: process.env.REACT_APP_TMDB_API_KEY,
  },
});
