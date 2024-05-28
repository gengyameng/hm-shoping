<template>
  <div  class="category">
    <!-- 导航栏 -->
    <van-nav-bar title="全部分类" fixed />
    <!-- 搜索框 -->
    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      placeholder="请输入搜索关键词"
      @click="$router.push('/search')"
    />
    <!-- 分离列表 -->
    <div class="list-box">
      <div class="left">
        <ul>
          <li v-for="(item, index) in list" :key="item.category_id">
            <a
            href="javascript:;"
            :class="{ active : index === activeIndex}"
            @click="activeIndex = index"
            >
            {{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="right">
        <div
          v-for="item in list[activeIndex]?.children" :key="item.category_id"
          class="cate-goods"
          @click="$router.push(`/searchlist?categoryId=${item.category_id}`)"
          >
          <img :src="item.image?.external_url" alt="">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryData } from '@/api/category'
export default {
  name: 'CategoryIndex',
  data () {
    return {
      list: [],
      activeIndex: 0
    }
  },
  async created () {
    const { data: { list } } = await getCategoryData()
    console.log(list)
    this.list = list
  }
}
</script>

<style lang="less" scoped>
.category {
  padding-top: 50px;
  .list-box {
    height: 100%;
    display: flex;
    .left {
      width: 85px;
      height: 100%;
      background-color: #f3f3f3;
      overflow: auto;
      a {
        display: block;
        height: 45px;
        line-height: 45px;
        text-align: center;
        color: #444;
        font-size: 12px;
        &.active {
          color: #fb442f;
          background-color: #fff;
        }
      }
    }
    .right {
      flex: 1;
      height: 100%;
      background-color: #fff;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
      padding: 10px 0;
      overflow: auto;
      .cate-goods {
        width: 33.3%;
        margin-bottom: 10px;
        img {
          width: 70px;
          height: 70px;
          display: block;
          margin: 5px auto;
        }
        p{
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
