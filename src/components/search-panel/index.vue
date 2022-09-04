<template>
  <div class="search-panel">
    <FormProvider :form="form">
      <SchemaField
          :schema="{
          type: 'object',
          properties: {
            grid: {
              type: 'void',
              'x-component': 'FormGrid',
              'x-reactions': ['{{changeGridField}}'],
              'x-component-props': {
                maxColumns: props?.columnGap || [4],
                columnGap: props?.columnGap || 8,
              },
              properties: schemaConfig
            },
          },
        }"
          :scope="{changeGridField, ...props.scope }"/>
      <FormFooter/>
    </FormProvider>
  </div>
</template>
<script setup lang="jsx">
import {createForm} from '@formily/core';
import {createSchemaField, FormProvider} from '@formily/vue';
import {Checkbox, FormButtonGroup, FormGrid, FormItem, Input, Reset, Select, Submit} from '@formily/element-plus';
import {observable} from '@formily/reactive';
import {defineComponent, defineEmits, ref} from 'vue';

const form = createForm();
const props = defineProps({
  scope: {
    type: Object,
    default: () => {
    },
  },
  schemaConfig: {
    type: Object,
    default: () => {
    },
  },
  maxRows: {
    type: Number,
    default: Infinity,
  },
  isSearch: {
    type: Boolean,
    default: true,
  },

});
const emit = defineEmits(['handleSubmit']);
let curField = null;
let expanded = ref(false);
const changeGridField = (field, form) => {
  if (!field) return;
  const fieldState = field.getState();
  field.setComponentProps(
      {
        shouldVisible: (node, grid) => {
          if (field.maxRows === Infinity) return true;
          return node.shadowRow < props.maxRows + 1;
        },
      });
  curField = field;

};
const handleToggle = () => {
  if (curField.maxRows === Infinity) {
    curField.maxRows = props.maxRows;
  } else {
    curField.maxRows = Infinity;
  }
  expanded.value = curField.maxRows === Infinity;
  changeGridField(curField);
};

const handleSubmit = (formVal) => {
  emit('handleSubmit', formVal);
};
const FormFooter =
    defineComponent({
      setup(formFooterProps, ctx) {
        return () => props.isSearch && <FormButtonGroup align="right" align-right>
          <Submit onSubmit={handleSubmit}>搜索</Submit>
          <Reset validate forceClear>重置</Reset>
          {props.maxRows &&
              <el-button onClick={handleToggle}>
                {expanded.value ? '收起' : '展开'}
              </el-button>
          }
        </FormButtonGroup>;
      },

    });
const {SchemaField} = createSchemaField({
  components: {
    FormItem,
    FormGrid,
    Input,
    Select,
    Checkbox,
    FormFooter,
  },
});

</script>

<style scoped>
.search-panel {
  padding: 12px;
}
</style>
