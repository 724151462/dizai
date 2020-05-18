<template>
  <div>
    <navBar :title="'随手拍'" :isBack="false"></navBar>
    <div v-for="(item,index) in 6" :key="index" class="pad-lr-10 pad-tb-10 pu-column al-start" :class="index !=6 ? 'border-split' : ''">
      <span class="f-22"><b>光泽县芝麻镇芝麻村15号</b></span>
      <span class="mar-tb-10">道路裂开</span>
      <div class="img-wrapper pu-row">
        <img
          width="100"
          class="mar-r-5"
          v-for="(pic, index) in 7"
          src="../../assets/imgs/bad-bg.png"
          :key="index"
          :preview="index" preview-text="描述文字"
          alt=""
        />
      </div>
      <div class="mar-t-10 pu-row">
        <img src="../../assets/imgs/bad-bg.png" class="avatar-sm" alt="">
        <span class="mar-l-5">陈某某</span>
        <span class="f-gray" style="margin-left: 30px">15:21</span>
      </div>
    </div>
    
    <bottomTabs></bottomTabs>
  </div>
</template>

<script>
// import han
export default {

}
</script>

<style>

</style>