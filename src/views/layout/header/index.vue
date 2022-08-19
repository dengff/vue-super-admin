<template>
  <div style="height:50px;width:100%;display: grid;grid-template-columns: 40% auto 30%">
    <Breadcrumb></Breadcrumb>
    <div class="flex-grow" style="flex-grow: 1;"/>
    <div style="display: flex;justify-content: space-around;align-items: center">
      <Theme></Theme>
      <div index="1">Processing Center</div>
      <span class="user-name">{{ userName || 'IS _KEVE' }}</span>
      <img src="../../../static/img/admin-logo.jpeg" style="width: 6%;height: 45%">
    </div>
  </div>


</template>

<script>
export default {
  name: 'Header',
};
</script>
<script setup>
import Theme from './components/theme';
import Breadcrumb from './components/breadcrumb';
import {ref} from 'vue';

const userName = ref('');
</script>

<style scoped>

</style>