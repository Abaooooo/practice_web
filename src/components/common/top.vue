<template>
  <div class="mi_top">
    <div class="nav">
      <div class="language">
        <span>繁体</span>|
        <span>English</span>
      </div>
      <div class="user">
        <span>user <i class="iconfont icon-user"></i></span>|
        <span>购物车 <i class="iconfont icon-cart"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    
  },
};
</script>

<style lang="less">
.mi_top {
  width: 1920px;
  height: 50px;
  margin: 0 auto;
  background: #303030;
  .nav {
    width: 1250px;
    height: 50px;
    margin: 0 auto;
    font-size: 16px;
    line-height: 50px;
    color: #fff;
    .language {
      float: left;
    }
    .user {
      float: right;
      span {
        margin: 0 10px;
      }
    }
  }
}
</style>
