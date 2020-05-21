<template>
  <div>
    <!-- <navBar :title="'灾(险)情上报记录'"></navBar> -->
    <van-tabs @click="recordChange">
      <van-tab title="上报">
        <div class="ctm_list">
          <van-list
          v-model="loading[0]"
          :finished="finished[0]"
          @load="onLoad"
          :immediate-check='false'
        >
          <div @click="to(item.id)"  class="ctm" v-for="(item,i) in arr" :key="i">
              <div class="ctm_title">{{item.name}}</div>
              <div class="ctm_info">
                  <img :src="item.avatar" alt="">
                  <span>{{item.username}}</span>
                  <time>{{timestampToTime(item.happen_time)}}</time>
              </div>
          </div>
          </van-list>
          <img v-if="page[0] >= maxPage[0]" src="../../assets/imgs/noGduo.png" alt="">
          <p v-if="page[0] >= maxPage[0]" style="color:#cfcfcf;font-size:20px;margin:5px 0">没有更多了</p>
        </div>
      </van-tab>
      <van-tab title="办结">
          <div class="ctm_list">
            <van-list
          v-model="loading[1]"
          :finished="finished[1]"
          @load="onLoad"
          :immediate-check='false'
        >
            <div @click="to(item.id)"  class="ctm" v-for="(item,i) in arr2" :key="i">
              <div class="ctm_title">{{item.name}}</div>
              <div class="ctm_info">
                  <img :src="item.avatar" alt="">
                  <span>{{item.username}}</span>
                  <time>{{timestampToTime(item.happen_time)}}</time>
              </div>
            </div>
            </van-list>
            <img v-if="page[1] >= maxPage[1]" src="../../assets/imgs/noGduo.png" alt="">
            <p v-if="page[1] >= maxPage[1]" style="color:#cfcfcf;font-size:20px;margin:5px 0">没有更多了</p>
          </div>
      </van-tab>
      <van-tab title="列入">
        <div class="ctm_list">
          <van-list
          v-model="loading[2]"
          :finished="finished[2]"
          @load="onLoad"
          :immediate-check='false'
        >
        
          <div @click="to(item.id)"  class="ctm" v-for="(item,i) in arr3" :key="i">
              <div class="ctm_title">{{item.name}}</div>
              <div class="ctm_info">
                  <img :src="item.avatar" alt="">
                  <span>{{item.username}}</span>
                  <time>{{timestampToTime(item.happen_time)}}</time>
              </div>
            </div>
          </van-list>
          <img v-if="page[2] >= maxPage[2]" src="../../assets/imgs/noGduo.png" alt="">
          <p v-if="page[2] >= maxPage[2]" style="color:#cfcfcf;font-size:20px;margin:5px 0">没有更多了</p>
        </div>
      </van-tab>
      <van-tab title="全部">
        <div class="ctm_list">
          <van-list
          v-model="loading[3]"
          :finished="finished[3]"
          @load="onLoad"
          :immediate-check='false'
        >
           <div @click="to(item.id)"  class="ctm" v-for="(item,i) in arr4" :key="i">
              <div class="ctm_title">{{item.name}}</div>
              <div class="ctm_info">
                  <img :src="item.avatar" alt="">
                  <span>{{item.username}}</span>
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
          <img v-if="page[3] >= maxPage[3]" src="../../assets/imgs/noGduo.png" alt="">
          <p v-if="page[3] >= maxPage[3]" style="color:#cfcfcf;font-size:20px;margin:5px 0">没有更多了</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {getScheduleList} from '../../api/mine'

export default {
  data(){
    return {
      type:'已上报',
      page:[1,1,1,1],
      finished:[false,false,false,false,],
      loading:[false,false,false,false],
      maxPage:[null,null,null,null],
      arr:[],
      arr2:[],
      arr3:[],
      arr4:[],
    }
  },
  mounted(){
    this.nav('灾(险)情上报记录');
    this.userinfo = this.localData('get','userinfo');
    this.onLoad();
  },
  methods: {
    recordChange(name, title) {
      const _this = this;
      switch (title) {
        case "上报":
          this.type="已上报";
          this.page[0]=1;
          this.arr = [];
          setTimeout(function(){
             console.log(666);
            _this.onLoad();
          },500)
          break;
        case "办结":
          this.type="已办结";
          this.page[1]=1;
          this.arr2 = [];
          setTimeout(function(){
             console.log(555);
            _this.onLoad();
          },500)
          break;
        case "列入":
          this.type="已列入";
          this.page[2]=1;
          this.arr3 = [];
          setTimeout(function(){
             console.log(444);
            _this.onLoad();
          },500)
          break;
        case "全部":
          this.type="all";
          this.page[3]=1;
          this.arr4 = [];
          setTimeout(function(){
            console.log(333);
            _this.onLoad();
          },500)
          break;
      }
      
    },
    to(id){
      this.$router.push({path: '/mine/reportedparticulars',query:{id:id}})
    },
    onLoad() {
      var num = null;
      // 异步更新数据
      if(this.type == '已上报') num = 0;
      if(this.type == '已办结') num = 1;
      if(this.type == '已列入') num = 2;
      if(this.type == 'all') num = 3;
      getScheduleList({phone:this.userinfo.phone ,type:this.type,page:this.page[num]}).then(res => {
        // res.id = id
        if(res.data.length > 0){
          if(this.type == '已上报') this.arr.push(...res.data);
          if(this.type == '已办结') this.arr2.push(...res.data);
          if(this.type == '已列入') this.arr3.push(...res.data);
          if(this.type == 'all') this.arr4.push(...res.data);
          // console.log(res.data);
          this.page[num] += 1;
          // 加载状态结束
          this.maxPage[num] = res.page.all;
          this.loading[num] = false;
          // 数据全部加载完成
          if (this.page[num] > res.page.all) {
            this.finished[num] = true;
          }
        }else{
          this.loading[num] = false;
          this.finished[num] = true;
        }
        
      })
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '年';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
      var D = date.getDate() + '日 ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  },
};
</script>

<style >
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
    margin-left: 10px;
     display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
}
.ctm_info time{
    font-size: 14px;
    color: #aaaaaa;
    margin-left: 20px;
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
