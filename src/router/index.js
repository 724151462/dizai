import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    name: "Home",
    meta: {
      isTab: true,
    },
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/index/index.vue"),
  },
  {
    path: "/index/zqdetail",
    name: "灾情详情",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/index/zdDetail.vue"),
  },
  {
    path: "/handPic",
    name: "随手拍首页",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/handPic/index.vue"),
  },
  {
    path: "/handPic/upload",
    name: "随手拍上传",
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/handPic/handUpload.vue"),
  },
  {
    path: "/tour",
    name: "巡查签到首页",
    component: () =>
      import(/* webpackChunkName: "tour" */ "../views/tour/index.vue"),
  },
  {
    path: "/tour/sign",
    name: "巡查签到",
    component: () =>
      import(/* webpackChunkName: "tour" */ "../views/tour/sign.vue"),
  },
  {
    path: "/tour/subao",
    name: "速报",
    component: () =>
      import(/* webpackChunkName: "tour" */ "../views/tour/subao.vue"),
  },
  {
    path: "/tour/addrchoose",
    name: "地址选择",
    component: () =>
      import(/* webpackChunkName: "tour" */ "../views/tour/addrchoose.vue"),
  },
  {
    path: "/tour/shangbao",
    name: "上报",
    component: () =>
      import(/* webpackChunkName: "tour" */ "../views/tour/shangbao.vue"),
  },
  {
    path: "/mine",
    name: "我的首页",
    component: () =>
      import(/* webpackChunkName: "mine" */ "../views/mine/index.vue"),
  },
  {
    path: "/personal/handPic",
    name: "个人中心随手拍",
    component: () =>
      import(/* webpackChunkName: "mine" */ "../views/personal/handPic.vue"),
  },
  {
    path: "/personal/chenkIn",
    name: "个人中心巡查签到",
    component: () =>
      import(/* webpackChunkName: "mine" */ "../views/personal/chenkIn.vue"),
  },
  {
    path: "/personal/disasterStudies",
    name: "个人中心灾情速报",
    component: () =>
      import(
        /* webpackChunkName: "mine" */ "../views/personal/disasterStudies.vue"
      ),
  },
  {
    path: "/personal/disasterReport",
    name: "个人中心灾情上报",
    component: () =>
      import(
        /* webpackChunkName: "mine" */ "../views/personal/disasterReport.vue"
      ),
  },
  {
    path: "/mine/detail",
    name: "我的详情",
    component: () =>
      import(/* webpackChunkName: "mine" */ "../views/mine/infoDetail.vue"),
  },
  {
    path: "/mine/handPic",
    name: "我的随手拍",
    component: () =>
      import(/* webpackChunkName: "mine" */ "../views/mine/mineHandPic.vue"),
  },
  {
    path: "/mine/qzHandPic",
    name: "群众随手拍",
    component: () =>
      import(/* webpackChunkName: "mine" */ "../views/mine/qzHandPic.vue"),
  },
  {
    path: "/mine/toursignrecord",
    name: "巡查记录",
    component: () =>
      import(/* webpackChunkName: "mine" */ "../views/mine/tourSignRecord.vue"),
  },
  {
    path: '/mine/toursignrecordparticulars',
    name: '巡查详情',
    component: () => import (/* webpackChunkName: "mine" */ '../views/mine/tourSignRecordParticulars.vue')
  },
  {
    path: '/mine/quickreport',
    name: '灾(险)情速报记录',
    component: () => import (/* webpackChunkName: "mine" */ '../views/mine/quickReport.vue')
  },
  {
    path: '/mine/quickreportparticulars',
    name: '灾(险)情速报记录详情',
    component: () => import (/* webpackChunkName: "mine" */ '../views/mine/quickReportParticulars.vue')
  },
  {
    path: '/mine/reported',
    name: '灾(险)情上报记录',
    component: () => import (/* webpackChunkName: "mine" */ '../views/mine/reported.vue')
  },
  {
    path: '/mine/reportedparticulars',
    name: '灾(险)情上报记录详情',
    component: () => import (/* webpackChunkName: "mine" */ '../views/mine/reportedParticulars.vue')
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
