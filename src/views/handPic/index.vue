<template>
  <div>
    <!-- <navBar :title="'随手拍'" :isBack="false"></navBar> -->
    <div v-for="(item,index) in handList" :key="index" class="pad-lr-10 pad-tb-10 pu-column al-start" :class="index !=6 ? 'border-split' : ''">
      <span class="f-22"><b>{{item.name}}</b></span>
      <span class="mar-tb-10">{{item.content}}</span>
      <div class="img-wrapper pu-row">
        <template v-if="item.images.length != 0">
          <img
            width="100"
            class="mar-r-5"
            v-for="(pic, index) in item.images"
            :src="pic"
            :key="index"
            :preview="index" preview-text="描述文字"
            alt=""
          />
        </template>
        <van-empty v-else class="imgdx" description="暂无图片" />
      </div>
      <div class="mar-t-10 pu-row" @click="$router.push({path:'/personal/handPic',query:{mobile:item.mobile}})">
        <img src="../../assets/imgs/bad-bg.png" class="avatar-sm" alt="">
        <span class="mar-l-5">{{item.username}}</span>
        <span class="f-gray" style="margin-left: 30px">{{time(item.uptime)}}</span>
      </div>
    </div>
    <img v-if="page >= maxPage" src="../../assets/imgs/noGduo.png" alt="">
    <p v-if="page >= maxPage" style="color:#cfcfcf;font-size:20px;margin:5px 0">没有更多了</p><br><br><br>
    <div class="uploadHand" @click="to()">＋</div>
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
      maxPage:null
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
      getHandListAPI({phone:this.userinfo.phone ,type:'all',page:this.page}).then(res => {
        this.handList = res.data
        this.maxPage = res.page.all;
        console.log(res)
      })
    },
    to(){
      this.$router.push({path: '/handPic/upload'})
    }
  }
}
</script>

<style lang="less" scope>
.van-empty{
  padding: 0 !important;
}
.uploadHand{
  position: fixed;
  right: 1.5rem;
  bottom: 5rem;
  background: linear-gradient(to right, rgb(255, 166, 163), rgb(238, 77, 71));
  box-shadow: 0px 0px 20px rgb(255, 166, 163);
  color: white;
  font-size: 3rem;
  text-align: center;
  width: 4rem;
  height: 4rem;
  line-height:4rem;
  border-radius: 100%;
}
.imgdx{
  width:200px;
  margin: 0 auto;
}
</style>