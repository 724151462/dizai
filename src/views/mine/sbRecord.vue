<template>
  <div>
    <navBar :title="'灾（险）情上报记录'"></navBar>
    <van-tabs @click="sbChange" class="pu-bg">
      <van-tab title="上报">
        <div v-for="(item, index) in 4" :class="['sb-item', 'pad-tb-10', index == 0 ? 'border-t' : '']" :key="index">
          <div class="pad-lr-10 pu-row pu-row-sb">
            <span style="font-size: 20px; font-weight: 600">光泽镇芝麻村芝麻镇15号</span>
            <van-icon name="arrow" />
          </div>
          <div class="mar-t-10 pu-row pu-row-sb pad-lr-10">
            <div class="pu-row">
              <img src="../../assets/imgs/bad-bg.png" class="avatar-sm" alt="">
              <span class="mar-l-5">陈某某</span>
              <span class="f-gray" style="margin-left: 30px">15:21</span>
            </div>
            <div class="status">
              <span style="color: #00A0DF">已审核通过</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="办结">
        
      </van-tab>
      <van-tab title="列入">
        
      </van-tab>
      <van-tab title="全部">
        
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  methods: {
    sbChange() {

    }
  }
};
</script>

<style lang="less" scope>
  .border-t{
    border-top: 15px solid #f8f8fb !important;
  }
  .sb-item{
    background-color: #fff;
    border-top: 5px solid #f8f8fb;
  }
</style>
