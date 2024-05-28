<template>
  <div class="search">
    <!-- 标签页 -->
    <van-nav-bar
      title="商品列表"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 搜索页 -->
    <van-search
      show-action
      readonly
      shape="round"
      :value="querySearch"
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon name="apps-o" class="tool" />
      </template>
    </van-search>
    <!-- 排序按钮 -->
    <div class="sort-btns" ref="btns">
      <div
        v-for="(item, index) in sortList" :key="index"
        @click="searchSort(index)" class="sort-item" :class="{ active: index === activeIndex}" >
        {{ item.name }}
      </div>
      <!-- <div @click="searchSort" class="sort-item" data-sortType="sales">销量</div>
      <div @click="searchSort" class="sort-item" data-sortType="price">价格</div> -->

    </div>
    <!-- 商品列表 -->
    <div class="goods-list">
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getProList } from '@/api/product'
export default {
  name: 'SearchList',
  components: {
    GoodsItem
  },
  computed: {
    // 获取地址栏的搜索关键字
    querySearch () {
      return this.$route.query.search
    }
  },
  data () {
    return {
      page: 1, // 页码
      proList: [], // 商品结果列表
      // sortType: null,
      activeIndex: 0,
      sortList: [
        { name: '综合', sortType: 'all' },
        { name: '销量', sortType: 'sales' },
        { name: '价格', sortType: 'price' }
      ]
    }
  },
  async created () {
    // 获取搜索结果
    const { data: { list } } = await getProList({
      categoryId: this.$route.query.categoryId,
      goodsName: this.querySearch,
      page: this.page
    })
    this.proList = list.data
  },
  methods: {
    async searchSort (index) {
      // 搜索排序
      this.activeIndex = index
      const { data: { list } } = await getProList({
        categoryId: this.$route.query.categoryId,
        goodsName: this.querySearch,
        page: this.page,
        sortType: this.sortList[index].sortType
      })
      this.proList = list.data
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  // padding-top: 46px;
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    justify-content: space-around;
    // margin-top: 10px;
    background-color: #fff;
    line-height: 40px;
    font-size: 14px;
    .sort-item.active {
      color: #e49a3d;
    }
  }
}
</style>
