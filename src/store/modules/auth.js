import {defineStore} from 'pinia';
import piniaPersistConfig from 'src/config/piniaPersist';

export const AuthStore = defineStore({
  id: 'AuthStore',
  state: () => ({}),
  actions: {},
  getters: {},
  persist: piniaPersistConfig('AuthStore'),
});