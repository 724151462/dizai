<template>
  <div>
    <navBar :title="'巡查签到'"></navBar>
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="灾险点"
        placeholder="请选择灾点名称"
        @click="showPicker = true"
        class="border-b"
      />
      <van-field
        v-model="address"
        name="巡查位置"
        label="巡查位置"
        placeholder="巡查位置"
        readonly
        class="border-b"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="detailValue"
        label="情况描述"
        placeholder="请选择灾点情况"
        @click="showDetailPicker = true"
        class="border-b"
      />
      <van-field
        v-if="detailValue == '其他迹象'"
        v-model="othStatu"
        name="其他迹象"
        label="其他迹象"
        placeholder="请输入其他迹象"
        class="border-b"
      />
      <van-field
        name="照片上传"
        label="照片上传"
        placeholder="最多上传5张"
        readonly
      />
      <van-field name="uploader" label="">
        <template #input>
          <van-uploader v-model="fileList" multiple :max-count="5" />
        </template>
      </van-field>
      <span class="tc">仅限jpg、png，5M以内</span>
    </van-form>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <van-popup v-model="showDetailPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="detailColumns"
        @confirm="onDetailConfirm"
        @cancel="showDetailPicker = false"
      />
    </van-popup>
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
    return{
      address: "光泽县芝麻镇芝麻村43号",
      value: '',
      detailValue: '',
      columns: ['地灾点-地面塌陷1 福田路','地灾点-地面塌陷2 福田路','地灾点-地面塌陷3 福田路'],
      detailColumns: ['无变形迹象','有变形','其他迹象'],
      showPicker: false,
      showDetailPicker: false,
      fileList: [],
      othStatu: ''
    }
  },
  methods: {
    onSubmit() {
      
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    onDetailConfirm(value) {
      this.detailValue = value;
      this.showDetailPicker = false;
    },
  }
}
</script>

<style lang="less">
.tc{
  color: @gray-5
}
.confirm-wrapper{
  margin-top: 30vh;
}
</style>