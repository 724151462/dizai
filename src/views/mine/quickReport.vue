<template>
  <div >
    <navBar :title="'灾(险)情速报记录'"></navBar>
    <van-dropdown-menu active-color="#ee0a24">
        <van-dropdown-item @change="cheX" title-class="left" v-model="value1" :options="option1" />
        <van-dropdown-item @change="cheZ" title-class="right" v-model="value2" :options="option2" />
    </van-dropdown-menu>
    
    <div class="record_list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
        <div 
        class="record" 
        v-for="(item,i) in recordArr" 
        :key="i"
        @click="to()"
        >
            <div class="r_title">2020年第三轮降雨(7月1日-9月31日)</div>
            <div>
                <div class="amount">
                    <span class="amount_text">灾情数量</span>
                    <span class="amount_num">12处</span>
                </div>
                <div class="amount">
                    <span class="amount_text">险情数量</span>
                    <span class="amount_num">9处</span>
                </div>
                <div class="amount">
                    <span class="amount_text">转移人数</span>
                    <span class="amount_num">1204人</span>
                </div>
                <div class="amount">
                    <span class="amount_text">巡查地灾点</span>
                    <span class="amount_num">1524次</span>
                </div>
                <div class="amount">
                    <span class="amount_text">巡查高陡边坡</span>
                    <span class="amount_num">154次</span>
                </div>
                <div class="amount">
                    <span class="amount_text">巡查人次</span>
                    <span class="amount_num">584次</span>
                </div>
                <div class="amount" style="width:100%;">
                    <span class="amount_text">触动应急技术人员人次</span>
                    <span class="amount_num">201人</span>
                </div>
            </div>
            <div class="r_beizhu">
                <div class="r_text"><span><van-icon name="location-o" /></span> 光泽县止马镇</div>
                <div class="r_time">7月14日 15:20</div>
            </div>
        </div>
        </van-list>
    </div>
  </div>
</template>

<script>
import {getReportingList,cityList} from '../../api/mine'
export default {
   data() {
    return {
      value1: '',
      value2: '',
      option1: [],
      option2: [],
      recordArr:[],
      loading:false,
      finished:false,
      page:1,
      country:''

    };
  },
  methods:{
    to(){
        this.$router.push({path: '/mine/quickreportparticulars'});
    },
    getList(){
        getReportingList({phone:"1234567",country:this.country,page:this.page}).then(res => {
        // res.id = id
        if(res.data.length > 0){
          this.recordArr.push(...res.data);
          console.log(res.data);
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
    onLoad() {
      getReportingList({phone:"1234567",country:this.country,page:this.page}).then(res => {
        // res.id = id
        if(res.data.length > 0){
          this.recordArr.push(...res.data);
          var arr = [{text:"请选择",value:''}];
          for(var i=0;i<res.city.county.length;i++){
              arr.push({
                  text:res.city.county[i].name,
                  value:res.city.county[i].name,
              })
          }
          var arr2 = [{text:'请选择',value:''}];
          for(var j=0;j<res.city.country.length;j++){
              arr2.push({
                  text:res.city.country[j].name,
                  value:res.city.country[j].name,
              })
          }
          console.log(arr,arr2);
          this.option1 = arr;
          this.option2 = arr2;
          
          this.value1 = arr[0].value;
          this.value2 = arr2[0].value;
          // console.log(res.data);
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
    cheX(val){
        // console.log(val);
        this.page = 1;
        this.country = val;
        this.recordArr = [];
        this.getList();
        cityList({name:val}).then(res => {
            console.log(res);
            
            var arr2 = [{text:'全部乡镇',value:''}];
            for(var j=0;j<res.data.length;j++){
                arr2.push({
                    text:res.data[j].name,
                    value:res.data[j].name,
                })
            }
            this.option2 = arr2;
            this.value2 = arr2[0].value;
        })
    },
    cheZ(val){
        this.page = 1;
        this.country = val;
        this.recordArr = [];
        this.getList();
    }
  }
};
</script>

<style>
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


    .van-dropdown-menu__item:nth-child(1){
        justify-content: flex-start !important;
        padding-left: 20px ;
    }
    .van-dropdown-menu__item:nth-child(2){
        justify-content: flex-end !important;
        padding-right: 30px;
    }

</style>
