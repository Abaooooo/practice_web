<template>
  <div class="mi_top">
    <div class="nav">
      <div class="language">
        <span>繁体</span>|
        <span>English</span>
      </div>
      <div class="user">
        <a @click="signInOrOut"
          >{{ userInfo.name || "user" }} <i class="iconfont icon-user"></i></a
        >|
        <a>购物车 <i class="iconfont icon-cart"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
import { signout } from "@/api/api";
export default {
  data() {
    return {};
  },
  methods: {
    signInOrOut(e) {
      if (e.target.textContent === "user") {
        this.$router.push("/login");
        return;
      }
      this.$confirm("是否确定退出登录", "温馨提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          let resSignout = await signout();
          if (resSignout.code == 0) {
            localStorage.removeItem("userInfo");
            this.$router.replace("/home");
          } else {
            this.$alert("网络繁忙", "温馨提示", {
              confirmButtonText: "确定",
            });
          }
        })
        .catch(() => {});
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
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
      a {
        margin: 0 10px;
      }
    }
  }
}
</style>
