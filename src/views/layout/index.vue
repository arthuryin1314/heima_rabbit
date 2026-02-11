<script setup>
import LayoutNav from './components/layoutNav.vue'
import LayoutHeader from './components/layoutHeader.vue'
import LayoutFooter from './components/layoutFooter.vue'
</script>

<template>
  <LayoutNav />
  <LayoutHeader />
  <router-view :key="$route.fullPath"></router-view>
  <LayoutFooter />
</template>
