<template>
  <div>
    <!-- <navBar :title="'群众随手拍处理'"></navBar> -->
    <van-tabs @click="qzHandChange">
      <van-tab title="未处理">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
        <div
          v-for="(item, index) in unprocessedArr"
          :key="index"
          class="pad20 pu-column al-start"
          :class="index != unprocessedArr.length-1 ? 'border-split' : ''"
        >
          <span class="f-22"><b>{{item.name}}</b></span>
          <span class="mar-tb-10">{{item.content}}</span>
          <div class="img-wrapper pu-row">
            <templat v-if="item.images.length != 0" class="xxx">
         <img
              class="mar-r-5"
              v-for="(pic, index) in item.images"
              :src="pic"
              :key="index"
              :preview="index"
              preview-text="描述文字"
              alt=""
            />
        </templat>
        <van-empty v-else description="暂无图片" />
            
          </div>
          <div class="mar-t-10 pu-row pu-row-sb" style="width:100%">
            <div class="pu-row" @click="to(item.mobile)">
              <img :src="item.avatar" class="avatar-sm" alt="">
              <span class="mar-l-5">{{item.username}}</span>
              <span class="f-gray" style="margin-left: 30px">{{timestampToTime(item.uptime)}}</span>
            </div>
            <div class="operation">
              <van-button v-if="userinfo.position == '乡镇管理员'" type="danger" size="mini" @click="del(item.id)">删除</van-button>
              <van-button v-if="userinfo.position == '区县管理员' || userinfo.position == '区市管理员'" type="info" size="mini" @click="ok(item.id)">审核通过</van-button>
            </div>
          </div>
        </div>
        </van-list>
        <img v-if="page >= maxPage" src="../../assets/imgs/noGduo.png" alt="">
        <p v-if="page >= maxPage" style="color:#cfcfcf;font-size:20px;margin:5px 0">没有更多了</p>
      </van-tab>
      <van-tab title="已处理">
        <van-list
          v-model="loading2"
          :finished="finished2"
          @load="onLoad2"
        >
        <div
          v-for="(item, index) in processedArr"
          :key="index"
          class="pad20 pu-column al-start"
          :class="index != processedArr.length-1 ? 'border-split' : ''"
        >
          <span class="f-22"><b>{{item.name}}</b></span>
          <span class="mar-tb-10">{{item.content}}</span>
          <div class="img-wrapper pu-row">
             <template v-if="item.images.length != 0" class="xxx">
              <img
              class="mar-r-5"
              v-for="(pic, index) in item.images"
              :src="pic"
              :key="index"
              :preview="index"
              preview-text="描述文字"
              alt=""
            />
            </template>
            <van-empty v-else description="暂无图片" />
            
          </div>
          <div class="mar-t-10 pu-row pu-row-sb" style="width:100%">
            <div class="pu-row" @click="to(item.mobile)">
              <img :src="item.avatar" class="avatar-sm" alt="">
              <span class="mar-l-5">{{item.username}}</span>
              <span class="f-gray" style="margin-left: 30px">{{timestampToTime(item.uptime)}}</span>
            </div>
            <div class="status">
              <span :style="item.status=='已删除'?'color: red;':'color: #00A0DF;'">{{item.status}}</span>
            </div>
          </div>
        </div>
        </van-list>
        <img v-if="page2 >= maxPage2" src="../../assets/imgs/noGduo.png" alt="">
        <p v-if="page2 >= maxPage2" style="color:#cfcfcf;font-size:20px;margin:5px 0">没有更多了</p>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {getMyReadilyList,delReadilyInfo,auditReadilyInfo} from '../../api/mine'
export default {
   data() {
    return {
      processedArr:[],
      unprocessedArr:[],
      loading: false,
      finished: false,
      page:1,
      loading2: false,
      finished2: false,
      page2:1,
      type:'未处理',
      maxPage2:null,
      maxPage:null
    }
  },
  mounted() {
    this.nav('群众随手拍处理');
    this.userinfo = this.localData('get','userinfo');
  },
  methods:{
    qzHandChange(name, title) {
      switch (title) {
        case "未处理":
          this.type="未处理";
          this.page=1;
          this.finished = false;
          this.unprocessedArr = [];
          this.onLoad();
          break;
        case "已处理":
          this.type="已处理";
          this.page2=1;
          this.finished2 = false;
          this.processedArr = [];
          this.onLoad2();
          break;
      }
    },
    onLoad() {
      // 异步更新数据
      getMyReadilyList({phone:this.userinfo.phone ,type:this.type,page:this.page}).then(res => {
        console.log(res)
        // res.id = id
        if(res.data.length >= 1){
          this.unprocessedArr.push(...res.data);
          console.log(res.data);
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
    onLoad2() {
      // 异步更新数据
      getMyReadilyList({phone:this.userinfo.phone ,type:this.type,page:this.page2}).then(res => {
        console.log(res)
        // res.id = id
        if(res.data.length >= 1){
          this.processedArr.push(...res.data);
        }
        this.page2 += 1;
        this.maxPage2 = res.page.all;
        // 加载状态结束
        this.loading2 = false;
        // 数据全部加载完成
        if (this.page2 > res.page.all) {
          this.finished2 = true;
        }
      })
    },
    del(id){
      this.$dialog.confirm({
        title: '删除随手拍',
        message: '是否确认删除该随手拍!',
      })
      .then(() => {
        // on confirm
        delReadilyInfo({id:id}).then(res => {
          console.log(res);
          if(res.status == 'fail'){
             this.$toast.fail(res.msg);
          }else if(res.status == 'success'){
            for(var i = 0; i < this.unprocessedArr.length; i++){
              if(this.unprocessedArr[i].id === id){
                  this.unprocessedArr.splice(i,1);
              }
            }
            this.$toast.success(res.msg);
          } 
        })
      })
      .catch(() => {
        // on cancel
      });
     
    },
    ok(id){
      this.$dialog.confirm({
        title: '随手拍审核',
        message: '是否确认审核通过该随手拍!',
      })
      .then(() => {
        // on confirm
        auditReadilyInfo({id:id}).then(res => {
          console.log(res);
          if(res.status == 'fail'){
             this.$toast.fail(res.msg);
          }else if(res.status == 'success'){
            for(var i = 0; i < this.unprocessedArr.length; i++){
              if(this.unprocessedArr[i].id === id){
                  this.unprocessedArr.splice(i,1);
              }
            }
            this.$toast.success(res.msg);
          } 
        })
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
    },
    to(mobile){
      this.$router.push({path: '/personal/handPic',query:{mobile:mobile}})
    }
  }
  
}
</script>

<style lang="less">
.img-wrapper{
  .xxx{
    display: flex;
  flex-direction:  row ;
}
  img{
    height: 100px;
    width: auto;
  }
}
.van-empty__image {
    width: 160px;
    height: auto;
}
.pad20{
  padding: 20px;
}
</style>