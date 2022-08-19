<template>
  <div style="display: flex;align-items: center;gap: 20px">
    <el-icon class="collapse-icon" @click="menuStore.setCollapse()" style="cursor: pointer;font-size: 20px">
      <component :is="isCollapse ? 'expand' : 'fold'"></component>
    </el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in matched" :key="item.path" :to="item.path">
        {{ item.meta.title || '测试' }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="header-right">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
};
</script>

<script setup>

import {ArrowRight} from '@element-plus/icons-vue';
import {MenuStore} from '../../../../store/modules/menu';
import {computed, ref} from 'vue';
import {useRoute} from 'vue-router';

const route = useRoute();
const menuStore = MenuStore();

const isCollapse = computed(() => menuStore.isCollapse);
const matched = computed(() => route.matched.filter(item => item?.meta?.title && item?.meta?.title !== '首页'));


</script>

<style scoped>

</style>