<!--suppress JSValidateTypes -->
<template>

  <el-tooltip effect="dark" content="布局设置" placement="bottom">
    <span @click="handleShowDrawer">ZT</span>
  </el-tooltip>

  <el-drawer
      v-model="showDrawer"
      title="布局设置"
  >
    <el-divider>
      全局主题
    </el-divider>
    <el-row justify="space-between">
      <span>设置主题色</span>
      <el-color-picker v-model="themeConfig.primary" :predefine="predefineColors" @change="changePrimary"/>
    </el-row>
    <el-row justify="space-between">
      <span></span>
      <el-switch v-model="themeConfig.isDark" @change="switchDark"/>
    </el-row>
    <el-row justify="space-between">
      <span></span>
      <el-switch v-model="themeConfig.isGrey" @change="changeGreyOrWeak($event,'grey')"/>
    </el-row>
    <el-row justify="space-between">
      <span></span>
      <el-switch v-model="themeConfig.isWeak" @change="changeGreyOrWeak($event,'weak')"/>
    </el-row>

  </el-drawer>

</template>

<script>
export default {
  name: 'Theme',
};
</script>
<script setup>
import {computed, reactive, ref} from 'vue';
import {useTheme} from '../../../../hooks/useTheme';
import {GlobalStore} from '../../../../store';

const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

const {changePrimary, changeGreyOrWeak, switchDark} = useTheme();
const predefineColors = reactive([
  '#409EFF',
  '#DAA96E',
  '#00cf74',
  '#009688',
  '#27ae60',
  '#ff5c93',
  '#e74c3c',
  '#fd726d',
  '#f39c12',
  '#9b59b6']);

const showDrawer = ref(false);
const handleShowDrawer = () => showDrawer.value = true;
</script>

<style scoped>

</style>