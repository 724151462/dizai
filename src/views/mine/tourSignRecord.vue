<template>
  <div>
    <!-- <navBar :title="'巡查签到记录'"></navBar> -->
    <van-tabs @click="recodeChange">
      <van-tab title="巡查记录">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
        <div
          v-for="(item, index) in arr"
          :key="index"
          class="pad-lr-10 pad-tb-10 pu-column al-start"
        >
          <span class="f-22" @click="to(item.main_id)"><b>{{item.name}}</b></span>
          <span class="mar-tb-10" @click="to(item.main_id)">{{item.content}}</span>
          <div class="img-wrapper pu-row" @click="to(item.main_id)">
            <templat v-if="item.image.length != 0" class="xxx">
                <img
              class="mar-r-5 aaaa"
              v-for="(pic, index) in item.image"
              :src="pic"
              :key="index"
              :preview="index"
              preview-text="描述文字"
              alt=""
            />
                </templat>
         <van-empty v-else description="暂无图片" />
           
          </div>
          <div class="mar-t-10 pu-row pu-row-sb" style="width: 100%">
            <span class="f-gray" >15:21</span>
            <span style="color:#5ABEEF">删除</span>
          </div>
        </div>
        </van-list>
      </van-tab>
      <van-tab title="按地灾点">
        <van-list
          v-model="loading2"
          :finished="finished2"
          finished-text="没有更多了"
          @load="onLoad2"
        >
          <van-cell @click="to(item.id)" v-for="(item,i) in arr2" :title="item.address" :key="i" is-link />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {patrolList,disasterPatrolList} from '../../api/mine'

export default {
  data(){
    return {
      arr:[],
      loading:false,
      finished:false,
      page:1,
      arr2:[],
      loading2:false,
      finished2:false,
      page2:1,
    }
  },
  methods: {
    recodeChange(name, title) {
      switch (title) {
        case "巡查记录":
          break;
        case "按地灾点":
          break;
      }
    },
    to(id) {
      this.$router.push({path: '/mine/toursignrecordparticulars',query:{id:id}})
    },
    onLoad() {
      // 异步更新数据
      patrolList({phone:this.userinfo,page:this.page}).then(res => {
        console.log(res);
        if(res.data.length > 0){
          this.arr.push(...res.data);
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
    onLoad2(){
      disasterPatrolList({phone:this.userinfo,page:this.page2}).then(res => {
        console.log(res);
        if(res.data.length > 0){
          this.arr2.push(...res.data);
          // console.log(res.data);
          this.page2 += 1;
          // 加载状态结束
          this.loading2 = false;
          // 数据全部加载完成
          if (this.page2 > res.page.all) {
            this.finished2 = true;
          }
        }else{
          this.loading2 = false;
          this.finished2 = true;
        }
        
      })
    }
  },
  mounted(){
    this.nav('巡查签到记录');
    this.userinfo = this.localData('get','userinfo');
  }
};
</script>

<style>
.aaaa{
  height: 150px;
  overflow-x: auto;
    display: flex;
}
.xxx{
    display: flex;
  flex-direction:  row ;
}
</style>
