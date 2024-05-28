// user模块
import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      userInfo: getInfo()
    }
  },
  mutations: {
    // 所有 mutations 的第一个参数 都是 state
    setUserInfo (state, obj) {
      // 修改userInfo
      state.userInfo = obj
      // 数据持久化 保存到本地
      setInfo(obj)
    }
  },
  actions: {
    logout (context) {
      // 重置user 个人信息 + 购物车数据
      context.commit('setUserInfo', {})
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {}
}
