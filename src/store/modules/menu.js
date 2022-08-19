import {defineStore} from 'pinia';
// import { MenuState } from "../interface";
import piniaPersistConfig from '../../config/piniaPersist';

// MenuStore
export const MenuStore = defineStore({
  id: 'MenuStore',
  state: () => ({
    // menu collapse
    isCollapse: false,
    // menu List
    menuList: [],
  }),
  getters: {},
  actions: {
    async setCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    async setMenuList(menuList) {
      this.menuList = menuList;
    },
  },
  persist: piniaPersistConfig('MenuStore'),
});
