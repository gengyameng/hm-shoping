<template>
  <div class="login">
    <!-- 头部 -->
    <van-nav-bar
    title="会员登录"
    left-arrow
    @click-left="$router.go(-1)"
    />
    <!-- 主体 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" type="text" class="inp" maxlength="5" placeholder="请输入图形验证码" >
          <img v-if="picUrl" :src="picUrl" alt="" @click="getPicCodeInfo">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text" >
          <button @click="getCode">
            {{ totalSecond === currentSecond ? '获取验证码' : `${currentSecond}秒后获取验证码` }}
          </button>
        </div>
      </div>
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
// import '@/utils/van-ui'
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      mobile: '', // 手机号码
      picCode: '', // 图形验证码
      msgCode: '', // 短信验证码
      picUrl: '', // 图形验证码图片地址
      picKey: '', // 图形验证码 key
      totalSecond: 60, // 倒计时总秒数
      currentSecond: 60, // 当前秒数
      timer: null
    }
  },
  created () {
    // 获取图片验证码
    this.getPicCodeInfo()
  },
  destroyed () {
    // 组件销毁时清除定时器
    clearInterval(this.timer)
  },
  methods: {
    // 获取图片验证码
    async getPicCodeInfo () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
    },
    // 获取短信验证码
    async getCode () {
      // 1. 校验处理（手机号、验证码）
      if (!this.validFn()) {
        return
      }
      // 2.开启倒计时
      // 当前不存在定时器才能开启 并且totalSecond 需要等于 currentSecond才能开启
      if (!this.timer & this.totalSecond === this.currentSecond) {
        // 发送请求
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('短信发送成功，注意查收')

        // 开启倒计时
        this.timer = setInterval(() => {
          this.currentSecond--
          if (this.currentSecond < 1) {
            // 停止定时器
            clearInterval(this.timer)
            // currentSecond恢复
            this.currentSecond = this.totalSecond
            // this.timer 恢复
            this.timer = null
          }
        }, 1000)
      }
    },
    // 登录
    async login () {
      // 验证手机号吗和图形验证码
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      // 发送登录请求
      // 如果响应非200，会抛出异常，await只会等待成功的promise
      const res = await codeLogin(this.mobile, this.msgCode)
      // 保存登录状态到 vuex store userId token
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')
      this.$router.push('/')
    },
    validFn () {
      // 校验 手机号码 和 验证码
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号码')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的验证码')
        return false
      }
      return true
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
}
</style>
