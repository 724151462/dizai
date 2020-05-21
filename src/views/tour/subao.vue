<template>
  <div class="huise">
    <van-overlay :show="success" class-name="wrapper" @click="hideSuccess()">
        <div class="block" >
            <img src="../../assets/imgs/success.png" style="margin-top:30px" alt="">
            <h1 style="margin:20px 0 30px 0 ">{{msg}}</h1>
        </div>
    </van-overlay>
    <van-overlay :show="affirm" class-name="wrapper" @click="hideAffirm()">
        <div class="block" >
            <h2 style="margin:60px auto;font-weight: 600;">{{hint}}</h2>
            <van-row gutter="20">
                <van-col span="12"><van-button @click="hideAffirm()" round type="info" size="large" color="linear-gradient(to right, rgb(212, 212, 212), rgb(192, 192, 192))">取消</van-button></van-col>
                <van-col span="12"><van-button @click="affirmFun(fun)" round type="info" size="large" color="linear-gradient(to right, rgb(255, 166, 163), rgb(238, 77, 71))">确定</van-button></van-col>
            </van-row>
        </div>
    </van-overlay>
    <!-- <navBar :title="'灾（险）情速报'"></navBar> -->
    <div class="border-b-deep pad-tb-10">
      <span> <b> {{titleInfo.name}}</b></span>
    </div>
    <van-form @submit="onSubmit">
      <!-- <van-cell title="灾情时间区间" :value="date" @click="show = true" /> -->
      <!-- <van-calendar v-model="show" type="range" @confirm="onConfirm" /> -->
      <van-field
        v-model="zqNum"
        name="disaster_number"
        label="灾情数量"
        placeholder="输入灾情数量"

      />
      <van-field
        v-model="xqNum"
        name="danger_number"
        label="险情数量"
        placeholder="输入险情数量"

      />
      <van-field
        v-model="tranNum"
        name="move_people"
        label="转移人次"
        placeholder="输入转移人次"

      />
      <van-field
        v-model="xcLocation"
        name="geologic_hazard_number"
        label="巡查地灾点"
        placeholder="请输入数量"
      />
      <van-field
        v-model="gdbpNum"
        name="steep_number"
        label="巡查高陡边坡"
        placeholder="请输入数量"

      />
      <van-field
        v-model="xcTimesNum"
        name="patrol_number"
        label="巡查人次"
        placeholder="输入巡查人次"

      />
      <van-field
        v-model="yjPeopleNum"
        name="dispatch_number"
        label="出动应急技术人员人次"
        placeholder="输入次数"

      />
    <div class="confirm-wrapper pu-column al-center">
      <span class="f-12 f-gray">上报人：张某/巡查员</span>
      <span class="f-12 f-gray">建阳市童游街道自然资源管理所</span>
      <van-button class="mar-t-10" style="width: 150px;" round type="warning"
       native-type="submit" color="linear-gradient(to right, rgb(255, 166, 163), rgb(238, 77, 71))">确认上传</van-button>
    </div>
  </van-form>
  
  </div>
</template>

<script>
import {subaoTitleAPI, subaoSubmitAPI} from '../../api/tour'
export default {
  data() {
    return {
      date: '',
      show: false,
      zqNum: '',
      xqNum: '',
      xcLocation: '',
      xcTimesNum: '',
      yjPeopleNum: '',
      gdbpNum: '',
      tranNum: '',
      titleInfo: {},
      success:false,
      affirm:false,
      msg:'',
      hint:'确认要删除吗',
      fun:null
    }
  },
  methods:{
    onSubmit(values) {
      values.id = this.titleInfo.id;
      values.phone = this.userinfo.phone;
      if(values.disaster_number == '') return this.$toast.fail('灾情次数不可为空！');
      if(values.danger_number == '') return this.$toast.fail('险情次数不可为空！');
      if(values.move_people == '') return this.$toast.fail('转移人次不可为空！');
      if(values.geologic_hazard_number == '') return this.$toast.fail('巡查地灾数量不可为空！');
      if(values.steep_number == '') return this.$toast.fail('巡查陡坡数量不可为空！');
      if(values.patrol_number == '') return this.$toast.fail('巡查人次不可为空！');
      if(values.dispatch_number == '') return this.$toast.fail('出动人次不可为空！');
        this.hint = '是否确认上传？'
        this.affirm = true;
        const _this = this;
        this.fun = function(){
            subaoSubmitAPI(values).then(res => {
                console.log(res)
                if(res.status == 'fail')_this.$toast.fail(res.msg);
                if(res.status == "success")_this.showSuccess(res.msg);
            })
        }
      
    },
    getTitle() {
      subaoTitleAPI().then((res) => {
        this.titleInfo = res.data
      })
    },
    formatDate(date) {
      console.log(date)
      return `2020/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
      console.log(this.date)
    },
    hideSuccess(){
      this.success = false;
    },
    showSuccess(name){
      const _this = this;
      this.success = true;
      this.msg = name;
      setTimeout(function(){
          _this.hideSuccess();
          setTimeout(function(){
              location.reload();
          },1000)
      },1500);
    },
    affirmFun(fun){
        fun();
    },
    hideAffirm(){
        this.affirm=false;
    },
  },
  mounted(){
    this.nav('灾（险）情速报');
    this.userinfo = this.localData('get','userinfo');
    this.getTitle()
  }
}
</script>

<style lang="less">
.tc{
  color: @gray-5
}
.confirm-wrapper{
  margin-top: 15vh;
  margin-bottom: 50px;
}
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
      box-sizing: border-box;
      padding: 20px;
    width: 80vw;
    border-radius: 20px;
    background-color: #fff;
  }
.huise{
  background-color: rgb(248, 248, 248);
  height: 100vh;
}
</style>