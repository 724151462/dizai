<template>
  <van-tabbar v-model="active">
    <van-tabbar-item replace to="/">
      <span>首页</span>
      <template #icon="props">
        <img :src="props.active ? require('../assets/imgs/zaibao-act.png') : require('../assets/imgs/zaibao.png')" />
      </template>
    </van-tabbar-item>
      <van-tabbar-item replace to="/handPic">
      <span>随手拍</span>
      <template #icon="props">
        <img :src="props.active ? require('../assets/imgs/ssp-act.png') : require('../assets/imgs/ssp.png')" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/tour">
      <span>数据上传</span>
      <template #icon="props">
        <img :src="props.active ? require('../assets/imgs/sjsc-act.png') : require('../assets/imgs/sjsc.png')" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/mine">
      <span>我的</span>
      <template #icon="props">
        <img :src="props.active ? require('../assets/imgs/mine-act.png') : require('../assets/imgs/mine.png')" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default{
  data() {
    return {
      tabShow: false
    }
  },
  props: {
    active: {
      default: 0
    }
  }
}
</script>