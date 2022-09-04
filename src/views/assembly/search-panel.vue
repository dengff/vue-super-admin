<template>
  <div>
    <SearchPanel :maxRows="1" :schemaConfig="schemaConfig" @handleSubmit="handleSubmit"></SearchPanel>
  </div>
</template>
<script setup>
import SearchPanel from 'src/components/search-panel/index';
import {ElMessage} from 'element-plus';

const handleSubmit = (formVal) => {
  console.log(formVal, 'val');
  ElMessage.success('success');
};
const schemaConfig = {
  color: {
    type: 'string',
    'x-component': 'Input',
    'x-decorator': 'FormItem',
    title: 'color-Input',
  }, color1: {
    type: 'string',
    'x-component': 'Input',
    'x-decorator': 'FormItem',
    title: 'color-Input',
  }, color2: {
    type: 'string',
    'x-component': 'Input',
    'x-decorator': 'FormItem',
    title: 'color-Input',
  }, color3: {
    type: 'string',
    'x-component': 'Input',
    'x-decorator': 'FormItem',
    title: 'color-Input',
  }, color4: {
    type: 'string',
    'x-component': 'Input',
    'x-decorator': 'FormItem',
    title: 'color-Input',
  }, color5: {
    type: 'string',
    'x-component': 'Input',
    'x-decorator': 'FormItem',
    title: 'color-Input',
  }, color6: {
    type: 'string',
    'x-component': 'Input',
    'x-decorator': 'FormItem',
    title: 'color-Input',
  }, color7: {
    type: 'string',
    'x-component': 'Input',
    'x-decorator': 'FormItem',
    title: 'color-Input',
  }, color8: {
    type: 'string',
    'x-component': 'Input',
    'x-decorator': 'FormItem',
    title: 'color-Input',
  }, color9: {
    type: 'string',
    'x-component': 'Input',
    'x-decorator': 'FormItem',
    title: 'color-Input',
  }, color10: {
    type: 'string',
    'x-component': 'Input',
    'x-decorator': 'FormItem',
    title: 'color-Input',
  }, color11: {
    type: 'string',
    'x-component': 'Input',
    'x-decorator': 'FormItem',
    title: 'color-Input',
  },

};


</script>

<style scoped>


</style>