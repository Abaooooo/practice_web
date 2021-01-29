<template>
  <div class="login_regist_box">
    <div class="header"><a href="/home">主页</a> >> 会员注册</div>
    <div class="main">
      <div>
        <h4>会员注册</h4>
        <label for="name">用户名</label>
        <div class="inputBox">
          <input type="text" name="name" v-model="name" />
        </div>
        <label for="phone">手机号码 </label>
        <div class="inputBox">
          <input type="tel" name="phone" v-model="phone" />
        </div>
        <label for="code">短信验证码</label>
        <div class="inputBox">
          <input type="text" name="code" v-model="code" />
          <a @click="getCode" :class="isRun ? 'noClick' : ''">{{
            isRun ? `重新发送(${runtime})` : "获取验证码"
          }}</a>
        </div>
        <label for="password">密码</label>
        <div class="inputBox">
          <input type="password" name="password" v-model="password" />
        </div>
        <label for="passwordPay">支付密码</label>
        <div class="inputBox">
          <input type="password" name="passwordPay" v-model="passwordPay" />
        </div>
        <div class="btn">
          <button class="submit" @click="toRegist">立即注册</button>
          <span class="handle">
            <a href="/login">已有账号，去注册</a>
          </span>
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
import { getCode, checkCode, checkPhone, register } from "@/api/api";
import encode from "@/util/encode";
export default {
  name: "homePage",
  data() {
    return {
      name: "",
      phone: "",
      code: "",
      password: "",
      passwordPay: "",
      isRun: false,
      runtime: 30,
      timer: null,
    };
  },
  methods: {
    async getCode() {
      if (this.isRun) return;
      if (!this.phone) {
        this.$alert("手机号不能为空", "温馨提示", {
          confirmButtonText: "确定",
        });
        return;
      }
      let time = +new Date(await getCode(this.phone)) + 30000;
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
    async toRegist() {
      if (
        !this.name ||
        !this.phone ||
        !this.code ||
        !this.password ||
        !this.passwordPay
      ) {
        this.$alert("所有项必填哦", "温馨提示", {
          confirmButtonText: "确定",
        });
        return;
      }
      let resCode = await checkCode({ phone: this.phone, code: this.code });
      if (resCode.code != 0) {
        this.$alert("验证码有误", "温馨提示", {
          confirmButtonText: "确定",
        });
        return;
      }
      let resPhone = await checkPhone(this.phone);
      if (resPhone.code == 0) {
        this.$confirm("当前手机号已被注册，是否直接登录", "温馨提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {});
        return;
      }
      this.password = encode(this.password);
      let resRegist = await register({
        name: this.name,
        phone: this.phone,
        password: this.password,
        passwordPay: this.passwordPay,
      });
      if (resRegist.code == 0) {
        this.$alert("注册成功，即将跳转到登录页", "温馨提示", {
          confirmButtonText: "确定",
          callback: () => {
            this.$router.replace("/login");
          },
        });
      } else {
        this.$alert("网络繁忙", "温馨提示", {
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
