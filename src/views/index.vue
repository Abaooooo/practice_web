<template>
  <div class="index_box">
    <my-top></my-top>
    <div class="logo">
      <img src="@/assets/logo.png" alt="" />
    </div>
    <my-nav></my-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import mytop from "../components/common/top";
import mynav from "../components/common/nav";
export default {
  components: {
    "my-top": mytop,
    "my-nav": mynav,
  },
};
</script>

<style lang="less">
.index_box {
  width: 100%;
  .logo {
    width: 100%;
    margin-top: 6px;
    img{
      display: block;
      width: 110px;
      height: 110px;
      padding: 20px;
      margin: 0 auto;
    }
  }
}
</style>
