<template>
  <div >
    <!-- <navBar :title="'灾(险)情速报记录详情'"></navBar> -->
    <div>
        <div class="p_title">{{title}}</div>
        <div class="p_title_bz">{{address}}</div>
    </div>
    <div class="query_log">
        <van-steps active-color="red" direction="vertical" :active="0">
            <van-step v-for="(item,i) in arr" :key="i">
                <div class="r_top2">
                    <div class="r_time2"><span>{{timestampToTime(item.start_time)}}</span></div>
                    <div class="r_button2"><span>修改</span></div>
                </div>
                <div class="r_num">
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
            </van-step>
        </van-steps>
    </div>
    
  </div>
</template>

<script>
import {reportingInfo} from '../../api/mine'

export default {
    data(){
        return {
            arr:[],
            title:'',
            address:''
        }
    },
  methods: {
    getInfo(id){
        reportingInfo({id:id}).then(res => {
            console.log(res)
            this.arr = res.data;
            this.title = res.name.name;
            this.address = res.name.address;
        })
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp* 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '年';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
      var D = date.getDate() + '日 ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  },
  mounted(){
      this.nav('灾(险)情速报记录详情');
    this.userinfo = this.localData('get','userinfo');
    var id = this.$route.query.id;
    this.getInfo(id)
  }
};
</script>

<style>
.p_title{
    font-size: 24px;
    text-align: left;
    font-weight: 600;
    padding:20px 20px 10px 20px;
}
.p_title_bz{
    font-size: 16px;
    text-align: left;
    padding: 0 20px ;
}
.query_log{
    box-sizing: border-box;
    padding: 20px;
}
.r_top2{
    position: absolute;
    top: 5px;
    left: 0;
    width: 100%;
}
.r_time2{
    width: 70% !important;
    display: inline-block;
    text-align: left !important;
}
.r_time2 span{
    background-color: #FF5000;
    font-size: 22px;
    color: white;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 20px;
    background-image: -webkit-linear-gradient(left, #EE4D47,rgb(243, 124, 120));
}
.r_button2{
    width: 30% !important;
    display: inline-block;
    text-align: right !important;
}
.r_button2 span{
    border-radius: 20px;
    padding: 2.5px 5px;
    color: rgba(224, 53, 53, 0.945);
    border:1px solid rgba(224, 53, 53, 0.945);
    font-size: 16px;
    
}
.r_num{
    margin: 35px 0;
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
</style>
