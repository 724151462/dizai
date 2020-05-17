<template>
  <div>
    <navBar :title="'巡查签到记录'"></navBar>
    <van-tabs @click="recodeChange">
      <van-tab title="巡查记录">
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
          <div class="mar-t-10 pu-row pu-row-sb" style="width: 100%">
            <span class="f-gray">15:21</span>
            <span style="color:#5ABEEF">删除</span>
          </div>
        </div>
        <div class="no-more">
          <img src="../../assets/imgs/no-more.png" alt="" />
        </div>
      </van-tab>
      <van-tab title="按地灾点">
        <van-cell title="光泽县芝麻村芝麻镇" is-link />
        <van-cell title="光泽县李洋乡后洋" is-link />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  methods: {
    recordChange(name, title) {
      switch (title) {
        case "巡查记录":
          break;
        case "按地灾点":
          break;
      }
    },
  },
};
</script>

<style></style>
