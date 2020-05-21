<template>
  <div class="pu-bg">
    <!-- <navBar :title="'巡查'" :isBack="false"></navBar> -->
    <div class="pad-lr-10 mar-t-10 pad-t-10 ">
      <router-link :to="{path: '/tour/sign'}" class="tour-menu pu-row mar-t-10">
        <img width="70" src="../../assets/imgs/qd.png" alt="">
        <span>巡查签到</span>
      </router-link>
      <router-link :to="{path: '/tour/subao'}" class="tour-menu pu-row mar-t-10">
        <img width="70" src="../../assets/imgs/subao.png" alt="">
        <span>灾(险)情速报</span>
      </router-link>
      <router-link :to="{path: '/tour/shangbao'}" class="tour-menu pu-row mar-t-10">
        <img width="70" src="../../assets/imgs/shangbao.png" alt="">
        <span>灾(险)情上报</span>
      </router-link>
    </div>
    <bottomTabs></bottomTabs>
  </div>
</template>

<script>
export default {
  mounted(){
    this.nav('巡查');
  }
}
</script>

<style scope>
.pu-bg{
  padding: 0 20px;
  box-sizing: border-box;
}
  .tour-menu{
    border-radius: 12px;
    box-shadow: 2px 1px 16px rgb(247, 234, 237);
    background-color: #fff;
    padding: 20px 45px;
    color: rgb(119, 119, 119);
  }
  .tour-menu>span{
    font-size: 24px;
    margin-left: 30px;
  }
</style>