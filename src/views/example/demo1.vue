<script lang="jsx">
/*
* .vue 文件需要在script 加上lang="jsx"
* .jsx 文件 可直接导出当前组件
*
* SCM 集成vite 存在的问题 .vue文件里边有
* 1、@装饰器
* 2、render 函数jsx 解析 存在问题 可能需要在 <script> 标签上加上lang="jsx"
*   3、export 导出报错 带尝试加入.vue
* SCM 使用esbuild-loader 优化存在的问题不识别 render h函数编译报错 可能需要添加额外的配置文件 让他识别h 吧？？
* */
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Test',
  setup() {
    return () =>
        <div class="test-demo"> ceshi</div>;

  },
});
</script>

<style scoped lang="less">
.test-demo {
  color: rgba(152, 34, 171, 0.71);
}

</style>