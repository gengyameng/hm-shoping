<template>
  <div class="cart">
    <!-- 导航栏 -->
    <van-nav-bar
      title="购物车"
      fixed
    />
    <div v-if="isLogin && cartList.length > 0 ">
      <!-- 购物车开头 -->
      <div class="cart-title">
        <span class="all">
          共<i>{{ cartTotal }}</i>件商品</span>
        <span class="edit" :class="{ complete: isEdit}" @click="isEdit=!isEdit">
          <van-icon name="edit" v-if="!isEdit"/>
          {{ isEdit ? '完成' : '编辑' }}
        </span>
      </div>
      <!-- 购物车列表 -->
      <div class="cart-list">
        <div
          v-for="item in cartList" :key="item.id"
          class="cart-item">
          <van-checkbox @click="toggleCheckHandle(item.id)" :value="item.isChecked" checked-color="#fa2f21" icon-size="35"></van-checkbox>
          <div class="show">
            <img :src="item.goods.goods_image" alt="">
          </div>
          <div class="info">
            <span class="tit text-ellipsis-2">{{ item.goods.goods_name }}</span>
            <span class="bottom">
              <div class="price">
                ¥
                <span>{{ item.goods.goods_price_min }}</span>
              </div>
              <!-- 既希望保留原本的形参，有需要通过调用函数传参 =》箭头函数改写 -->
              <CountBox :value="item.goods_num" @input="(value) => changeNumHandle(value, item.goods_id, item.goods_sku_id)"></CountBox>
            </span>
          </div>
        </div>
      </div>

      <!-- 底部 -->
      <div class="footer-fixed">
        <div class="all-check">
          <van-checkbox @click="toggleAllCheckHandle" checked-color="#fa2f21" icon-size="35" :value="isAllChecked">全选</van-checkbox>
        </div>
        <div class="all-total">
          <div class="price">
            <span>合计：</span>
            <span>
              ¥
              <i class="total-price">{{ totalPrice }}</i>
            </span>
          </div>
          <div v-if="isEdit" class="delete"
            @click="delHandle"
            :class="{ disabled: checkedCount === 0}">
            删除
          </div>
          <div v-else class="go-pay" :class="{ disabled: checkedCount === 0 }"
          @click="goPayHandle"
          >
            结算({{ checkedCount }})
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty-cart">
      <img src="@/assets/empty.png" alt="">
      <div class="tips">
        您的购物车时空的，快去逛逛吧
      </div>
      <div class="btn" @click="$router.push('/')">去逛逛</div>
    </div>
  </div>
</template>

<script>
import CountBox from '@/components/CountBox.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'CartIndex',
  components: {
    CountBox
  },
  data () {
    return {
      // cartList: []
      isEdit: false // 编辑 / 完成
    }
  },
  created () {
    // 必须是登录的用户
    if (this.isLogin) {
      this.$store.dispatch('cart/getCartAction')
    }
  },
  computed: {
    isLogin () {
      if (this.$store.getters.userToken) {
        return true
      }
      return false
    },
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['totalPrice', 'cartTotal', 'checkedCount', 'isAllChecked', 'checkCartList'])
  },
  methods: {
    // ...mapMutations('cart', ['setGoodsCheckStatus']),
    toggleCheckHandle (id) {
      // 切换选中按钮
      this.$store.commit('cart/toggleCheck', id)
    },
    toggleAllCheckHandle () {
      // 控制全选
      this.$store.commit('cart/toggleAllCheck', !this.isAllChecked)
    },
    changeNumHandle (count, goodsId, goodsSkuId) {
      console.log(count, goodsId, goodsSkuId)
      this.$store.dispatch('cart/updateCartAction', {
        goodsNum: count,
        goodsId,
        goodsSkuId
      })
    },
    delHandle () {
      // checkedCount 没有选中的不做操作
      if (this.checkedCount === 0) {
        return
      }
      this.$store.dispatch('cart/delCartAction')
      this.isEdit = false
    },
    goPayHandle () {
      // 结算- 跳转到结算页面
      // 判断有没有选中的商品
      if (this.checkedCount < 1) {
        return
      }
      const cartIds = this.checkCartList.map(item => item.id).join(',')
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'cart',
          cartIds: cartIds
        }
      })
    }
  },
  watch: {
    isEdit (value) {
      // 监视isEdit的变化，当isEdit=false 结算状态时 商品全选，当 isEdit=true 删除状态时 取消全选
      // if (value) {
      //   this.$store.commit('cart/toggleAllCheck', false)
      // } else {
      //   this.$store.commit('cart/toggleAllCheck', true)
      // }
      this.$store.commit('cart/toggleAllCheck', !value)
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  padding-top: 46px;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    font-size: 14px;
    color: #333;
    .all i{
      margin: 0 2px;
      color: #fa2209;
      font-style: normal;
      font-size: 16px;
    }
    .complete {
      color: #fa2209;
    }
  }
  .cart-list {
    padding-bottom: 80px;
    .cart-item {
      margin: 0 10px 10px 10px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      border-radius: 5px;
      .van-checkbox {
        margin-right: 5px;
      }
      .show img {
        width: 100px;
        height: 100px;
      }
      .info {
        width: 210px;
        padding: 10px 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 14px;
        .bottom {
          display: flex;
          justify-content: space-between;
          .price {
            display: flex;
            align-items: flex-end;
            color: #fa2209;
            font-size: 12px;
            span {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
  .footer-fixed {
    position: fixed;
    left: 0;
    bottom: 50px;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    .all-check {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
    .all-total {
      display: flex;
      align-items: center;
      .price {
        font-size: 14px;
        color: #fa2f21;
        margin-right: 10px;
        .total-price {
          font-style: normal;
          font-size: 18px;
        }
      }
      .go-pay,
      .delete {
        min-width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background-color: #fa2f21;
        color: #fff;
        border-radius: 18px;
        font-size: 14px;
        &.disabled {
          background-color: #ff9779;
        }
      }
    }
  }
  .empty-cart {
    padding: 50px 30px;
    img {
      width: 140px;
      height: 92px;
      display: block;
      margin: 0 auto;
    }
    .tips {
        text-align: center;
        color: #666;
        margin: 30px;
        font-size: 14px;
    }
    .btn {
      display: block;
      margin: 0 auto;
      width: 110px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background-color: #fa2c2a;
      border-radius: 16px;
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>
