<template>
  <van-tabbar route>
    <van-tabbar-item replace to="/"  icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/handPic" icon="search">随手拍</van-tabbar-item>
    <van-tabbar-item replace to="/tour" icon="friends-o">巡查</van-tabbar-item>
    <van-tabbar-item replace to="/mine" icon="setting-o">我的</van-tabbar-item>
  </van-tabbar>
</template>
<script>
export default{
  data() {
    return {
      active: 0,
      tabShow: false
    };
  },
}
</script>