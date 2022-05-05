import React, {useEffect} from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {onLogin} from '../../../utils/authenticationHandler';
import {useStore} from '../../../utils/store';

const asyncStorageGetter = async () => {
  let tokenData = await AsyncStorage.getItem('@tokenData');
  let authState = await AsyncStorage.getItem('authState');
  let parsedToken = JSON.parse(tokenData);
  console.log(authState);
};

const LoginScreen = () => {
  const auth = useStore(state => state.auth);
  const connect = useStore(state => state.connect);
  const disconnect = useStore(state => state.disconnect);
  const storedToken = useStore(state => state.token);
  const setToken = useStore(state => state.setToken);
  console.log('render');

  useEffect(() => {
    console.log('token in store: ', storedToken);
  }, []);

  const handleLogin = async () => {
    const authData = await onLogin();
    const token = authData.accessToken;
    console.log('token :', token);
    if (token) {
      setToken(token);
      connect();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogin} style={styles.Button}>
        <Text style={{color: 'white', textAlign: 'center'}}>
          Login with Spotify
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b2021',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
    backgroundColor: '#89023e',
    paddingVertical: 12,
    width: 200,
    borderRadius: 20,
    paddingHorizontal: 50,
    shadowColor: '#30343f',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.0,
    elevation: 10,
    marginVertical: 10,
  },
});

export default LoginScreen;
