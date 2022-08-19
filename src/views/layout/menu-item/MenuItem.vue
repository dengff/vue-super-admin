<template>
  <template v-for="subItem in menList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="subItem.path">
      <template v-slot="title">
        <el-icon>
          <component :is="subItem.icon"></component>
        </el-icon>
        <span>{{ subItem.title }}</span>
      </template>
      <!--      <MenuItem :menList="subItem.children"/>-->
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path">
      <el-icon>
        <component :is="subItem.icon"></component>
      </el-icon>
      <template v-if="!subItem.isLink" #title>
        <span>{{ subItem.title }}</span>
      </template>
      <template v-else #title>
        <a class="href" :href="subItem.isLink" target="_blank">{{ subItem.title + subItem.isLink }}</a>
      </template>
    </el-menu-item>
  </template>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({name: 'MenuItem'});
</script>
<script setup>
// TODO 转为jsx待尝试 -> v-slots 使用问题
import {onMounted} from 'vue';

const props = defineProps({
  menList: {
    type: Array,
    default: () => ([]),
  },
  title: String,
});

onMounted(() => {
});
</script>

<style scoped lang="less">
</style>