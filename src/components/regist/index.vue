<template>
  <div class="login_regist_box">
    <div class="header"><a href="/home">主页</a> >> 会员注册</div>
    <div class="main">
      <div>
        <h4>会员登录</h4>
        <div class="desc">如果您有一个账户,请使用您的电子邮件地址登录</div>
        <template v-if="type == 1">
          <label for="account">邮箱 / 手机号 / 小米ID</label>
          <div class="inputBox">
            <input type="text" class="account" v-model="account" />
          </div>
          <label for="password">密码</label>
          <div class="inputBox">
            <input type="text" class="password" v-model="password" />
          </div>
        </template>
        <template v-else>
          <label for="account">手机号码 </label>
          <div class="inputBox">
            <input type="tel" class="account" v-model="account" />
          </div>
          <label for="password">短信验证码</label>
          <div class="inputBox">
            <input type="password" class="password" v-model="password" />
          </div>
        </template>
        <div class="btn">
          <button class="submit" @click="toLogin">
            {{ type == 1 ? "登录" : "立即登录/注册" }}
          </button>
          <span class="handle">
            <a @click="changeType">{{
              type == 1 ? "手机短信登录 / 注册" : "用户名密码登录"
            }}</a>
            |
            <a href="/regist" v-if="type == 1">立即注册</a>
            <a href="" v-else>获取验证码</a>
            |
            <a href="" v-if="type == 1">忘记密码</a>
            <a href="" v-else>收不到验证码</a>
          </span>
        </div>
      </div>
      <div class="regist">
        <div>
          <h4>注册会员</h4>
          <div class="desc">如果没有账户,请点击创建,成为本网站的会员</div>
          <button class="submit">创建账户</button>
        </div>
        <div>
          <h4>非牟利机构注册会员</h4>
          <div class="desc">
            成为本网站非牟利机构会员,每月可免费领取一定数量的口罩
          </div>
          <button class="submit">创建账户</button>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="copyright">
        Copyright © 2020 LS. All Rights Reserved.
        <span class="service">
          <span>服务条款</span>|<span>免责声明</span>|<span>私隐政策</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homePage",
  data() {
    return {
      type: 1,
      account: "",
      password: "",
    };
  },
  methods: {
    changeType() {
      this.type = this.type == 1 ? 2 : 1;
      this.account = this.password = "";
    },
    toLogin() {
      if (!this.account || !this.password) {
        this.$alert("所有项不能为空", "温馨提示", {
          confirmButtonText: "确定",
        });
      }
    },
  },
};
</script>

<style lang="less">
@import url("../../assets/login-regist.less");
</style>
