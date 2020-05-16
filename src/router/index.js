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
  },
  {
    path: '/index/zqdetail',
    name: '灾情详情',
    component: () => import (/* webpackChunkName: "index" */ '../views/index/zdDetail.vue')
  },
  {
    path: '/handPic',
    name: 'handPic',
    component: () => import (/* webpackChunkName: "index" */ '../views/handPic/index.vue')
  },
  {
    path: '/tour',
    name: 'tour',
    component: () => import (/* webpackChunkName: "tour" */ '../views/tour/index.vue')
  },
  {
    path: '/tour/sign',
    name: '巡查签到',
    component: () => import (/* webpackChunkName: "tour" */ '../views/tour/sign.vue')
  },
  {
    path: '/tour/subao',
    name: '速报',
    component: () => import (/* webpackChunkName: "tour" */ '../views/tour/subao.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import (/* webpackChunkName: "mine" */ '../views/mine/index.vue')
  },
  {
    path: '/personal/handPic',
    name: '个人中心随手拍',
    component: () => import (/* webpackChunkName: "mine" */ '../views/personal/handPic.vue')
  },
  {
    path: '/personal/chenkIn',
    name: '个人中心巡查签到',
    component: () => import (/* webpackChunkName: "mine" */ '../views/personal/chenkIn.vue')
  },
  {
    path: '/personal/disasterStudies',
    name: '个人中心灾情速报',
    component: () => import (/* webpackChunkName: "mine" */ '../views/personal/disasterStudies.vue')
  },
  {
    path: '/personal/disasterReport',
    name: '个人中心灾情上报',
    component: () => import (/* webpackChunkName: "mine" */ '../views/personal/disasterReport.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
