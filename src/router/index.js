import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from '@/stores/user'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/layout/index.vue'),
      children: [
        {
          path: 'home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: 'category/:id',
          component: () => import('@/views/category/index.vue')
        },
        {
          path: 'category/sub/:id',
          component: () => import('@/views/subCategory/index.vue')
        },
        {
          path: 'member',
          component: () => import('@/views/member/index.vue'),
          redirect: '/member/user',
          children: [
            {
              path: 'user',
              component: () => import('@/views/member/components/MemberInfo.vue')
            },
            {
              path: 'order',
              component: () => import('@/views/member/components/MemberOrder.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/index.vue')
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})
router.beforeEach((to, from, next) => {
  const store = userStore()
  if (store.userInfo.token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
