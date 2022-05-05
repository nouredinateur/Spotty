import React, {useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useStore} from '../../../utils/store';

const RecentlyPlayedScreen = () => {
  const disconnect = useStore(state => state.disconnect);
  const setToken = useStore(state => state.setToken);
  const token = useStore(state => state.token);

  const fetchTopItems = async () => {
    try {
      const response = await fetch(
        'https://api.spotify.com/v1/me/top/tracks?offset=5&limit=10',
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await response.json();
      console.log('result', result);
    } catch (error) {
      console.log('err', error);
    }
  };
  useEffect(() => {
    fetchTopItems();
  }, []);
  const handleDisconnect = () => {
    setToken('');
    disconnect();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color: 'white'}}>recently Played</Text>
      <TouchableOpacity onPress={handleDisconnect} style={styles.Button}>
        <Text style={{color: 'white', textAlign: 'center'}}>disconnect</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b2021',
    width: '100%',
    height: '100%',
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

export default RecentlyPlayedScreen;
