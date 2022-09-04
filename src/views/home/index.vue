<template>
  <div>
    <!--    <div>home page</div>-->
    <!--        <demo></demo>-->
    <el-row class="page-home">
      <el-card class="box-card" shadow="never" v-for="item in  menuLists">
        <template #header>
          <el-row justify="space-between">
            <el-link type="primary" :icon="item.icon">{{ item.title }}</el-link>
          </el-row>
        </template>
        <el-row style="display: grid;grid-template-rows: 1fr;grid-template-columns: repeat(4,1fr);grid-row-gap: 12px">
          <div v-for="cur in item.children">
            <el-button>
              <el-icon>
                <component :is="cur.icon"></component>
              </el-icon>
              {{ cur.title || 'ceshi' }}
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
import {menuList} from 'src/common/service/JSON';

export default defineComponent({
  components: {
    demo,
  },
  setup() {
    const Edit = resolveComponent('Edit');
    const Grid = resolveComponent('Grid');
    // const menuLists = reactive(menuList);
    const menuLists = menuList.filter(item=>item.children)
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