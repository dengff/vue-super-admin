<template>
  <div style="width: 100%">
    <!--    <GridLayout
            direction="horizontal"
            center
            columns="3"
            rows="5"
            gap="4"
            gridTable="true"
            :gridStyle="gridStyle"
        >
          <el-button v-for="i in 13"><span style="color: #42b983">GridLayout{{ i }}</span></el-button>
        </GridLayout>
        <div style="padding: 12px 0"></div>
        <GridLayout
            direction="vertical"
            center
            columns="4"
            rows="6"
            gap="4"
            :gridStyle="gridStyle"
        >
          <el-button size="small" round v-for="i in 20"><span style="color: #070748">GridLayout{{ i }}</span></el-button>
        </GridLayout>-->
    <div style="padding: 12px 0"></div>
    <GridLayout gridTable="true" columns="3">
      <Cell
          v-for="i in 8"
          align="center"
          justify="center"
          :row-span="i===1?2:1"
          :column-span="1"
          :colorStyle="'red'">
        <span>Cell Tag{{ i }}</span>
      </Cell>
    </GridLayout>
    <div style="padding: 12px 0"></div>
    <GridLayout columns="3" direction="horizontal" gridTable="true">
      <Cell
          justify="center"
          align="center"
          v-for="i in 8"
          :row-span="i===1?2:1"
          :column-span="1"
          gridTable="true"
          :colorStyle="'red'">
        <GridLayout columns="3" rows="4" direction="horizontal">
          <Cell
              justify="center"
              align="center"
              v-for="i in 8"
              :row-span="i===1?2:1"
              :column-span="1"
              :colorStyle="'red'">
            <div class="test_grid" style="min-width: 20px;min-height: 40px"><span style="color: #42b983">GridLayout horizontal{{
                i
              }}</span></div>
          </Cell>
        </GridLayout>
      </Cell>
    </GridLayout>
    <div style="padding: 12px 0"></div>

    <GridLayout columns="3" rows="3" direction="vertical">
      <Cell
          justify="center"
          align="center"
          v-for="i in 8"
          :row-span="i===1?2:1"
          :column-span="1"
          gridTable="true"
          :colorStyle="'red'">
        <el-button size="small" round><span style="color: #070748">GridLayout vertical{{ i }}</span></el-button>
      </Cell>
    </GridLayout>


    <Test :testProps="'文字'" innerText="测试文字">
      <el-button>测试按钮1</el-button>
      <el-button>测试按钮2</el-button>
    </Test>
  </div>
</template>

<script setup>
import {reactive} from 'vue';
import {Cell, GridLayout, Test} from '../../components/grid-layout/index';

const gridStyle = reactive({
  border: '1px solid #ccc',
});
</script>
<style scoped lang="less">
/*.test_grid{
  position: relative;
}
.test_grid :after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 0.5px solid red;
  margin: 0 -1px -1px 0;
}*/
</style>