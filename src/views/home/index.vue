<template>
  <div>
    <!--    <div>home page</div>-->
    <!--        <demo></demo>-->
    <el-row class="page-home">
      <el-card class="box-card" shadow="never" v-for="item in  menuLists">
        <template #header>
          <el-row justify="space-between">
            <el-link type="primary" :icon="Edit">{{ item.menuName }}</el-link>
          </el-row>
        </template>
        <el-row style="display: grid;grid-template-rows: 1fr;grid-template-columns: repeat(3,1fr);grid-row-gap: 12px">
          <div v-for="cur in item.children">
            <el-button :icon="Grid">
              {{ cur.menuName || 'ceshi' }}
            </el-button>
          </div>
        </el-row>
      </el-card>
    </el-row>
  </div>
</template>


<script>
import {defineComponent, reactive, resolveComponent} from 'vue';
import demo from '../example/demo.jsx';
import {menuList} from 'src/common/api/JSON';

export default defineComponent({
  components: {
    demo,
  },
  setup() {
    const Edit = resolveComponent('Edit');
    const Grid = resolveComponent('Grid');
    const menuLists = reactive(menuList);
    console.log(menuLists, 'menuListsre');
    return {
      menuLists,
      Edit,
      Grid,
    };
  },
});

</script>

<style scoped lang="less">
.page-home {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}

</style>