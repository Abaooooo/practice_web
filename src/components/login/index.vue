<template>
  <div class="login_regist_box">
    <div class="header"><a href="/home">主页</a> >> 会员登录</div>
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
            <input type="text" class="password" v-model="password" />
            <a @click="sendCode" :class="isRun ? 'noClick' : ''">{{
              isRun ? `重新发送(${runtime})` : "获取验证码"
            }}</a>
          </div>
        </template>
        <div class="btn">
          <button class="submit" @click="toLogin">
            {{ type == 1 ? "登录" : "立即登录" }}
          </button>
          <span class="handle">
            <a @click="changeType">{{
              type == 1 ? "手机短信登录" : "用户名密码登录"
            }}</a>
            |
            <a href="/regist">立即注册</a>
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
import { getCode, checkCode, checkPhone, login } from "../../api/api";
import encode from "@/util/encode";
export default {
  name: "loginPage",
  data() {
    return {
      type: 2,
      account: "",
      password: "",
      isRun: false,
      runtime: 30,
      timer: null,
    };
  },
  methods: {
    changeType() {
      this.type = this.type == 1 ? 2 : 1;
      this.account = this.password = "";
    },
    sendCode() {
      if (this.isRun) return;
      if (!this.account) {
        this.$alert("手机号不能为空", "温馨提示", {
          confirmButtonText: "确定",
        });
        return;
      }
      let time = +new Date(getCode(this.account)) + 30000;
      this.isRun = true;
      this.timer = setInterval(() => {
        let current = +new Date(),
          running = time - current;
        if (running > 0) {
          this.runtime--;
        } else {
          this.isRun = false;
          this.runtime = 30;
          clearInterval(this.timer);
          this.timer = null;
          return;
        }
      }, 1000);
    },
    async toLogin() {
      // check null
      if (!this.account || !this.password) {
        this.$alert("所有项不能为空", "温馨提示", {
          confirmButtonText: "确定",
        });
        return;
      }
      // check phone 12312312311
      let resPhone = await checkPhone(this.account);
      if (resPhone.code != 0) {
        this.$confirm("当前手机号未注册，是否前往注册", "温馨提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            this.$router.push("/regist");
          })
          .catch(() => {});
        return;
      }
      // check code
      if (this.type == 2) {
        let resCode = await checkCode({
          phone: this.account,
          code: this.password,
        });
        if (resCode.code != 0) {
          this.$alert("验证码有误", "温馨提示", {
            confirmButtonText: "确定",
          });
          return;
        }
      }
      // check login
      if (this.type == 1) this.password = encode(this.password);
      let resLogin = await login({
        account: this.account,
        password: this.password,
        type: this.type,
      });
      if (resLogin.code != 0) {
        this.$alert("信息有误，请重新确认哦", "温馨提示", {
          confirmButtonText: "确定",
        });
        return;
      }
      let userInfo = { time: +new Date(), data: resLogin.data };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      this.$store.commit("updateUserInfo", userInfo);
      this.$router.replace("/home");
    },
  },
};
</script>

<style lang="less">
@import url("../../assets/login-regist.less");
</style>
