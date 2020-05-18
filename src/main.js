import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vant from 'vant';
import 'vant/lib/index.less';
import './assets/css/public.css';
import navBar from './components/navBar.vue'
import bottomTabs from './components/bottomTabs.vue'
import personalHead from './components/personalHead.vue'

let options = {
  fullscreenEl: true, //控制是否显示右上角全屏按钮
  closeEl: false, //控制是否显示右上角关闭按钮
  tapToClose: true, //点击滑动区域应关闭图库
  shareEl: false, //控制是否显示分享按钮
  zoomEl: true, //控制是否显示放大缩小按钮
  counterEl: true, //控制是否显示左上角图片数量按钮
  arrowEl: false,  //控制如图的左右箭头（pc浏览器模拟手机时）
  tapToToggleControls: true, //点击应切换控件的可见性
  clickToCloseNonZoomable: true //点击图片应关闭图库，仅当图像小于视口的大小时
};
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview, options)

Vue.component('navBar',navBar)
Vue.component('bottomTabs',bottomTabs)
Vue.component('personalHead',personalHead)
import { Dialog } from 'vant';
Vue.use(Dialog);
Vue.use(Vant);
Vue.config.productionTip = false

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

Vue.use(VideoPlayer)








new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
