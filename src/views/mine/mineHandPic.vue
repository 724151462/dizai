<template>
  <div>
    <!-- <navBar :title="'我的随手拍'"></navBar> -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div 
      v-for="(item,index) in list" 
      :key="index" 
      class="pad-lr-10 pad-tb-10 pu-column al-start" 
      :class="index !=6 ? 'border-split' : ''">
        <span class="f-22"><b>{{item.name}}</b></span>
        <span class="mar-tb-10">{{item.content}}</span>
        <div class="img-wrapper pu-row">
          <templat v-if="item.images.length != 0" class="xxx">
          <img
            class="mar-r-5"
            v-for="(pic, index) in item.images"
            :src="pic"
            :key="index"
            :preview="index" preview-text="描述文字"
            alt=""
          />
        </templat>
        <van-empty v-else description="暂无图片" />
          
        </div>
        <div class="mar-t-10 pu-row pu-row-sb" style="width: 100%">
          <span class="f-gray">{{timestampToTime(item.uptime)}}</span>
          <span style="color:#5ABEEF" @click="del(item.id)">删除</span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import {getMyReadilyList,delReadilyInfo} from '../../api/mine'
export default {
  data() {
    return {
      list:[],
      loading: false,
      finished: false,
      page:1,
    }
  },
  methods:{
    onLoad() {
      // 异步更新数据
      getMyReadilyList({phone:this.userinfo ,type:"",page:this.page}).then(res => {
        console.log(res)
        // res.id = id
        if(res.data.length >= 1){
          this.list.push(...res.data);
        }
        
        this.page += 1;
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.page > res.page.all) {
          this.finished = true;
        }
      })
    },
    del(id){
      this.$dialog.confirm({
        title: '删除随手拍',
        message: '是否确认删除该随手拍',
      })
      .then(() => {
        // on confirm
        delReadilyInfo({id:id}).then(res => {
          console.log(res);
          if(res.status == 'fail'){
             this.$toast.fail(res.msg);
          }else if(res.status == 'success'){
            for(var i = 0; i < this.list.length; i++){
              if(this.list[i].id === id){
                  this.list.splice(i,1);
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
    timestampToTime(timestamp) {
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  },
  mounted(){
    this.nav('我的随手拍');
    this.userinfo = this.localData('get','userinfo');
  }
  
}
</script>

<style lang="less" scope>
.img-wrapper{
  overflow-x: scroll;
  .xxx{
    display: flex;
  flex-direction:  row ;
}
  img{
    height: 100px;
    width: auto;
  }
}
.no-more{
  background-color: #F8F8FB;
}
</style>