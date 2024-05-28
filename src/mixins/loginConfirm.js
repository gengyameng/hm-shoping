export default {
  // Vue组件实例的配置项，通过一定语法，可以直接混入到组件的内容
  // 注意
  // 1. 如果和组件内部提供了同名的 data 或 methods,则组件内部优先级更高
  // 2. 如果编写了生命周期函数，则mixins中的生命周期函数和页面的生命周期函数会用数组管理，统一执行
  data () {
    return {
      title: '标签'
    }
  },
  methods: {
    sayHi () {
      console.log('hello')
    },
    loginConfirm () {
      // 2. token 存在，继续请求操作
      if (!this.$store.getters.userToken) {
        // 弹确认框
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此操作需要登录才能继续操作',
          confirmButtonText: '去登录', // 确认按钮文案
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // on confirm - 去登录
            // 如果希望调整到登录 =》 登录后能跳回来，需要在跳转时携带参数-当前路径地址(this.$route.fullpath)
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // on cancel - 取消
          })
        // console.log('弹确认框')
        return true
      }
      return false
    }
  }
}
