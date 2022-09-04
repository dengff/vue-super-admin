<template>
  <div>
    <FormProvider :form="form" style="padding: 12px">
      <SchemaField :schema="schema" :scope="{ useAsyncDataSource1, loadData }"/>
      <GridLayout>
        <cell justify="end">
          <FormButtonGroup align-right>
            <Submit @submit="handleSubmit">提交</Submit>
            <Reset validate forceClear>重置</Reset>
            <el-button @click="handleChange">切换</el-button>
          </FormButtonGroup>
        </cell>
      </GridLayout>
    </FormProvider>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import {GridLayout, Cell} from '../../../../../components/grid-layout';
import {createForm} from '@formily/core';
import {FormProvider, Field, createSchemaField} from '@formily/vue';
import {action} from '@formily/reactive';
// TODO reactions/x-reactions 适合用在字段变更比较少逻辑简单直接单独设置  effects  --> 大批量字段修改或者 相同字段需要共同的逻辑处理时
/*
  纯源码模式
  字段数量庞大，逻辑复杂，优先选择 effects 中定义逻辑
  字段数量少，逻辑简单，优先选择 reactions 中定义逻辑
  Schema 模式
  不存在异步逻辑，优先选择结构化 reactions 定义逻辑
  存在异步逻辑，或者大量计算，优先选择函数态 reactions 定义逻辑
  * */
import {
  Input,
  TimePicker,
  Select,
  Upload,
  FormLayout,
  Radio,
  FormItem,
  FormGrid,
  DatePicker,
  PreviewText,
  Submit,
  Checkbox,
  Reset,
  FormButtonGroup,
  Switch,
} from '@formily/element-plus';
import {schemaConfig} from './config';

const useAsyncDataSource = (service) => (field) => {
  console.log(field,'field');
  field.loading = true;
  service(field).then(
      action.bound((data) => {
        field.dataSource = data;
        field.loading = false;
      }),
  );
};

const useAsyncDataSource1 = function(service){
  return (field) =>{
    field.loading = true;
    service(field).then(
        action.bound((data) => {
          field.dataSource = data;
          field.loading = false;
        }),
    );
  }

}
const loadData = async (field) => {
  const linkage = field.query('selectComponent').get('value');
  if (!linkage) return [];
  return new Promise((resolve) => {
    setTimeout(() => {
      if (linkage === 1) {
        resolve([
          {
            label: 'AAA',
            value: 'aaa',
          },
          {
            label: 'BBB',
            value: 'ccc',
          },
        ]);
      } else if (linkage === 2) {
        resolve([
          {
            label: 'CCC',
            value: 'ccc',
          },
          {
            label: 'DDD',
            value: 'ddd',
          },
        ]);
      }
    }, 2500);
  });
};
const schema = schemaConfig;
const GridColumn = FormGrid.GridColumn;

const handleChange = () => {
  console.log(form, 'form');
  form.setState((state) => {
    console.log(state, 'state');
    state.readPretty = !state.readPretty;
  });
};
const handleSubmit = (v) => {
  console.log(v, 'val');
};
const {SchemaField} = createSchemaField({
  components: {
    FormItem,
    FormGrid,
    PreviewText,
    Radio,
    Input,
    Select,
    Checkbox,
    Upload,
    TimePicker,
    Switch,
    DatePicker,
  },

});
const form = createForm();

onMounted(() => {

  console.log(form, 'form');

});
</script>