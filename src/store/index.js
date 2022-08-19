import {defineStore, createPinia} from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import piniaPersistConfig from '../config/piniaPersist';

export const GlobalStore = defineStore({
  id: 'GlobalStore',
  state: () => ({

    themeConfig: {
      // 默认 primary 主题颜色
      primary: '#409EFF',
      isWeak: false,
      isGrey: false,
      isDark: false,
    },

  }),
  actions: {
    setThemeConfig(key, value) {
      this.themeConfig[key] = value;
    },
  },
  getters: {},
  persist: piniaPersistConfig('GlobalStore'),
});
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
export default pinia;
