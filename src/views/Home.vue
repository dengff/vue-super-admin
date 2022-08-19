<template>
  <div class="home">
    <div>
      test
    </div>
    <el-row class="mb-4">
      <el-button disabled>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success" disabled>Success</el-button>
      <el-button type="info" disabled>Info</el-button>
      <el-button type="warning" disabled>Warning</el-button>
      <el-button type="danger" disabled>Danger</el-button>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
