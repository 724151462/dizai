import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import (/* webpackChunkName: "index" */ '../views/index/index.vue')
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
