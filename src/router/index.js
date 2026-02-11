import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect: '/home',
      component:()=>import('@/views/layout/index.vue'),
      children:[
        {
          path:'home',
          component:()=>import('@/views/home/index.vue')
        },
        {
          path:'category/:id',
          component:()=>import('@/views/category/index.vue')
        },
        {
          path:'category/sub/:id',
          component:()=>import('@/views/subCategory/index.vue')
        }
      ]
    },
    {
      path:'/login',
      component:()=>import('@/views/login/index.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
