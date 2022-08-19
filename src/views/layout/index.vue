<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-header style="height: auto">
          <Handler></Handler>
          <!--          <el-menu-->
          <!--              :default-active="activeIndex"-->
          <!--              mode="horizontal"-->
          <!--              :ellipsis="false"-->
          <!--              @select="handleSelect"-->
          <!--          >-->
          <!--          </el-menu>-->
          <div style="display: flex;justify-content: space-around;align-items: center">
            <div style="width: 94%">
              <el-tabs
                  v-model="tabsMenuValue"
                  type="card"
                  style="height: 44px;padding: 0 0"
                  @tab-click="tabClick"
                  @tab-remove="tabRemove"
              >
                <el-tab-pane
                    v-for="item in tabsMenuList"
                    :closable="item.close"
                    :name="item.path"
                >
                  <template #label>
                    <el-icon v-if="item.icon">
                      <component :is="item.icon"></component>
                    </el-icon>
                    {{ item.title }}
                  </template>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div style="width: 6%">
              <el-dropdown trigger="click">
                <el-button type="primary" size="small">
                  <span>更多</span>
                  <el-icon class="el-icon--right">
                    <arrow-down/>
                  </el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="closeCurrentTab">关闭当前</el-dropdown-item>
                    <el-dropdown-item @click="closeOtherTab">关闭其他</el-dropdown-item>
                    <el-dropdown-item @click="closeAllTab">关闭所有</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </el-header>

        <el-main style="width: 100%">
          <section
              style="height:100%;width:100%;overflow-y:auto;overflow-x:hidden;border-radius: 4px;box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);var(--el-overlay-color-light)">
            <router-view v-slot="{ Component, route }">
              <transition appear name="fade-transform" mode="out-in">
                <keep-alive :include="cacheRoute">
                  <component :is="Component" :key="route.path">
                  </component>
                </keep-alive>
              </transition>
            </router-view>
          </section>
        </el-main>
        <el-footer>
          footer
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'layout',
};
</script>
<script setup>
import {MenuStore} from 'src/store/modules/menu';
import {TabsStore} from 'src/store/modules/tabs';
import {onMounted, ref, reactive, defineComponent, toRefs, computed, watch} from 'vue';
import API from 'src/common/api/index';
import {useRoute, useRouter} from 'vue-router';
import {ArrowRight} from '@element-plus/icons-vue';
import cacheRoute from 'src/router/cacheRouter';
import Menu from './menu/menu';
import Handler from './header/index';

const menuStore = MenuStore();
const tabsStore = TabsStore();
const tabsMenuList = computed(() => tabsStore.tabsMenuList);
console.log(tabsMenuList, 'tabsMenuList');
const tabsMenuValue = computed({
  get: () => {
    return tabsStore.tabsMenuValue;
  },
  set: val => {
    tabsStore.setTabsMenuValue(val);
  },
});
console.log(tabsMenuValue, 'tabsMenuValue');

const route = useRoute();
const router = useRouter();

const userName = ref('');
let menList = ref([]);
const activeIndex = ref('0');
const isCollapse = computed(() => menuStore.isCollapse);
const matched = computed(() => route.matched.filter(item => item?.meta?.title && item?.meta?.title !== '首页'));

onMounted(async () => {
  const res = await API.get('/geeker/menu/list');
  const mockList = [...Array(6)].map(item => {
    return {
      ...res.data[3],
    };
  });
  menList.value = [...res.data, ...mockList];
  /* defaultActive.value = menList.value.reduce((pre, cur) => {
     if (cur.path.indexOf(route.path) > -1) {
       pre = cur.path;
     }
     return pre;
   }, '');*/

});
const tabClick = (TabsPaneContext) => {
  const {name: path} = TabsPaneContext.props;
  router.push(path);

};

const tabRemove = (TabPanelName) => {
  tabsStore.tabRemove(TabPanelName);
};
const closeCurrentTab = () => {
  console.log(route);
  debugger
  if (route.path === '/home/index') return;
  tabsStore.tabRemove(route.path);
};
const closeOtherTab = () => tabsStore.closeOtherTab(route.path);
const closeAllTab = () => tabsStore.closeAllTab();
watch(
    () => route.path,
    () => {
      const params = {
        title: route?.meta?.title,
        close: true,
        path: route?.meta?.title !== '首页' ? route.path : '/home/index',
      };
      tabsStore.addTabs(params);
    },
    {
      immediate: true,
    },
);
</script>

<style scoped lang="less">
.common-layout {
  height: 100%;
}

.el-container {
  display: flex;
  width: 100%;
  min-width: 970px;
  height: 100%;

  .el-aside {
    width: auto;
    overflow: inherit;

    .el-scrollbar {
      height: calc(100% - 56px);

      ::-webkit-scrollbar {
        background-color: rgba(106, 106, 196, 0.98);
      }

      .el-menu {
        min-width: 160px;
        overflow: auto;
        overflow-x: hidden;
      }
    }
  }
}


</style>