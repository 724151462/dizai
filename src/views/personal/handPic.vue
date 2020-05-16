<template>
  <div>
    <personalHead></personalHead>
    <div v-for="(item,index) in 3" :key="index" class="pad-lr-10 pad-tb-10 pu-column al-start mar-t-10" :class="index !=6 ? 'border-split' : ''">
      <span class="f-22"><b>光泽县止马镇止马村15号</b></span>
      <span class="mar-tb-10">路道开裂</span>
      <div class="img-wrapper pu-row">
        <img
          height="100"
          width="100"
          class="mar-r-5"
          v-for="(pic, index) in 3"
          src="../../assets/imgs/bad-bg.png"
          :key="index"
          :preview="index" preview-text="描述文字"
          alt=""
        />
      </div>
      <div class="mar-t-10 pu-row">
        <span class="f-gray">4月13日&nbsp;&nbsp;11:05</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
}
</script>

<style scope>

</style>