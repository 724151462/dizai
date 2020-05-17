<template>
  <div>
    <navBar :title="'群众随手拍处理'"></navBar>
    <van-tabs @click="qzHandChange">
      <van-tab title="未处理">
        <div
          v-for="(item, index) in 6"
          :key="index"
          class="pad-lr-10 pad-tb-10 pu-column al-start"
          :class="index != 6 ? 'border-split' : ''"
        >
          <span class="f-22"><b>光泽县芝麻镇芝麻村15号</b></span>
          <span class="mar-tb-10">道路裂开</span>
          <div class="img-wrapper pu-row">
            <img
              class="mar-r-5"
              v-for="(pic, index) in 7"
              src="../../assets/imgs/bad-bg.png"
              :key="index"
              :preview="index"
              preview-text="描述文字"
              alt=""
            />
          </div>
          <div class="mar-t-10 pu-row pu-row-sb" style="width:100%">
            <div class="pu-row">
              <img src="../../assets/imgs/bad-bg.png" class="avatar-sm" alt="">
              <span class="mar-l-5">陈某某</span>
              <span class="f-gray" style="margin-left: 30px">15:21</span>
            </div>
            <div class="operation">
              <van-button type="danger" size="mini">删除</van-button>
              <van-button type="info" size="mini">审核通过</van-button>
            </div>
          </div>
        </div>
        <div class="no-more">
          <img src="../../assets/imgs/no-more.png" alt="" />
        </div>
      </van-tab>
      <van-tab title="已处理">
        <div
          v-for="(item, index) in 6"
          :key="index"
          class="pad-lr-10 pad-tb-10 pu-column al-start"
          :class="index != 6 ? 'border-split' : ''"
        >
          <span class="f-22"><b>光泽县芝麻镇芝麻村15号</b></span>
          <span class="mar-tb-10">道路裂开</span>
          <div class="img-wrapper pu-row">
            <img
              class="mar-r-5"
              v-for="(pic, index) in 7"
              src="../../assets/imgs/bad-bg.png"
              :key="index"
              :preview="index"
              preview-text="描述文字"
              alt=""
            />
          </div>
          <div class="mar-t-10 pu-row pu-row-sb" style="width:100%">
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
        <div class="no-more">
          <img src="../../assets/imgs/no-more.png" alt="" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  qzHandChange(name, title) {
    switch (title) {
      case "未处理":
        break;
      case "已处理":
        break;
    }
  },
}
</script>

<style lang="less">
.img-wrapper{
  img{
    height: 100px;
    width: 100px;
  }
}
</style>