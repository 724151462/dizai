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
          @click="$router.push({path: '/personal/handPic'})"
        >
          <span v-if="this.num.readily != undefined">{{this.num.readily}}</span>
          <span v-else>0</span>
          <div>随手拍</div>
        </li>
        <li
          @click="$router.push({path: '/personal/chenkIn'})"
        >
          <span v-if="this.num.patrol != undefined">{{this.num.patrol}}</span>
          <span v-else>0</span>
          <div>巡查签到</div>
        </li>
        <li
          :class="['active']"   
          @click="$router.push({path: '/personal/disasterStudies'})"
        >
          <span v-if="this.num.reporting != undefined">{{this.num.reporting}}</span>
          <span v-else>0</span>
          <div>灾情速报</div>
        </li>
        <li
          @click="$router.push({path: '/personal/disasterReport'})"
        >
          <span v-if="this.num.schedule != undefined">{{this.num.schedule}}</span>
          <span v-else>0</span>
          <div>灾情上报</div>
        </li>
      </ul>
    </div>
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
import {getMyIndexAPI} from '../../api/mine'
export default {
  data(){
    return{
      myInfo: {},
      num:{},
    }
  },
  mounted() {
    this.getMyIndex()
  },
  methods: {
    getMyIndex() {
      getMyIndexAPI({phone: '123456'}).then(res => {
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
</style>