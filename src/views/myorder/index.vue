<template>
  <div class="myorder">
    <!-- 导航栏 - 我的订单 fixed -->
    <van-nav-bar
      title="我的订单"
      fixed
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 标签 -->
    <van-tabs v-model="activeName">
      <van-tab title="全部" name="all"></van-tab>
      <van-tab title="待支付" name="payment"></van-tab>
      <van-tab title="待发货" name="delivery"></van-tab>
      <van-tab title="待收货" name="received"></van-tab>
      <van-tab title="待评价" name="comment"></van-tab>
    </van-tabs>
    <!-- 订单商品列表 -->
    <OrderListItem v-for="item in list" :key="item.order_id" :item="item"></OrderListItem>
  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem.vue'
import { getOrderList } from '@/api/order'
export default {
  name: 'MyOrderIndex',
  components: {
    OrderListItem
  },
  data () {
    return {
      activeName: this.$route.query.dataType || 'all',
      page: 1,
      list: []
    }
  },
  methods: {
    async getOrderList () {
      const { data: { list } } = await getOrderList(this.activeName, this.page)
      console.log(list)
      list.data.forEach(item => {
        item.total_num = 0
        item.total_price = 0
        item.goods.forEach(goods => {
          item.total_num += goods.total_num
          item.total_price += +goods.total_pay_price
        })
        item.total_price = item.total_price.toFixed(2)
      })
      this.list = list.data
      /*
      order_id
      order_status
      state_text
      create_time
      goods:goods_id goods_name total_num image.external_url
      */
    }
  },
  watch: {
    activeName: {
      immediate: true,
      handler () {
        this.getOrderList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.myorder {
  padding-top: 46px;
}
</style>
