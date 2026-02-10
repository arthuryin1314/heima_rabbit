<script setup>
import { useCategoryStore } from '@/stores/category'
import { storeToRefs } from 'pinia'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

const headerRef = ref(null)
const headerOffset = ref(0)
const headerHeight = ref(0)
const isSticky = ref(false)

const categoryStore = useCategoryStore()
const { categoryList } = storeToRefs(categoryStore)
const getCategory = categoryStore.getCategory

const measureHeader = () => {
  if (!headerRef.value) return
  const rect = headerRef.value.getBoundingClientRect()
  headerOffset.value = rect.top + window.scrollY
  headerHeight.value = rect.height
}

const handleScroll = () => {
  if (!headerRef.value) return
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  isSticky.value = scrollTop >= headerOffset.value
}

onMounted(async () => {
  await getCategory()
  await nextTick()
  measureHeader()
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', measureHeader)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', measureHeader)
})

</script>

<template>
  <div class="app-header-placeholder" :style="{ height: isSticky ? `${headerHeight}px` : '0px' }"></div>
  <header ref="headerRef" class='app-header' :class="{ sticky: isSticky }">
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">小兔鲜</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li class="home" v-for="item in categoryList" :key="item.id">
          <router-link to="/">{{ item.name }}</router-link>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <!-- 头部购物车 -->
    </div>
  </header>
</template>


<style scoped lang='scss'>
.app-header {
  background: #fff;
  position: relative;
  z-index: 10;

  &.sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }

  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;

      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;

        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }

      .active {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }

  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }

    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

  .cart {
    width: 50px;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 22px;
      }

      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: $helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}

.app-header-placeholder {
  width: 100%;
  transition: height 0.2s ease;
}
</style>