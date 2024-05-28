<template>
  <div class="pay">
    <!-- 导航栏-订单结算台 -->
    <van-nav-bar
      title="订单结算台"
      left-arrow
      @click-left="$router.go(-1)"
      fixed
    />
    <!-- 地址相关 -->
    <div class="address">
      <div class="left-icon">
        <van-icon name="location-o"/>
      </div>
      <div class="info" v-if="selectedAddress.address_id">
        <div class="info-content">
          <span class="name">{{ selectedAddress.name }}</span>
          <span class="mobile">{{ selectedAddress.phone }}</span>
        </div>
        <div class="info-address">
          {{ longAddress }}
        </div>
      </div>
      <div class="info" v-else>请选择配送地址</div>
      <div class="right-icon">
        <van-icon name="arrow" />
      </div>
    </div>
    <!-- 订单明细 -->
    <div class="pay-list">
      <div class="list">
        <div
        class="goods-item"
        v-for="item in order.goodsList" :key="item.goods_id"
        >
          <div class="left">
            <img :src="item.goods_image" alt="">
          </div>
          <div class="right">
            <p class="tit text-ellipsis-2">
              {{ item.goods_name }}
            </p>
            <p class="info">
              <span class="count">x{{ item.total_num }}</span>
              <span class="price">¥{{ item.total_pay_price }}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 合计 -->
      <div class="flow-num-box">
        <span>共{{ order.orderTotalNum }}件商品，合计：</span>
        <span class="money">¥{{ order.orderTotalPrice }}</span>
      </div>
      <!-- 支付详情 -->
      <div class="pay-detail">
        <div class="pay-cell">
          <span>订单总金额：</span>
          <span class="red">¥{{ order.orderTotalPrice }}</span>
        </div>
        <div class="pay-cell">
          <span>优惠卷</span>
          <span>无优惠卷可用</span>
        </div>
        <div class="pay-cell">
          <span>配送方式</span>
          <span v-if="false">请先选择配送地址</span>
          <span v-else class="red">+¥0.00</span>
        </div>
      </div>
      <!-- 支付方式 -->
      <div class="pay-way">
        <span class="tit">支付方式</span>
        <div class="pay-cell">
          <span>
            <van-icon name="balance-o" />余额支付（可用{{ personal.balance}}元）
          </span>
          <span class="red"><van-icon name="passed" /></span>
        </div>
      </div>
      <!-- 买家留言 -->
      <div class="buytips">
        <textarea v-model="remark" name="" id="" placeholder="选填：买家留言（50字内）" cols="30" rows="10"></textarea>
      </div>
    </div>
    <!-- 底部提交 -->
    <div class="footer-fixed">
      <div class="left">实付款：<span class="red">¥{{ order.orderTotalPrice }}</span></div>
      <div class="tipsbtn" @click="submitOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
import { getAddressList, addAddress } from '@/api/address'
import { checkOrder, submitOrder } from '@/api/order'
export default {
  name: 'PayIndex',
  data () {
    return {
      addressList: [], // 收货地址列表
      order: {}, // 订单信息
      personal: {}, // 用户余额信息
      remark: '' // 留言
    }
  },
  computed: {
    selectedAddress () {
      // 默认地址，暂时取第一个
      return this.addressList[0] || {}
    },
    longAddress () {
      // 拼接完整地址
      const region = this.selectedAddress.region
      return `${region.province}${region.city}${region.region}${this.selectedAddress.detail}`
    },
    mode () {
      // mode cart /buyNow 购物车结算或立即购买结算
      return this.$route.query.mode
    },
    cartIds () {
      // 如果 mode=cart
      return this.$route.query.cartIds
    },
    goodsId () {
      return this.$route.query.goodsId
    },
    goodsNum () {
      return this.$route.query.goodsNum
    },
    goodsSkuId () {
      return this.$route.query.goodsSkuId
    }
  },
  created () {
    // this.addAddress()
    // 获取收货地址列表
    this.getAddressList()
    // 订单结算信息
    this.getOrderList()
  },
  methods: {
    async getAddressList () {
      const { data: { list } } = await getAddressList()
      console.log(list)
      this.addressList = list
    },
    async getOrderList () {
      // 购物车结算
      if (this.mode === 'cart') {
        const { data: { order, personal } } = await checkOrder(this.mode, {
          cartIds: this.cartIds
        })
        this.order = order
        this.personal = personal
        // console.log(order)
        // console.log(personal)
      }
      // 立即购买结算
      if (this.mode === 'buyNow') {
        const { data: { order, personal } } = await checkOrder(this.mode, {
          goodsId: this.goodsId,
          goodsNum: this.goodsNum,
          goodsSkuId: this.goodsSkuId
        })
        this.order = order
        this.personal = personal
        // console.log(order)
        // console.log(personal)
      }
    },
    async submitOrder () {
      // 提交订单
      if (this.mode === 'cart') {
        await submitOrder(this.mode, {
          cartIds: this.cartIds,
          remark: this.remark
        })
      }
      if (this.mode === 'buyNow') {
        await submitOrder(this.mode, {
          goodsId: this.goodsId,
          goodsNum: this.goodsNum,
          goodsSkuId: this.goodsSkuId
        })
      }
      // 提示支付成功
      this.$toast('支付成功')
      // 跳转链接
      this.$router.replace('/myorder')
    },
    async addAddress () {
      await addAddress({
        name: '齐天大圣',
        phone: '158978332156',
        region: [
          { value: 782, label: '上海' },
          { value: 783, label: '上海市' },
          { value: 785, label: '徐汇区' }
        ],
        detail: '花果山水帘洞 1单元 1栋 101'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.pay{
  padding-top: 46px;
  padding-bottom: 46px;
  ::v-deep {
    .van-nav-bar__arrow {
      color: #333;
    }
  }
}
.address {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  font-size: 14px;
  color: #666;
  // background-color: #fff;
  background: #fff url(@/assets/border-line.png) bottom repeat-x;
  .left-icon {
    margin-right: 20px;
  }
  .right-icon {
    position: absolute;
    right: 20px;
    // top: 50%;
  }
  .info-content {
    color: #333;
    .name {
      font-size: 16px;
    }
  }
}
  // 订单明细
.goods-item {
  height: 105px;
  // margin-bottom: 6px;
  border-bottom: 1px solid #f8f8f8;
  padding: 10px;
  background-color: #fff;
  display: flex;
  .left {
    width: 100px;
    img {
      display: block;
      width: 80px;
      margin: 10px auto;
      margin-bottom: 0;
    }
  }
  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    padding-right: 0;
    color: #333;
    // display: flex;
    // flex-direction: column;
    // justify-content: space-evenly;
    .info {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      .price {
        color: #fa2209;
      }
    }
  }
}

.flow-num-box{
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #777;
  background-color: #fff;
  .money {
    color: #fa2209;
  }
}
.pay-detail {
  background: #fff;
  margin-bottom: 10px;
  padding: 0 12px;
}
.pay-cell {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  color: #333;
  font-size: 14px;
  border-bottom: 1px solid #f8f8f8;
  .red {
    color: #fa2209;
  }
}
.pay-way {
  font-size: 14px;
  padding: 10px 12px;
  color: #333;
  background-color: #fff;
  margin-bottom: 10px;
  .tit {
    display: block;
    line-height: 30px;
    border-bottom: 1px solid #f8f8f8;
  }
  .pay-cell {
      padding: 10px 0;
      border: none;
    }.van-icon {
      font-size: 20px;
      margin-right: 5px;
    }
}
.buytips {
  display: block;
  textarea {
    display: block;
    width: 100%;
    border: none;
    font-size: 14px;
    padding: 12px;
    height: 100px;
    margin-bottom: 10px;
  }
}
.footer-fixed {
  position: fixed;
  background-color: #fff;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 46px;
  line-height: 46px;
  border-top: 1px solid #f8f8f8;
  font-size: 14px;
  display: flex;
  .left{
    flex: 1;
    color: #666;
    padding-left: 12px;
    .red {
      color: #fa2209;
    }
  }
  .tipsbtn {
    width: 121px;
    background: linear-gradient(90deg, #f9211c, #ff6335);
    color: #fff;
    text-align: center;
    line-height: 46px;
    font-size: 14px;
  }
}
</style>
