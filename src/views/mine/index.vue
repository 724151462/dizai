<template>
  <div class="huise">
    <!-- <navBar :title="'我的'" :isBack="false"></navBar> -->
    <div class="mine-base pu-row">
      <div class="pu-row">
        <div class="pu-column al-start left-info">
          <span>
            {{myInfo.name}}
            <span>{{myInfo.position}}</span>
          </span>
          <span class="mar-t-10">单位：{{myInfo.unit}}</span>
          <span>管辖范围：{{myInfo.range}}</span>
        </div>
        <div class="right-info pu-row">
          <img width="80" height="80" :src="myInfo.avatar" alt="">
          <van-icon class="mar-l-10" @click="toDetail" name="arrow" />
        </div>
      </div>
    </div>
    <div v-if='userinfo'>
      <van-cell title="我的随手拍" is-link :value="num.readily" @click="to('/mine/handPic')" />
      <van-cell v-if="userinfo.position != '群众'" title="巡查签到" is-link  @click="to('/mine/toursignrecord')" :value="num.patrol?num.patrol:0" />
      <van-cell v-if="userinfo.position != '群众' && userinfo.position != '社区管理员'" title="灾（险）情速报" is-link @click="to('/mine/quickreport')" :value="num.reporting?num.reporting:0" />
      <van-cell v-if="userinfo.position != '群众'" title="灾（险）情上报" is-link @click="to('/mine/reported')" :value="num.schedule?num.schedule:0" />
      <br>
      <van-cell v-if="userinfo.position != '群众'" title="群众随手拍处理" is-link @click="to('/mine/qzHandPic')" :value="num.allreadily?num.allreadily:0" />
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
      myInfo: {},
      num:{},
      userinfo:null
    }
  },
  mounted() {
    this.nav('我的');
    this.userinfo = this.localData('get','userinfo');
    this.getMyIndex()
  },
  methods:{
    getMyIndex() {
      getMyIndexAPI({phone: this.userinfo.phone }).then(res => {
        console.log(res)
        this.myInfo = res.my;
        this.num = {
          readily:res.readily,
          patrol:res.patrol,
          reporting:res.reporting,
          schedule:res.schedule,
          allreadily:res.allreadily
        }
        console.log(this.num);
      })
    },
    toDetail() {
      this.$router.push({path: '/mine/detail',query:{id:this.myInfo.id}})
    },
    to(url){
      this.$router.push({path: url})
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
      margin-left:40px;
      img{
        border-radius: @border-radius-max;
      }
    }
  }
}
.left-info{
  width: 55vw;
}
.left-info> :first-child{
  font-size: @font-size-xlg;
  font-weight: @font-weight-bold;
}
.left-info > span > span{
  font-size: 13px;
}
.van-cell__value{
  font-weight: bold;
  color: #000;
}
.partment{
  margin-top: 200px;
  color: @gray-5;
}
.huise{
  background-color: #f8f8f8;
  min-height: 100vh;
}
</style>