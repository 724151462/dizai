<template>
  <div>
    <navBar :title="'灾点详情'"></navBar>
    <div
        class="pu-column al-start pad-tb-5 pad-lr-10 bg-white"
        style="align-items: flex-start;"
      >
        <h3>光泽县芝麻镇芝麻村43号</h3>
        <div class="img-wrapper pu-row">
          <img
            height="185"
            class="mar-r-10"
            v-for="(item, index) in 4"
            src="../../assets/imgs/bad-bg.png"
            :key="index"
            alt=""
          />
        </div>
        <div
          class="pu-column dz-detail pad-tb-10"
          style="align-items: flex-start;"
        >
          <div class="mar-tb-5">
            <span class="f-gray">灾害类型</span><span> 地面塌陷</span
            ><span class="f-gray" style="margin-left: 50px">灾害规模</span
            ><span> 3米</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">防治措施</span
            ><span> 防护围挡，警告指示牌</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">威胁人数</span><span> 20</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">责任人</span><span> 王某</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">联系方式</span><span> 18459183928</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">发生时间</span
            ><span> 2020年5月12日 14:00</span>
          </div>
        </div>
        <van-button style="width: 180px;margin: 0 auto" round type="warning">具体巡查记录</van-button>
      </div>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(123)
  }
}
</script>

<style>
</style>