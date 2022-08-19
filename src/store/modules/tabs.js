import {defineStore} from 'pinia';
import piniaPersistConfig from 'src/config/piniaPersist';
import router from 'src/router/index';

export const TabsStore = defineStore({
  id: 'TabsStore',
  state: () => ({
    tabsMenuList: [
      {
        title: '首页',
        path: '/home/index',
        icon: 'home-filled',
        close: false,
      }],
    tabsMenuValue: '/home/index',

  }),
  actions: {
    addTabs(tabItem) {
      this.setTabsMenuValue(tabItem.path);
      if (tabItem.title === '首页') return;
      if (this.tabsMenuList.every(item => item.path !== tabItem.path)) {
        this.tabsMenuValue = tabItem.path;
        console.count('ceshu');
        this.tabsMenuList.push(tabItem);
      }
      router.push(tabItem.path);
    },
    tabRemove(currentPath) {
      const tabsMenuList = this.tabsMenuList;
      let tabsMenuValue = this.tabsMenuValue;
      if (currentPath === tabsMenuValue) {
        tabsMenuList.forEach((item, index) => {
          if (currentPath !== item.path) return;
          const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
          if (!nextTab) return;
          tabsMenuValue = nextTab.path;
          router.push(nextTab.path);
        });
      }
      this.tabsMenuValue = tabsMenuValue;
      this.tabsMenuList = tabsMenuList.filter(
        item => item.path !== currentPath);
    },
    closeOtherTab(currentPath) {
      const tabsMenuList = this.tabsMenuList;
      this.tabsMenuList = tabsMenuList.filter(
        item => item.path === currentPath || item.title === '首页',
      );
    },
    closeAllTab() {
      const tabsMenuList = this.tabsMenuList;
      this.tabsMenuList = tabsMenuList.filter(
        item => item.title === '首页',
      );
      router.push('/home/index');
      // 关闭所有 重置
      this.tabsMenuValue = '/home/index';
    },
    setTabsMenuValue(tabsMenuValue) {
      this.tabsMenuValue = tabsMenuValue;
    },
  },
  getters: {},
  persist: piniaPersistConfig('TabsStore'),
});