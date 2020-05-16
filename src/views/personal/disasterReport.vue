<template>
  <div>
    <personalHead></personalHead>
    <div
      class="pu-column al-start pad-tb-5 pad-lr-10 bg-white"
      style="align-items: flex-start;"
      v-for="(item,index) in 5"
      :key="index"
    >
      <h3>2020年第3轮降雨(7月1日-9月31日)</h3>
      <div
        class="pu-column dz-detail pad-tb-10"
        style="align-items: flex-start;"
      >
        <div class="mar-tb-5">
          <span class="f-gray">4月1日&nbsp;&nbsp;19:21</span>
          <span style="margin-left: 200px;"><van-tag plain>已上报</van-tag></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style>
  
</style>