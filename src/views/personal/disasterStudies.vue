<template>
  <div>
    <personalHead></personalHead>
    <div
      class="pu-column al-start pad-tb-5 pad-lr-10 bg-white"
      style="align-items: flex-start;"
      v-for="(item,index) in 3"
      :key="index"
    >
      <h3>2020年第3轮降雨(7月1日-9月31日)</h3>
      <div
        class="pu-column dz-detail pad-tb-10"
        style="align-items: flex-start;"
      >
        <div class="mar-tb-5">
          <span class="f-gray">灾情数量</span><span> 12处</span>
          <span class="f-gray" style="margin-left: 50px">险情数量</span>
          <span> 9处 </span>
        </div>
        <div class="mar-tb-5">
          <span class="f-gray">转移人数</span><span> 1204人</span>
          <span class="f-gray" style="margin-left: 50px">巡查地灾点</span>
          <span> 1524处 </span>
        </div>
        <div class="mar-tb-5">
          <span class="f-gray">巡查高陡边坡</span><span> 154次</span>
          <span class="f-gray" style="margin-left: 50px">巡查人次</span>
          <span> 584次 </span>
        </div>
        <div class="mar-tb-5">
          <span class="f-gray">出动应急技术人员人次</span>
          <span> 201人 </span>
        </div>
        <div class="mar-tb-10">
          <span class="f-gray">光泽县止马镇</span>
          <span style="margin-left: 150px;"> 7月13日&nbsp;&nbsp;19:54 </span>
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
  .order-top,.order-bottom{
		padding: 0px 20px;
		margin-bottom: 5px;
	}
	.order-top{
		padding-bottom: 5px;
  }
	.order-status{
		display: flex;
		justify-content: space-between;
		margin: 5px 0;
	}
</style>