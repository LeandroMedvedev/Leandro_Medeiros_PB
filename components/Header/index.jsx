import { useEffect, useState } from 'react';
import { Menu, MenuItem } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { useAuthContext, useMoviesContext } from '../../contexts';
import { getCurrentRoute } from '../../utils';
import { MOVIE_CATEGORIES } from '../../constants';
import { colors } from '../../styles/globalStyles';
import { movieTheater } from '../../assets';
// import Svg from '../Svg';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visible, setVisible] = useState(false);

  const { url, setUrl } = useMoviesContext();
  const { signOut } = useAuthContext();

  const navigation = useNavigation();
  const route = getCurrentRoute();
  const isHomePage = !route;

  useEffect(() => {
    const isAuth = !!localStorage.getItem('session_id');
    if (isAuth) setIsAuthenticated(isAuth);
  }, [route]);

  const isCurrentRoute = (routeName) => route === routeName;

  const headerLabels = isAuthenticated ? (
    <>
      {route !== 'watchlist' && (
        <TouchableOpacity onPress={() => navigation.navigate('Watchlist')}>
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
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
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
    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
      <Text style={styles.headerLabel}>Entrar</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Movies')}
        style={styles.brandLink}
      >
        <Text style={styles.brand}>CinePlay</Text>

        {/* <Svg style={styles.logo} src={movieTheater} /> */}
        <Image style={styles.logo} source={{ uri: movieTheater }} />
      </TouchableOpacity>

      {/* {isHomePage && (
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Text style={styles.select}>Categorias</Text>
            </TouchableOpacity>
          }
        >
          {MOVIE_CATEGORIES.map((item, index) => (
            <MenuItem
              key={index}
              onPress={() => {
                setUrl(item.url);
                setVisible(false);
              }}
            >
              {item.category}
            </MenuItem>
          ))}
        </Menu>
      )} */}

      <View style={styles.headerLabels}>
        {!isAuthenticated}
        {headerLabels}
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
  select: {
    fontFamily: 'Ubuntu',
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
