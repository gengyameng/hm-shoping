<template>
  <!-- 订单列表项 -->
  <div class="order-item">
    <div class="order-top">
      <span class="date">{{ item.create_time }}</span>
      <span class="status">{{ item.state_text }}</span>
    </div>
    <!-- 三部分 商品信息+统计+按钮 -->
    <div class="goods-item" v-for="goods in item.goods" :key="goods.goods_id">
      <div class="left">
        <img :src="goods.image.external_url" alt="">
      </div>
      <div class="info">
        <p class="tit text-ellipsis-2">
          {{ goods.goods_name }}
        </p>
      </div>
      <div class="right">
          <p class="price">¥{{ goods.goods_price }}</p>
          <p class="count">x{{ goods.total_num }}</p>
      </div>
    </div>
    <!-- 订单统计 -->
    <div class="order-total">共{{ item.total_num }}件商品，总金额¥{{ item.total_price }}</div>
    <div class="cancel-btn">
      <span class="btn" @click="cancelOrderHandle(item.order_id)">申请取消</span>
    </div>
  </div>
</template>

<script>
import { cancelOrder } from '@/api/order'
export default {
  name: 'OrderListItem',
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    // 取消订单
    async cancelOrderHandle (orderId) {
      const res = await cancelOrder(orderId)
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
.order-item {
  margin: 10px 15px;
  background-color: #fff;
  padding: 10px;
  font-size: 12px;
  .order-top {
    display: flex;
    justify-content: space-between;
    color: #777;
    margin-bottom: 12px;
    .status {
      color: #fa2209;
    }
  }
  .goods-item {
    display: flex;
    justify-content: space-between;
    .left {
      // width: 100px;
      img {
        display: block;
        width: 80px;
      }
    }
    .info {
      flex: 1;
      padding-top: 10px;
      padding-left: 10px;
      .tit {
        color: #333;
      }
    }
    .right {
        // width: 50px;
        text-align: right;
        padding-top: 10px;
        padding-left: 15px;
        color: #999;
        .price {
          margin-bottom: 10px;
        }
      }
  }
  .order-total {
    text-align: right;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .cancel-btn {
    display: flex;
    justify-content: flex-end;
    .btn {
      display: block;
      border: 0.5px solid #a8a8a8;
      padding: 2px 8px;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
