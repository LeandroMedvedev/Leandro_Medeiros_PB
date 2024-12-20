import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { useAuthContext, useMoviesContext } from '../../contexts';
import { MOVIE_CATEGORIES } from '../../constants';
import { colors } from '../../styles/globalStyles';
import { getCurrentRoute } from '../../utils';
import { movieTheater } from '../../assets';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { url, setUrl } = useMoviesContext();
  const { width } = useWindowDimensions();
  const { signOut } = useAuthContext();

  const navigation = useNavigation();
  const route = getCurrentRoute();
  const isMoviePage = route === 'Movies';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const sessionId = await AsyncStorage.getItem('session_id');
        const isAuth = !!sessionId;
        setIsAuthenticated(isAuth);
      } catch (err) {
        console.error('Erro ao verificar autenticação:', err);
      }
    };

    checkAuth();
  }, [route]);

  const isCurrentRoute = (routeName) => route === routeName;

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Movies')}
        style={styles.brandLink}
      >
        <Text style={styles.brand}>CinePlay</Text>

        <Image style={styles.logo} source={{ uri: movieTheater }} />
      </TouchableOpacity>

      {isMoviePage && (
        <FormControl variant='standard' sx={{ display: width < 480 && 'none' }}>
          <InputLabel
            sx={{
              fontSize: 18,
              color: colors.white,
              fontFamily: 'sans-serif',
              '&.Mui-focused': { color: colors.white },
            }}
          >
            Categorias
          </InputLabel>

          <Select
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            displayEmpty
            sx={{
              fontFamily: 'sans-serif',
              fontSize: 14,
              color: colors.white,
            }}
          >
            {MOVIE_CATEGORIES &&
              MOVIE_CATEGORIES.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.url}
                  sx={{
                    fontFamily: 'sans-serif',
                  }}
                >
                  {item.category}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}

      <View style={styles.headerLabels}>
        {isAuthenticated ? (
          <>
            {route !== 'watchlist' && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Watchlist')}
              >
                <Text
                  style={[
                    styles.headerLabel,
                    isCurrentRoute('Watchlist') && styles.activeLink,
                  ]}
                >
                  Interesses
                </Text>
              </TouchableOpacity>
            )}
            {route !== 'favorites' && (
              <TouchableOpacity
                onPress={() => navigation.navigate('Favorites')}
              >
                <Text
                  style={[
                    styles.headerLabel,
                    isCurrentRoute('Favorites') && styles.activeLink,
                  ]}
                >
                  Favoritos
                </Text>
              </TouchableOpacity>
            )}
            {
              <TouchableOpacity onPress={() => signOut()}>
                <Text style={styles.headerLabel}>Sair</Text>
              </TouchableOpacity>
            }
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('SubscriptionPlans')}
            >
              <Text
                style={[
                  styles.headerLabel,
                  isCurrentRoute('SubscriptionPlans') && styles.activeLink,
                ]}
              >
                Assinatura
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.headerLabel}>Entrar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    gap: 10,
    zIndex: 1,
    padding: 5,
    height: 78,
    width: '100%',
    flexDirection: 'row',
    position: 'sticky',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backgroundImage:
      'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 10%, transparent)',
  },
  brandLink: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  brand: {
    fontSize: 22,
    fontWeight: '500',
    color: colors.gold,
  },
  logo: {
    width: 30,
    height: 30,
    marginLeft: 8,
  },
  form: {
    color: colors.white,
    fontSize: 14,
  },
  link: {
    fontSize: 16,
    cursor: 'pointer',
    color: colors.white,
    transitionDuration: '0.9s',
    textDecorationLine: 'none',
  },
  activeLink: {
    color: colors.gold,
    borderBottomWidth: 1,
    borderBottomColor: colors.gold,
  },
  headerLabels: {
    flex: 2,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  headerLabel: {
    fontSize: 16,
    color: colors.white,
  },
});
