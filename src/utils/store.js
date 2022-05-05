import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import {persist} from 'zustand/middleware';
// the persist middlwate will persite the store state in asynStorage
export const useStore = create(
  persist(
    (set, get) => ({
      auth: 'offline',
      token: '',
      setToken: token => set(state => ({token: token})),
      connect: () => set({auth: 'online'}),
      disconnect: () => set({auth: 'offline'}),
    }),
    {
      name: 'authState', // unique name
      getStorage: () => AsyncStorage, // (optional) by default the 'localStorage' is used
    },
  ),
);
