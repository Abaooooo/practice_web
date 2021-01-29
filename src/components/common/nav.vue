<template>
  <div class="nav_box">
    <ul class="list">
      <div class="nav">
        <router-link to="/home">首页</router-link>
        <router-link to="/newpro">最新产品</router-link>
        <router-link to="/message">疫情资讯</router-link>
        <router-link to="/about">关于我们</router-link>
        <router-link to="/connect">联络我们</router-link>
      </div>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.nav_box {
  width: 1920px;
  height: 50px;
  background: #cdb93b;

  .list {
    width: 1250px;
    height: 50px;
    margin: 0 auto;
    padding-left: 25px;
    line-height: 50px;
    text-align: left;
    a {
      float: left;
      margin-right: 65px;
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>
