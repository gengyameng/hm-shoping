<template>
  <div class="home">
    <!-- 导航条 -->
    <van-nav-bar
      title="智慧商城"
      fixed
    />
    <!-- 搜索框 -->
    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      :placeholder="placeholder"
    />
    <!-- 轮播图 -->
    <van-swipe
      class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
        <img :src="item.imgUrl" :alt="item.link.title">
      </van-swipe-item>
    </van-swipe>
    <!-- 导航 -->
    <van-grid :column-num="navStyle.rowsNum">
      <van-grid-item v-for="item in navList" :key="item.imgUrl" :icon="item.imgUrl" :text="item.text" />
    </van-grid>
    <!-- 主会场 -->
    <div class="main">
      <img src="@/assets/main.png" alt="">
    </div>
    <!-- 猜你喜欢 -->
    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>
      <div class="goods-list">
        <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/api/home'
export default {
  name: 'HomeIndex',
  data () {
    return {
      placeholder: '',
      bannerList: [], // 轮播图
      navList: [], // 导航
      navStyle: {}, // 导航样式
      proList: [] // 商品列表
    }
  },
  components: {
    GoodsItem
  },
  async created () {
    // 获取首页数据
    const { data: { pageData } } = await getHomeData()

    console.log(pageData)
    this.placeholder = pageData.items[0].params.placeholder
    this.bannerList = pageData.items[1].data
    this.navList = pageData.items[3].data
    this.navStyle = pageData.items[3].style
    this.proList = pageData.items[6].data
  }
}
</script>

<style lang="less" scoped>
.home {
  padding-top: 100px;
  padding-bottom: 50px;
}
// 导航条
.van-nav-bar {
  z-index: 999;
  background-color: #c21401;
  // ::v-deep: 带有 scoped的style中使用 ::v-deep允许访问子组件样式
  ::v-deep .van-nav-bar__title {
    color: #fff
  }
}

// 搜索框样式定制
.van-search {
  position: fixed;
  width: 100%;
  top: 46px;
  .van-search__content {
    background-color: #fff;
  }
}

// 轮播样式
.my-swipe .van-swipe-item {
  height: 185px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;

  img {
    width: 100%;
    height: 185px;
  }
}

// 主会场
.main img {
  display: block;
  width: 100%;
}

// 猜你喜欢
.guess {
  .guess-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  // 商品样式
  .goods-list {
    background-color: #f6f6f6;
  }
}
</style>
