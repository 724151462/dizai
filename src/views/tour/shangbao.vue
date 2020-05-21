<template>
  <div class="pu-bg">
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
        class="border-b"
      />
      <van-field
        v-model="xqNum"
        name="danger_number"
        label="险情数量"
        placeholder="输入险情数量"
        class="border-b"
      />
      <van-field
        v-model="tranNum"
        name="move_people"
        label="转移人次"
        placeholder="输入转移人次"
        class="border-b"
      />
      <van-field
        v-model="xcLocation"
        name="geologic_hazard_number"
        label="巡查地灾点"
        placeholder="请输入数量"
        class="border-b"
      />
      <van-field
        v-model="gdbpNum"
        name="steep_number"
        label="巡查高陡边坡"
        placeholder="请输入数量"
        class="border-b"
      />
      <van-field
        v-model="xcTimesNum"
        name="patrol_number"
        label="巡查人次"
        placeholder="输入巡查人次"
        class="border-b"
      />
      <van-field
        v-model="yjPeopleNum"
        name="dispatch_number"
        label="出动应急技术人员人次"
        placeholder="输入次数"
        class="border-b"
      />
    <div class="confirm-wrapper pu-column al-center">
      <span class="f-12 f-gray">上报人：张某/巡查员</span>
      <span class="f-12 f-gray">建阳市童游街道自然资源管理所</span>
      <van-button class="mar-t-10" style="width: 150px;" round type="warning"
       native-type="submit">确认上传</van-button>
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
      titleInfo: {}
    }
  },
  methods:{
    toChooseAddr() {
      this.$router.push({path: '/tour/addrchoose'})
    },
    onSubmit(values) {
      values.id = this.titleInfo.id
      values.phone = '123456'
      console.log(values)
      subaoSubmitAPI(values)
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
  },
  beforeDestroy() {
    if (sessionStorage.getItem('selectedAddr')) {
      sessionStorage.removeItem('selectedAddr')
    }
  },
  mounted(){
    this.nav('灾（险）情速报');
    this.getTitle()
    this.xcLocation = sessionStorage.getItem('selectedAddr') || ''
  }
}
</script>

<style lang="less">
.tc{
  color: @gray-5
}
.confirm-wrapper{
  margin-top: 25vh;
}
</style>