<template>
  <div>
    <FormProvider :form="form">
      <FormGrid :maxColumns="4" :columnGap="16">
        <Field
            name="Input"
            title="Input 输入框"
            :component="[Input,{
              clearable: true,
              placeholder: '请输入'
            }]"
            :decorator="[FormItem]"
            initialValue=" "
        ></Field>
        <Field
            name="Select"
            title="Select Select组件"
            :component="[Select,{
              clearable: true,
              placeholder: '请输入',
              onClick:()=>{}
            }]"
            :decorator="[FormItem]"
            :data-source="[{
              label:'状态1',
              value:'1'
            },{
              label:'状态2',
              value:'2'
            },{
              label: '状态3',
              value:'3'
            },{
              label:'空字符',
              value:''
            }]"
        ></Field>
        <Field
            name="Switch"
            title="Switch 开关"
            :component="[Switch]"
            :decorator="[FormItem]"
        ></Field>
        <Field
            name="FilterSelect"
            title="级联选择"
            :component="[Select]"
            :decorator="[FormItem]"
        ></Field>
        <Field
            name="AsyncSelect"
            title="异步数据"
            :component="[Select]"
            :decorator="[FormItem]"
        ></Field>
        <Field
            name="AsyncSelect_1"
            title="异步联动 I"
            :component="[Select]"
            :decorator="[FormItem]"
        />
        <Field
            name="AsyncSelect_2"
            title="异步联动 II"
            :component="[Select]"
            :decorator="[FormItem]"
        />
        <Field
            name="FocusInput"
            ref="test"
            title="自动聚焦 Input"
            :decorator="[FormItem]"
            :component="[Input,{
              autofocus: true,
              onKeyup:handleEnder
            }]"
        />
        <Field
            name="blueInput"
            title="失去焦点 Input"
            :decorator="[FormItem]"
            ref="component"
            :component="[Input,{
              ref:'component',
              class:'component'
            }]"
        />
      </FormGrid>
      <FormButtonGroup align-form-item-justify-right>
        <Submit @submit="handleSubmit">提交</Submit>
        <Reset validate forceClear>重置</Reset>
        <el-button @click="()=>{}">切换</el-button>
      </FormButtonGroup>
    </FormProvider>
  </div>
</template>

<script setup>
import {FormProvider, Field} from '@formily/vue';
import {Switch, Select, Input, FormGrid, FormItem, FormButtonGroup, Submit, Reset} from '@formily/element-plus';
import {createForm, onFieldValueChange, onFieldInit, onFieldReact} from '@formily/core';
import {reactive, onMounted, ref} from 'vue';
import API from '../../../../../common/service/api';

const handleSubmit = (v) => {
  console.log(v, 'val');
};
let type = ref(false);
const component = ref();
const tag = document.querySelector('component');
onMounted(() => {
  console.log(component, 'component');
  console.log(tag, 'component');
});

const selDateSource = reactive([
  {
    label: '测试1',
    value: '1',
  }, {
    label: '测试2',
    value: '2',
  }, {
    label: '测试3',
    value: '3',
  },
]);
const getAsyncList = () => new Promise(resolve =>
    setTimeout(_ => {
          resolve([
            {
              value: '1',
              label: '异步数据_1',
            }, {
              value: '2',
              label: '异步数据_2',

            }, {
              value: '3',
              label: '异步数据_3',
            },
          ]);
        }, 1500,
    ),
);
const handleEnder = (pattern, fn) => {
  // onFieldReact('blueInput',()=>{

  // })
};
const form = createForm(
    {
      effects() {
        handleEnder('blueInput', (field) => {
          // field.setComponentProps({
          //   autofocus: true,
          // });
        });
        onFieldValueChange('Select', (field, form) => {
          form.setFieldState('*(Input)', (state) => {
            //对于初始联动，如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
            state.value = field.value;
          });
          form.setFieldState('Switch', (state) => {
            state.editable = field.value === '2';
          });
          form.setFieldState('FilterSelect', (state) => {
            state.value = null;
            state.dataSource = selDateSource.filter(item => field.value && item.value.indexOf(field.value) > -1);
          });
          form.setFieldState('*(AsyncSelect_2,AsyncSelect_1)', (state) => { // 重置 target
            state.value = '';
          });
        });
        onFieldInit('AsyncSelect', async (field) => {
          const {data} = await API.POST_ENUM();
          field.dataSource = data.list;
        });
        onFieldReact('AsyncSelect_1', async (field) => {
          console.log(field.query('Select').take(), 'field.query(\'Select\')');
          const value = field.query('Select').value();
          const dataList = await getAsyncList();
          field.dataSource = dataList.filter(item => value && item.value.indexOf(value) > -1);
        });
        onFieldReact('AsyncSelect_2', async (field, form) => {
          field['disabled'] = true;
          const value = field.query('Select').value();
          if (!value) return;
          const dataList = await getAsyncList();
          field['disabled'] = false;
          field.dataSource = dataList.filter(item => !(value && item.value.indexOf(value) > -1));
        });

      },
    },
);

</script>

<style scoped>

</style>