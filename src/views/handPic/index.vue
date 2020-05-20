<template>
  <div>
    <!-- <navBar :title="'随手拍'" :isBack="false"></navBar> -->
    <div v-for="(item,index) in handList" :key="index" class="pad-lr-10 pad-tb-10 pu-column al-start" :class="index !=6 ? 'border-split' : ''">
      <span class="f-22"><b>{{item.name}}</b></span>
      <span class="mar-tb-10">{{item.content}}</span>
      <div class="img-wrapper pu-row">
        <templat v-if="item.images.length != 0">
          <img
            width="100"
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
      <div class="mar-t-10 pu-row">
        <img src="../../assets/imgs/bad-bg.png" class="avatar-sm" alt="">
        <span class="mar-l-5">{{item.username}}</span>
        <span class="f-gray" style="margin-left: 30px">{{time(item.uptime)}}</span>
      </div>
    </div>
    
    <bottomTabs></bottomTabs>
  </div>
</template>

<script>
import {getHandListAPI} from '../../api/handPic'
export default {
  data() {
    return {
      handList: [],
      page:1,
    }
  },
  mounted() {
    this.nav('随手拍');
    this.userinfo = this.localData('get','userinfo');
    this.getHandList()
  },
  methods:{
    time(time) {
      return new Date(time*1000).getHours() +':'+ new Date(time*1000).getMinutes()
    },
    getHandList(){
      getHandListAPI({phone:this.userinfo ,type:'all',page:this.page}).then(res => {
        this.handList = res.data
        console.log(this.handList)
      })
    }
  }
}
</script>

<style lang="less" scope>
.van-empty{
  padding: 0 !important;
}
</style>