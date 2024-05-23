// user模块
export default {
  namespaced: true,
  state () {
    return {
      userInfo: {
        userId: '',
        token: ''
      }
    }
  },
  mutations: {
    // 所有 mutations 的第一个参数 都是 state
    setUserInfo (state, obj) {
      // 修改userInfo
      state.userInfo = obj
    }
  },
  actions: {},
  getters: {}
}
