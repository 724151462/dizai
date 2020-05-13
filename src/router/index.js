import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/index',
    },
  {
    path: '/index',
    name: 'Home',
    meta: {
      isTab: true
    },
    component: () => import (/* webpackChunkName: "index" */ '../views/index/index.vue'),
    children: [
      {
        path: '/zqdetail',
        name: '灾情详情',
        component: () => import (/* webpackChunkName: "index" */ '../views/index/zdDetail.vue')
      }
    ]
  },
  {
    path: '/handPic',
    name: 'handPic',
    component: () => import (/* webpackChunkName: "index" */ '../views/handPic/index.vue')
  },
  {
    path: '/tour',
    name: 'tour',
    component: () => import (/* webpackChunkName: "index" */ '../views/tour/index.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import (/* webpackChunkName: "index" */ '../views/mine/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
