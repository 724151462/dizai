<template>
  <div class="pu-bg">
    <navBar :title="'灾（险）情速报'"></navBar>
    <div class="border-b-deep pad-tb-10">
      <span> <b> 2020年第三轮降雨（7月1日-9月30日）</b></span>
    </div>
    <van-form @submit="onSubmit">
      <van-cell title="灾情时间区间" :value="date" @click="show = true" />
      <van-calendar v-model="show" type="range" @confirm="onConfirm" />
      <van-field
        :v-model="zqNum"
        label="灾情数量"
        placeholder="输入灾情数量"
        class="border-b"
      />
      <van-field
        :v-model="xqNum"
        label="险情数量"
        placeholder="输入险情数量"
        class="border-b"
      />
      <van-field
        :v-model="xcdzdNum"
        label="巡查地灾点"
        placeholder="请输入数量"
        class="border-b"
      />
      <van-field
        :v-model="tranNum"
        label="巡查高陡边坡"
        placeholder="请输入数量"
        class="border-b"
      />
      <van-field
        :v-model="tranNum"
        label="巡查人次"
        placeholder="输入巡查人次"
        class="border-b"
      />
      <van-field
        :v-model="tranNum"
        label="出动应急技术人员人次"
        placeholder="输入次数"
        class="border-b"
      />
    </van-form>
    <div class="confirm-wrapper pu-column al-center">
      <span class="f-12 f-gray">上报人：张某/巡查员</span>
      <span class="f-12 f-gray">建阳市童游街道自然资源管理所</span>
      <van-button class="mar-t-10" style="width: 150px;" round type="warning">确认上传</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: '',
      show: false,
      zqNum: '',
      xqNum: '',
      tranNum: ''
    }
  },
  methods:{
    onSubmit() {

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