<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view/>
    <!-- 下方标签-使用组件 -->
    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import '@/utils/van-ui'
export default {
  name: 'LayoutIndex'
}
</script>

<style lang="less" scoped>

</style>
