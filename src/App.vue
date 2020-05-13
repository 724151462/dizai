<template>
  <div id="app">
    <router-view/>
    <van-tabbar route>
      <van-tabbar-item replace to="/"  icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/handPic" icon="search">随手拍</van-tabbar-item>
      <van-tabbar-item replace to="/tour" icon="friends-o">巡查</van-tabbar-item>
      <van-tabbar-item replace to="/mine" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default{
  data() {
    return {
      active: 0,
    };
  },
  mounted(){
    console.log(this.$route)
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
