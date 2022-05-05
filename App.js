import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import LoginScreen from './src/screens/public/LoginScreen';
import RecentlyPlayedScreen from './src/screens/user/RecentlyPlayedScreen';
import {useStore} from './src/utils/store';

const App = () => {
  const authState = useStore(state => state.auth);
  return (
    <>{authState === 'offline' ? <LoginScreen /> : <RecentlyPlayedScreen />}</>
  );
};

export default App;
