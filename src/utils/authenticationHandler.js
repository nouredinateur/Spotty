import {authorize, refresh} from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CLIENT_SECRET, CLIENT_ID} from '@env';

const config = {
  /** hide these **/
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  /** hide these **/

  redirectUrl: 'com.spotty:/oauth', //not recommended
  scopes: [
    'user-read-recently-played',
    'user-read-currently-playing',
    'playlist-read-collaborative',
    'user-library-read',
    'user-top-read',
    'playlist-modify-public',
  ],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

export const onLogin = async () => {
  try {
    const result = await authorize(config);

    return result;
  } catch (error) {
    console.log('error ', JSON.stringify(error));
  }
};

export const refreshLogin = async refreshToken => {
  const result = await refresh(config, {
    refreshToken: refreshToken,
  });
  return result;
};
