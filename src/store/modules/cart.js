// 购物车 store
import { getCartList, cartUpdate, cartClear } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
      // cartTotal: 0
    }
  },
  mutations: {
    // 设置cartList的mutation
    setCartList (state, newList) {
      state.cartList = newList
      // console.log(state.cartList)
    },
    // setCartTotal (state, num) {
    //   state.cartTotal = num
    // },
    // 更改goods 选中状态
    toggleCheck (state, id) {
      const goods = state.cartList.find(item => item.id === id)
      goods.isChecked = !goods.isChecked
    },
    // 控制全选
    toggleAllCheck (state, status) {
      state.cartList.forEach(item => {
        item.isChecked = status
      })
    },
    // 更改数量
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 后台返回的数据中不包含复选框选中状态，手动维护数据 添加 isChecked
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
      // context.commit('setCartTotal', data.cartTotal)
    },
    async updateCartAction (context, params) {
      console.log(params)
      // 先本地修改
      const { goodsId, goodsNum, goodsSkuId } = params
      context.commit('changeCount', { goodsId, goodsNum })
      const res = await cartUpdate(
        goodsId, goodsNum, goodsSkuId
      )
      console.log(res)
    },
    async delCartAction (context) {
      // 删除数据
      const carts = context.getters.checkCartList
      const cartIds = carts.map(item => item.id)
      // console.log(cartIds)
      await cartClear(cartIds)
      // console.log(res)
      Toast('删除成功')
      // 重新获取
      context.dispatch('getCartAction')
    }
  },
  getters: {
    // s所有商品累加总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品项
    checkCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 所有选中状态的商品价格合计
    totalPrice (state, getters) {
      return getters.checkCartList.reduce((sum, item) => sum + item.goods.goods_price_min * item.goods_num, 0).toFixed(2)
    },
    // 选中的数量 结算
    checkedCount (state, getters) {
      // return state.cartList.filter(item => item.isChecked).length
      return getters.checkCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
