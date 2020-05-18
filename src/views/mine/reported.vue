<template>
  <div>
    <navBar :title="'灾(险)情上报记录'"></navBar>
    <van-tabs @click="recodeChange()">
      <van-tab title="上报">
        <div>123456</div>
      </van-tab>
      <van-tab title="办结">
          <div class="ctm_list">
            <div class="ctm" v-for="(item,i) in 6" :key="i">
                <div class="ctm_title">2020年第三轮降雨(7月1日-9月31日)</div>
                <div class="ctm_info">
                    <img src="../../assets/imgs/avatar.png" alt="">
                    <span>张某某</span>
                    <time>4月30日 9:21</time>
                </div>
            </div>
          </div>
      </van-tab>
      <van-tab title="列入">
        <div class="ctm_list">
            <div class="ctm" v-for="(item,i) in 8" :key="i">
                <div class="ctm_title">2020年第三轮降雨(7月1日-9月31日)</div>
                <div class="ctm_info">
                    <img src="../../assets/imgs/avatar.png" alt="">
                    <span>张某某</span>
                    <time>4月30日 9:21</time>
                </div>
            </div>
          </div>
      </van-tab>
      <van-tab title="全部">
        <div class="ctm_list">
            <div class="ctm" v-for="(item,i) in 6" :key="i">
                <div class="ctm_title">2020年第三轮降雨(7月1日-9月31日)</div>
                <div class="ctm_info">
                    <img src="../../assets/imgs/avatar.png" alt="">
                    <span>张某某</span>
                    <time>4月30日 9:21</time>
                    <div class="ctm_type ysb">已上报</div>
                </div>
            </div>
          </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  methods: {
    recordChange(name, title) {
      switch (title) {
        case "上报":
          break;
        case "办结":
          break;
        case "列入":
          break;
        case "全部":
          break;
      }
    },
    to(){
      this.$router.push({path: '/mine/toursignrecordparticulars'})
    }
  },
};
</script>

<style>
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
    padding: 15px 0;
    position: relative;
}
.ctm_title::after{
    content: "";
    position: absolute;
    top: 23px;
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
    padding: 10px 0;
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
    font-size: 14px;
    float: right;
    border-radius: 5px;
    color: rgb(211, 198, 198);
    border: 1px solid rgb(211, 198, 198);
    padding: 0 5px;
}
.ysb{
    color: rgb(211, 198, 198);
    border: 1px solid rgb(211, 198, 198);
}
.yxg{
    color: rgb(255, 202, 2);
    border: 1px solid rgb(255, 202, 2);
}
.ybj{
    color: rgb(31, 2, 255);
    border: 1px solid rgb(31, 2, 255);
}
.ylr{
    color: rgb(38, 234, 245);
    border: 1px solid rgb(38, 234, 245);
}
.cxzj{
    color: rgb(243, 60, 60);
    border: 1px solid rgb(243, 60, 60);
    
}
</style>
