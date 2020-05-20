<template>
  <div>
    <!-- <navBar :title="'灾（险）情上报'"></navBar> -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="zqNam"
        label="灾险情名称"
        placeholder="输入灾险情名称"
        class="border-b"
      />
      <van-field
        label="灾难类型"
        show-toolbar
        placeholder="选择灾难类型"
        readonly
        clickable
        :value="zxType"
        :columns="zxOption"
        @cancel="zxTypeDialog = false"
        @click="zxTypeDialog = true"
      />
      <van-field
        label="发生类型"
        placeholder="选择发生类型"
        readonly
        clickable
        :value="happenType"
        :columns="happenOption"
        @cancel="happenTypeDialog = false"
        @click="happenTypeDialog = true"
      />
      <van-field
        v-model="zhScale"
        label="灾害规模"
        placeholder="请输入灾害规模"
        class="border-b"
      />
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="hanppenTime"
        label="时间选择"
        placeholder="点击选择时间"
        @click="showTimePicker = true"
      />
      <van-field
        readonly
        clickable
        name="input"
        :value="zdAddress"
        label="灾点地址"
        placeholder="点击选择地址"
        @click="toChooseAddr"
        class="border-b"
      />
      <van-field
        v-model="wxNum"
        label="威胁人数"
        placeholder="请输入威胁人数"
        class="border-b"
      />
      <van-field
        v-model="tranNum"
        label="转移人数"
        placeholder="请输入转移人数"
        class="border-b"
      />
      <van-field
        v-model="yingjiNum"
        label="出动应急技术人员人次"
        placeholder="请输入出动应急技术人员人次"
        class="border-b"
      />
      <van-field name="picUploader" multiple :max-count="3" label="文件上传">
        <template #input>
          <van-uploader v-model="picUploader"  :max-count="5"/>
        </template>
      </van-field>
      <van-field name="vdoUploader" multiple :max-count="3" label="视频上传">
        <template #input>
          <van-uploader v-model="vdoUploader" capture="camcorder" accept="video/*" :max-count="3" :max-size="3 * 1024 * 1024"  />
        </template>
      </van-field>
    </van-form>
    <div class="confirm-wrapper pu-column al-center">
      <span class="f-12 f-gray">上报人：张某/巡查员</span>
      <span class="f-12 f-gray">建阳市童游街道自然资源管理所</span>
      <van-button class="mar-t-10" style="width: 150px;" round type="warning">确认上传</van-button>
    </div>
    <van-popup v-model="zxTypeDialog" round position="bottom">
      <van-picker
        show-toolbar
        :columns="zxOption"
        @confirm="zxConfirm"
        @cancel="zxTypeDialog = false"
      />
    </van-popup>
    <van-popup v-model="happenTypeDialog" round position="bottom">
      <van-picker
        show-toolbar
        :columns="happenOption"
        @confirm="happenConfirm"
        @cancel="happenTypeDialog = false"
      />
    </van-popup>
    <van-popup v-model="showTimePicker" position="bottom">
      <van-datetime-picker
        type="datetime"
        @confirm="onTimeConfirm"
        @cancel="showTimePicker = false"
      />
</van-popup>
<van-popup v-model="zdAddressPicker" position="bottom">
  <van-picker
    show-toolbar
    :columns="locationList"
    @confirm="confirmZd"
    @cancel="zdAddressPicker = false"
  />
</van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return{
      zdAddressPicker: false,
      picUploader: [],
      vdoUploader: [],
      locationList: [
      ],
      wxNum: '',
      tranNum: '',
      yingjiNum: '',
      hanppenTime: '',
      showTimePicker: false,
      zqNam: '',
      zxTypeDialog: false,
      zxType: '',
      zhScale: '',
      zdAddress: '',
      zxOption: ['塌陷', '泥石流', '山体滑坡'],
      happenOption: ['突发', '正常', '紧急'],
      happenType: '',
      happenTypeDialog: false
    }
  },
  mounted() {
    this.nav('灾（险）情上报');
    this.zdAddress = sessionStorage.getItem('selectedAddr') || ''
  },
  beforeDestroy() {
    if (sessionStorage.getItem('selectedAddr')) {
      sessionStorage.removeItem('selectedAddr')
    }
  },
  methods:{
    toChooseAddr() {
      this.$router.push({path: '/tour/addrchoose'})
    },
    onSubmit(){

    },
    confirmZd(val) {
      this.zdAddress = val
      this.zdAddressPicker = false
    },
    onConfirm(value) {
      this.zxType = value;
      this.zxTypeDialog = false;
    },
    zxConfirm(value) {
      this.zxType = value
      this.zxTypeDialog = false
    },
    happenConfirm(value) {
      this.happenType = value
      this.happenTypeDialog = false
    },
    onTimeConfirm(value) {
      let time = `2020/${value.getMonth() + 1}/${value.getDate()} ${value.getHours()}:${value.getMinutes()}:${value.getSeconds()}`;
      this.hanppenTime = time
      this.showTimePicker = false
    }
  },
}
</script>

<style>

</style>