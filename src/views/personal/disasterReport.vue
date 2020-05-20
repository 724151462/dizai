<template>
  <div>
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
        </div>
      </div>
    </div>
    <div class="handPic-info">
      <ul class="chooser-list">
        <li 
          @click="$router.push({path: '/personal/handPic',query:{mobile:$route.query.mobile}})"
        >
          <span v-if="this.num.readily != undefined">{{this.num.readily}}</span>
          <span v-else>0</span>
          <div>随手拍</div>
        </li>
        <li
          @click="$router.push({path: '/personal/chenkIn',query:{mobile:$route.query.mobile}})"
        >
          <span v-if="this.num.patrol != undefined">{{this.num.patrol}}</span>
          <span v-else>0</span>
          <div>巡查签到</div>
        </li>
        <li
          @click="$router.push({path: '/personal/disasterStudies',query:{mobile:$route.query.mobile}})"
        >
          <span v-if="this.num.reporting != undefined">{{this.num.reporting}}</span>
          <span v-else>0</span>
          <div>灾情速报</div>
        </li>
        <li
          :class="['active']"   
          @click="$router.push({path: '/personal/disasterReport',query:{mobile:$route.query.mobile}})"
        >
          <span v-if="this.num.schedule != undefined">{{this.num.schedule}}</span>
          <span v-else>0</span>
          <div>灾情上报</div>
        </li>
      </ul>
    </div>
    <!-- <van-tabs @click="recordChange"> -->
    <div class="ctm_list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check='false'
      >
        <div class="ctm" v-for="(item,i) in list" :key="i">
          <div class="ctm_title">{{item.name}}</div>
          <div class="ctm_info">
            <time>{{timestampToTime(item.happen_time)}}</time>
            <span v-if="item.status=='已删除'" class="ctm_type ysb" >已删除</span>
            <span v-if="item.status=='已上报'" class="ctm_type ysb" >已上报</span>
            <span v-if="item.status=='撤销办结'" class="ctm_type cxbj" >撤销办结</span>
            <span v-if="item.status=='已列入'" class="ctm_type ylr" >已列入</span>
            <span v-if="item.status=='已修改'" class="ctm_type yxg" >已修改</span>
            <span v-if="item.status=='已办结'" class="ctm_type ybj" >已办结</span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import {getMyIndexAPI,getScheduleList} from '../../api/mine'
export default {
  data(){
    return{
      myInfo: {},
      num:{},
      type:'all',
      page:1,
      finished:false,
      loading:false,
      list:[],
    }
  },
  mounted() {
    this.userinfo = this.localData('get','userinfo');
    this.getMyIndex()
    this.onLoad();
  },
  methods: {
    getMyIndex() {
      getMyIndexAPI({phone: this.$route.query.mobile}).then(res => {
        console.log(res)
        this.myInfo = res.my;
        this.num = {
          readily:res.readily,
          patrol:res.patrol,
          reporting:res.reporting,
          schedule:res.schedule,
          allreadilye:res.allreadilye
        }
      })
    },
    onLoad() {
      // 异步更新数据
      getScheduleList({phone:this.$route.query.mobile,type:this.type,page:this.page}).then(res => {
        // res.id = id
        if(res.data.length > 0){
          if(this.type == 'all') this.list.push(...res.data);
          this.page += 1;
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          if (this.page > res.page.all) {
            this.finished = true;
          }
        }else{
          this.loading = false;
          this.finished = true;
        }
        
      })
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '年';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
      var D = date.getDate() + '日 ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  },
}

</script>
<style lang="less" scope>
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
.handPic-info{
  padding: 8px 0;
  font-size: 14px;
}
.handPic-info ul{
  display: flex;
  justify-content: space-around;
}
.handPic-info ul li{
  width: 70px;
  height: 40px;
}
.active{
  background-color: #F8F8FB;
}
.img-wrapper{
  overflow-x: auto;
  img{
    height: 100px;
    width: 100px;
  }
}
.no-more{
  background-color: #F8F8FB;
}
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
.ctm_list{
  padding-top: 15px;
  background-color: #f6f6f6;
}
.ctm{
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  margin-bottom: 5px;
  background-color: white;
}
.ctm_title{
  font-size: 22px;
  font-weight: 600;
  text-align: left;
  margin-bottom: 10px;
  position: relative;
}
.ctm_title::after{
  content: "";
  position: absolute;
  top: 12px;
  right: 7px;
  width: 7px;
  height: 7px;
  border-top: 2px solid #aaaaaa;
  border-right: 2px solid #aaaaaa;
  transform: rotate(45deg);
}
.ctm_info{
  text-align: left;
  height: 30px;
  line-height: 30px;
}
.ctm_info img{
  width: 25px;
  height: 25px;
  border-radius: 100%;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle;
}
.ctm_info span{
  font-size: 16px;
  color: #000;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle;
}
.ctm_info time{
  font-size: 14px;
  color: #aaaaaa;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle;
}
.ctm_type{
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle;
  font-size: 14px !important;
  float: right;
  height: 25px;
  line-height: 25px;
  border-radius: 5px;
  padding: 0 5px;
  margin-top: 5px;
}
.ysb{
  color: rgb(211, 198, 198) !important;
  border: 1px solid rgb(211, 198, 198) !important;
}
.yxg{
  color: rgb(255, 202, 2) !important;
  border: 1px solid rgb(255, 202, 2) !important;
}
.ybj{
  color: rgb(31, 2, 255) !important;
  border: 1px solid rgb(31, 2, 255) !important;
}
.ylr{
  color: rgb(38, 234, 245) !important;
  border: 1px solid rgb(38, 234, 245) !important;
}
.cxbj{
  color: rgb(243, 60, 60) !important;
  border: 1px solid rgb(243, 60, 60) !important;
}
</style>