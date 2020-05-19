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
    <div class="record_list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div 
          class="record" 
          v-for="(item,i) in list" 
          :key="i"
          @click="to(item.id)"
        >
          <div class="r_title">{{item.name}}</div>
          <div>
            <div class="amount">
              <span class="amount_text">灾情数量</span>
              <span class="amount_num">{{item.disaster_number}}处</span>
            </div>
            <div class="amount">
              <span class="amount_text">险情数量</span>
              <span class="amount_num">{{item.danger_number}}处</span>
            </div>
            <div class="amount">
              <span class="amount_text">转移人数</span>
              <span class="amount_num">{{item.move_people}}人</span>
            </div>
            <div class="amount">
              <span class="amount_text">巡查地灾点</span>
              <span class="amount_num">{{item.geologic_hazard_number}}次</span>
            </div>
            <div class="amount">
              <span class="amount_text">巡查高陡边坡</span>
              <span class="amount_num">{{item.steep_number}}次</span>
            </div>
            <div class="amount">
              <span class="amount_text">巡查人次</span>
              <span class="amount_num">{{item.patrol_number}}次</span>
            </div>
            <div class="amount" style="width:100%;">
              <span class="amount_text">出动应急技术人员人次</span>
              <span class="amount_num">{{item.dispatch_number}}人</span>
            </div>
          </div>
          <div class="r_beizhu">
            <div class="r_text"><span><van-icon name="location-o" /></span> {{item.address}}</div>
            <div class="r_time">{{timestampToTime(item.start_time)}}</div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import {getMyIndexAPI,getReportingList} from '../../api/mine'
export default {
  data(){
    return{
      myInfo: {},
      num:{},
      list:[],
      loading:false,
      finished:false,
      page:1,
    }
  },
  mounted() {
    this.userinfo = this.localData('get','userinfo');
    this.getMyIndex()
  },
  methods: {
    getMyIndex() {
      getMyIndexAPI({phone: this.userinfo }).then(res => {
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
    onLoad(){
        getReportingList({phone:this.userinfo,country:'',county:'',page:this.page}).then(res => {
        // res.id = id
        if(res.data.length > 0){
          this.list.push(...res.data);
          console.log(this.list);
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
  .record_list{
    background-color: rgb(245, 239, 239);
  }
  .record{
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: white;
    margin-bottom: 5px;
  }
  .r_title{
    font-size: 20px;
    font-weight: 600;
    text-align: left;
    padding: 10px 0;
    position: relative;
  }
  .r_title::after{
    content: "";
    position: absolute;
    top: 20px;
    right: 7px;
    width: 7px;
    height: 7px;
    border-top: 2px solid #aaaaaa;
    border-right: 2px solid #aaaaaa;
    transform: rotate(45deg);
  }
  .amount{
    width: 50%;
    display: inline-block;
    text-align: left;
    font-size: 16px;
    margin: 5px 0;
  }
  .amount_text{
    color: #aea7a7;
    padding-right:10px ;
  }
  .amount_num{
    color: #000;
  }
  .r_beizhu{
    padding: 15px 0;
    font-size: 16px;
  }
  .r_text{
    width: 50%;
    display: inline-block;
    text-align: left;
    color: #000;
  }
  .r_text span{
    color: red;
  }
  .r_time{
    width: 50%;
    display: inline-block;
    text-align: right;
    color: #aea7a7;
  }
</style>