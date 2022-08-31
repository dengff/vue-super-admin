<template>
  <div :style="{width:isCollapse?'56px':'210px'}" style="	display: flex;flex-direction: column;transition: all 0.3s ease;position: relative;
	height: 100%;">
    <div style="height: 56px;width:100%;display: flex;align-items: center;justify-content: space-around">
      <img src="../../../static/img/logo.9c5c7141.png" style="width: 50%;height: 100%;object-fit: contain">
      <span v-show="!isCollapse">SIX TEPNKJK</span>
    </div>
    <el-scrollbar>
      <el-menu
          router
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
      >
        <!--        <MenuItem :menList="menList"></MenuItem>-->
        <MenuItem :menList="menList"></MenuItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'Menu',
};
</script>
<script setup>
import MenuItem from '../menu-item/index';
// import MenuItem from '../menu-item/MenuItem';

import {computed, onMounted, ref} from 'vue';
import {MenuStore} from '../../../store/modules/menu';
import API from '../../../common/service/api';
import {useRoute} from 'vue-router';

const menuStore = MenuStore();
// let menList = ref([]);
const route = useRoute();
const title = ref('ceshibiaoti');

onMounted(async () => {
  const res = await API.GET_GEEKER_MENU_LIST();
  const mockList = [...Array(6)].map(item => {
    return {
      ...res.data[3],
    };
  });
  const menList = [...res.data];
  /*  defaultActive.value = menList.reduce((pre, cur) => {
      if (cur.path.indexOf(route.path) > -1) {
        pre = cur.path;
      }
      return pre;
    }, '');*/

  menuStore.setMenuList(menList);
  // console.log(menList, 'menList');

});
let defaultActive = computed(() => route.path);

const menList = computed(() => menuStore.menuList);
const isCollapse = computed(() => menuStore.isCollapse);

</script>
<style scoped>

</style>