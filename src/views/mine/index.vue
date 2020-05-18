<template>
  <div>
    <navBar :title="'我的'" :isBack="false"></navBar>
    <div class="mine-base pu-row">
      <div class="pu-row">
        <div class="pu-column al-start left-info">
          <span>王大仙</span>
          <span class="mar-t-10">单位：建阳区童游街道自然资源所</span>
          <span>管辖范围：南平市建阳区童游街道</span>
        </div>
        <div class="right-info pu-row">
          <img width="80" height="80" src="../../assets/imgs/avatar.png" alt="">
          <van-icon class="mar-l-10" @click="toDetail" name="arrow" />
        </div>
      </div>
    </div>
    <div>
      <van-cell class="border-b" title="我的随手拍" is-link value="6" url="/mine/handPic" />
      <van-cell class="border-b" title="巡查签到" is-link url="/mine/toursignrecord" value="12" />
      <van-cell class="border-b" title="灾（险）情速报" is-link url="/mine/quickreport" value="31" />
      <van-cell class="border-b" title="灾（险）情上报" is-link url="/mine/reported" value="23" />
      <van-cell class="border-b" title="群众随手拍处理" is-link url="/mine/qzHandPic" value="66" />
    </div>
    <div class="partment">
      <span>
        单位：建阳区童游街道自然资源所
      </span>
    </div>
    <bottomTabs></bottomTabs>
  </div>
</template>

<script>
import {getMyIndexAPI} from '../../api/mine'
export default {
  data() {
    return {
      myInfo: {}
    }
  },
  mounted() {
    this.getMyIndex()
  },
  methods:{
    getMyIndex() {
      getMyIndexAPI({phone: '123456'})
    },
    toDetail() {
      this.$router.push({path: '/mine/detail'})
    }
  }
}
</script>

<style lang="less" scoped>
.mine-base{
  background: @orange-dark;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  color: @white;
  height: 160px;
  .pu-row{
    margin-left: 20px;
    .right-info{
      margin-left:30px;
      img{
        border-radius: @border-radius-max;
      }
    }
  }
}
.left-info> :first-child{
  font-size: @font-size-xlg;
  font-weight: @font-weight-bold;
}
.van-cell__value{
  font-weight: bold;
  color: #000;
}
.partment{
  margin-top: 200px;
  color: @gray-5;
}
</style>