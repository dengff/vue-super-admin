<template>
 <div style="padding: 12px">
   <el-tabs v-model="activeName" class="demo-tabs" @tab-click="()=>{}">
     <el-tab-pane label="Schema Json" name="Schema">
       <SchemaDynForm></SchemaDynForm>
     </el-tab-pane>
     <el-tab-pane label="Template" name="Template">
       <TemplateDynForm></TemplateDynForm>
     </el-tab-pane>
   </el-tabs>
 </div>
</template>


<script setup>
import {ref} from 'vue';
import SchemaDynForm from './components/schema-dynForm/schema-dynForm';
import TemplateDynForm from './components/template-dynForm/template-dynForm';

const activeName = ref('Template');

</script>