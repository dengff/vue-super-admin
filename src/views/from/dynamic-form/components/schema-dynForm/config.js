/*interface IFormState {
  editable?: boolean
  readOnly?: boolean
  disabled?: boolean
  readPretty?: boolean
  hidden?: boolean
  visible?: boolean
  initialized?: boolean
  validating?: boolean
  submitting?: boolean
  modified?: boolean
  pattern?: FormPatternTypes
  display?: FormDisplayTypes
  values?: any
  initialValues?: any
  mounted?: boolean
  unmounted?: boolean
  readonly valid?: boolean
  readonly invalid?: boolean
  readonly errors?: IFormFeedback[]
  readonly warnings?: IFormFeedback[]
  readonly successes?: IFormFeedback[]
}*/

export const schemaConfig = {
  type: 'object',
  properties: {
    grid: {
      'x-component': 'FormGrid',
      type: 'void',
      'x-component-props': {maxColumns: [4], columnGap: 16},
      properties: {
        Input: {
          type: 'string',
          'title': 'Input 输入框',
          'x-component': 'Input',
          'x-decorator': 'FormItem',
        },
        DatePicker: {
          type: 'string',
          'title': 'DatePicker 日期选择器',
          'x-component': 'DatePicker',
          'x-decorator': 'FormItem',
          default: '',
          'x-reactions': {
            dependencies: ['DatePickerDateTimeRange'],
            fulfill: {
              state: {
                disabled: '{{$self.value = $deps[0]}}',
              },
            },
          },
        },
        DatePickerDateTimeRange: {
          // 被动关联 Input
          type: 'string',
          'title': 'DatePicker 日期范围选择器',
          'x-component': 'DatePicker',
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            tooltip: 'DatePicker 日期范围选择器',
            // labelWidth: 120,
            tooltipLayout: 'text',
          },
          default: '',
          'x-component-props': {
            type: 'datetimerange',
          },
          'x-reactions': {
            dependencies: ['Input'],
            fulfill: {
              state: {
                // disabled: '{{$deps[0] !== \'1\'}}',
              },
            },

          },
        },
        Upload: {
          type: 'array',
          'title': 'Upload 上传',
          'x-component': 'Upload',
          'x-component-props': {
            action: 'https://formily-vue.free.beeceptor.com/file',
            textContent: '点击上传',
            'show-file-list': false,
            // drag: true,
          },
          'x-decorator': 'FormItem',
          default: '',

        },
        TimePicker: {
          type: 'string',
          'title': 'TimePicker 时间',
          'x-component': 'TimePicker',
          'x-decorator': 'FormItem',
          'x-component-props': {
            // 'is-range': true,
          },
          default: '',
        },
        radio: {
          // 主动关联 Upload
          type: 'number',
          title: '单选 Upload隐藏',
          enum: [
            {
              label: '显示 Upload',
              value: 1,
            },
            {
              label: '隐藏 Upload',
              value: 2,
            },
          ],
          'x-decorator': 'FormItem',
          'x-component': 'Radio.Group',
          'x-component-props': {
            optionType: 'button',
          },
          default: 1,
          'x-reactions': {
            target: 'Upload',
            'when': '{{$self.value ===2}}',
            fulfill: {
              state: { // initialValues
                display: 'none',
              },
            },
            otherwise: {
              state: {
                display: 'visible',
              },
            },
          },
        },
        selectComponent: {
          type: 'string',
          'title': 'Select Component',
          'x-component': 'Select',
          'x-decorator': 'FormItem',
          enum: [
            {label: 'Desc_1', value: 1},
            {label: 'Desc_2', value: 2},
          ],
          // default: 1,
        },
        checkboxGroup: {
          type: 'array',
          title: '复选',
          'x-decorator': 'FormItem',
          'x-component': 'Checkbox.Group',
          default: [1],
          enum: [
            {
              label: '选项1',
              value: 1,
            },
            {
              label: '选项2',
              value: 2,
            },
          ],
        },
        switch: {
          // 主动关联 checkboxGroup
          type: 'boolean',
          title: '控制复选开关',
          'x-decorator': 'FormItem',
          'x-component': 'Switch',
          'x-reactions': {
            'target': 'checkboxGroup',
            'when': '{{$self.value === true}}',
            fulfill: {
              'state': {
                editable: true,
              },
            },
            'otherwise': {
              'state': {
                editable: false,
              },
            },
          },
        },
        asyncSelect:{
          type:'string',
          title:'异步选择',
          "x-decorator": 'FormItem',
          'x-component': 'Select',
          'x-reactions':['{{useAsyncDataSource1(loadData)}}'] // 异步联动数据
        }
      },
    },

  },
};
