<template>
  <div class="search">
    <!-- 导航栏 -->
    <van-nav-bar
      title="商品搜索"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="main">
      <!-- 搜索框 -->
      <van-search
        show-action
        clearable
        placeholder="请输入搜索关键词"
        v-model="search"
      >
        <template #action>
          <div @click="goSearch(search)">搜索</div>
        </template>
      </van-search>
      <!-- 搜索历史 -->
      <div class="search-history">
        <div class="title">
          <span>最近搜索</span>
          <van-icon name="delete-o" size="20" @click="clear"/>
        </div>
        <div class="list">
          <div
            v-for="item in history" :key="item"
            @click="goSearch(item)"
            class="list-item">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProSearchHistory, setProSearchHistory } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data () {
    return {
      history: getProSearchHistory(), // 搜索历史
      search: '' // 搜索内容
    }
  },
  methods: {
    goSearch (key) {
      // 判断key是否在history中
      const index = this.history.indexOf(key)
      if (index !== -1) {
        // 在history中，删除
        this.history.splice(index, 1)
      }
      // 插入 history 第一个位置
      this.history.unshift(key)
      setProSearchHistory(this.history)
      // 跳转
      this.$router.push(`searchlist?search=${key}`)
    },
    clear () {
      // 清空搜索历史
      this.history = []
      setProSearchHistory([])
    }
  }
}
</script>

<style lang="less" scoped>
// 搜索框
.main {
  padding: 0 10px;
}
.van-search--show-action {
  padding-left: 0;
}
.van-search {
  background-color: transparent;
  .van-search__content {
    background-color: #fff;
  }
  .van-search__action {
    padding: 0 20px;
    background-color: #fa2209;
    font-size: 20px;
    color: #fff;
    font-weight: normal;
    border-radius: 0 5px 5px 0;
  }
}

// 搜索历史
.search-history {
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .list-item {
      width: 30%;
      text-align: center;
      padding: 7px;
      line-height: 15px;
      border-radius: 50px;
      background-color: #fff;
      font-size: 16px;
      border: 1px solid #efefef;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0 5px;
      margin-bottom: 10px;
      color: #666;
    }
  }
}
</style>
