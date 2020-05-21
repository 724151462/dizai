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
          :class="['active']"  
          @click="$router.push({path: '/personal/chenkIn',query:{mobile:$route.query.mobile}})"
        >
          <span v-if="this.num.patrol != undefined">{{this.num.patrol}}</span>
          <span v-else>0</span>
          <div>巡查签到</div>
        </li>
        <li @click="$router.push({path: '/personal/disasterStudies',query:{mobile:$route.query.mobile}})">
          <span v-if="this.num.reporting != undefined">{{this.num.reporting}}</span>
          <span v-else>0</span>
          <div>灾情速报</div>
        </li>
        <li @click="$router.push({path: '/personal/disasterReport',query:{mobile:$route.query.mobile}})">
          <span v-if="this.num.schedule != undefined">{{this.num.schedule}}</span>
          <span v-else>0</span>
          <div>灾情上报</div>
        </li>
      </ul>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
    >
      <div 
      v-for="(item,index) in list" 
      :key="index" 
      class="pad20 pu-column al-start" 
      :class="index != list.length-1 ? 'border-split' : ''">
        <span class="f-22"><b>{{item.name}}</b></span>
        <span class="mar-tb-10">{{item.content}}</span>
        <div class="img-wrapper pu-row">
          <template v-if="item.images.length != 0" class="xxx">
            <img
              class="mar-r-5"
              v-for="(pic, index) in item.images"
              :src="pic"
              :key="index"
              :preview="index" preview-text="描述文字"
              alt=""
            />
          </template>
          <van-empty v-else description="暂无图片" />
        </div>
        <div class="mar-t-10 pu-row pu-row-sb" style="width: 100%">
          <span class="f-gray">{{timestampToTime(item.create_time)}}</span>
        </div>
      </div>
    </van-list>
    <img v-if="page >= maxPage" src="../../assets/imgs/noGduo.png" alt="">
    <p v-if="page >= maxPage" style="color:#cfcfcf;font-size:20px;margin:5px 0">没有更多了</p>
  </div>
</template>

<script>
import {getMyIndexAPI,patrolList} from '../../api/mine'
export default {
  data() {
    return {
      list:[],
      loading: false,
      finished: false,
      page:1,
      myInfo: {},
      num:{},
      maxPage:null
    }
  },
  mounted() {
    this.userinfo = this.localData('get','userinfo');
    this.getMyIndex()
  },
  methods:{
    getMyIndex() {
      getMyIndexAPI({phone: this.$route.query.mobile}).then(res => {
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
      patrolList({phone:this.userinfo.phone,type:"",page:this.page}).then(res => {
        // res.id = id
        if(res.data.length >= 1){
          this.list.push(...res.data);
        }
        this.maxPage = res.page.all;
        this.page += 1;
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.page > res.page.all) {
          this.finished = true;
        }
      })
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp* 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  }
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
.pad20{
  padding: 20px;
}
</style>