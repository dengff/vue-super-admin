import {
  defineComponent,
  reactive,
  getCurrentInstance,
  computed,
  provide,
  inject,
} from 'vue';
import {frGetter} from './utils';

export const GridLayout = defineComponent({
  name: 'GridLayout',
  /*
    const mergedStyle = {
    display: "grid", // 布局是grid布局
    height, // 设置容器高度
    gridAutoFlow: flow, // 设置容器内元素是从左往右（默认），还是从右往左
    gridAutoRows: autoRows(minRowHeight), // grid-auto-rows设置默认单元格高度
    gridTemplateRows: frGetter(rows), // 当传递一个数字时，它是指定行数的简写，平分高度，自适应。如果是例如100px，就是以这个数值为宽度
    gridTemplateColumns: frGetter(columns), // 当传递一个数字时，它是指定列数的简写，平分宽度，自适应。 默认值为 12，如果是例如100px，就是以这个数值为宽度
    columnGap, // 设置每个子元素之间列的间距
    rowGap, // 设置每个子元素之间行的间距
    areas: formatAreas(areas), // 传递一个字符串数组，例如 [“a a”，“b c”]。 默认不提供。
    justifyContent, // 决定整个内容区域在容器里面的水平位置(左中右)
    gridGap: gap, // 设置每个子元素之间的间距，默认8px
    alignContent, // 决定整个内容区域的垂直位置(上中下)
    ...style
  };*/
  // maxWidth minWidth
  props: {
    gridStyle: {
      type: Object,
      default: () => {
      },
    },
  },
  setup(props, {attrs, emit, slots}) {
    /*
    * columnGap -->设置每个元素的列间距
    * rowGap --> 设置每个元素的行间距
    * direction ---> 设置布局横向或纵向 默认horizontal 可选 vertical
    * columns ---> 生成的列数 默认等宽
    * rows ---> 指定生成的行数 默认等高
    * gridTable --> 是否生成表格线条
    * gap ---> 设置每个元素的间距 默认 0
    * */
    const {
      height = 'auto',
      columnGap = 0,
      rowGap = 0,
      direction = 'horizontal',
      columns = 1,
      rows,
      gap = 0,
      gridTable,
    } = attrs;
    provide('gridLayout', {gridTable});
    const isGridTable = (gridTable) => {
      if (gridTable) return {
        border: '1px solid #000000',
        'border-bottom': 'none',
        'border-right': 'none',
      };
    };
    const gridStyle = reactive({
      display: 'grid',
      height,
      columnGap: columnGap + 'px',
      rowGap: rowGap + 'px',
      gap: gap + 'px',
      gridAutoFlow: direction === 'vertical' ? 'column' : 'row',
      gridTemplateColumns: frGetter(columns),
      gridTemplateRows: frGetter(rows),
      ...isGridTable(gridTable),
      ...props.gridStyle,
    });
    return () => <div style={gridStyle}>
      {slots.default && slots.default()}
    </div>;
  },
});
export const Cell = defineComponent({
  name: 'Cell',
  props: {
    rowSpan: {
      type: [String, Number],
      default: 1,

    },
    columnSpan: {
      type: [String, Number],
      default: 1,
    },
    cellStyle: {
      type: Object,
      default: () => {
      },
    },
  },
  setup(props, {slots, emit, attrs}) {
    const {justify, align} = attrs;
    const _vm = getCurrentInstance();//获取当前组件实例
    const {gridTable} = inject('gridLayout');
    const gridTableStyle = computed(() => {
      if (gridTable) return {
        border: '1px solid #000000',
        borderTop: 'none',
        borderLeft: 'none',
      };
    });
    /*const gridTableStyle = computed(() => {
      let parent = _vm.parent;
      while (parent && parent.type.name !== 'GridLayout') {
        parent = parent.parent;
      }
      return parent.attrs?.gridTable ? {
        border: '1px solid #000000',
        borderTop: 'none',
        borderLeft: 'none',
      } : {};
    });*/
    const cellStyle = reactive({
      height: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      gridColumnEnd: `span ${props.columnSpan}`,
      gridRowEnd: `span ${props.rowSpan}`,
      justifyContent: justify || 'start',
      alignItems: align || 'top',
      justifySelf: 'stretch',
      ...gridTableStyle.value,
      ...props.cellStyle,
    });
    return () => <div style={cellStyle}>
      {slots?.default()}
    </div>;
  },
});

export const Test = (props, {attrs, slots, emit}) => {
  return <div>{slots?.default()}</div>;
};