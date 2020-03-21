import AsyncStorage from '@react-native-community/async-storage';

import ImmutablePersistenceTransform from './ImmutablePersistenceTransform';

export default {
  key: '@covid19ap',
  storage: AsyncStorage,
  whitelist: ['user'],
  transforms: [ImmutablePersistenceTransform],
};
