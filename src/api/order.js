// 订单相关
import request from '@/utils/request'

// 获取订单结算信息
/*
mode: cart    => obj { cartIds }
mode: buyNow  => obj { goodsId  goodsNum goodsSkuId }
*/
export const checkOrder = (mode, params) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10, // 10 快递配送
      couponId: 0, // 优惠券ID 0:不使用
      isUsePoints: 0, // 积分 0:不使用积分
      ...params
    }
  })
}

// 提交订单
export const submitOrder = (mode, params) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 10 快递配送
    couponId: 0,
    isUsePoints: 0,
    payType: 10, // 余额支付
    ...params
  })
}

// 获取订单列表
export const getOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}

// 取消订单
export const cancelOrder = (orderId) => {
  return request.post('/order/cancel', {
    orderId
  })
}
