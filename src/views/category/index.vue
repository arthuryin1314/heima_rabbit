<script setup>
import {useTopCategory} from './composable/useCategory'
import {useBanner} from './composable/getBanner'
import GoodsItem from '../home/components/GoodsItem.vue'

const { bannerList } = useBanner()
const { topCategory } = useTopCategory()
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ topCategory.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="sub-list">
  <h3>全部分类</h3>
  <ul>
    <li v-for="i in topCategory.children" :key="i.id">
      <RouterLink :to="`/category/sub/${i.id}`">
        <img :src="i.picture" />
        <p>{{ i.name }}</p>
      </RouterLink>
    </li>
  </ul>
</div>
<div class="ref-goods" v-for="item in topCategory.children" :key="item.id">
  <div class="head">
    <h3>- {{ item.name }}-</h3>
  </div>
  <div class="body">
    <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
  </div>
</div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .bread-container {
    padding: 25px 0;
  }
}

.sub-list,
.ref-goods {
  width: 1240px;
  margin: 20px auto 0;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px 24px;
  box-sizing: border-box;
}

.sub-list {
  h3 {
    margin: 0 0 16px;
    font-size: 20px;
    color: #333;
    text-align: left;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 16px 12px;
    padding: 0;
  }

  li {
    width: 100%;
    height: 160px;
  }

  a {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 16px;
    color: #333;

    img {
      width: 100px;
      height: 100px;
    }

    p {
      line-height: 1.6;
    }

    &:hover {
      color: $xtxColor;
    }
  }
}

.ref-goods {
  position: relative;

  .head {
    margin-bottom: 12px;

    h3 {
      margin: 0;
      font-size: 20px;
      color: #333;
      text-align: left;
      line-height: 1.4;
    }
  }

  .body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 0 4px 12px;
  }
}

@media (max-width: 1280px) {
  .sub-list,
  .ref-goods,
  .home-banner {
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
    box-sizing: border-box;
  }

  .sub-list ul {
    grid-template-columns: repeat(4, 1fr);
  }

  .ref-goods .body {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .sub-list ul {
    grid-template-columns: repeat(2, 1fr);
  }

  .ref-goods .body {
    grid-template-columns: repeat(2, 1fr);
  }
}

.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 500px;
  }
}
</style>
