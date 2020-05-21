<template>
  <div class="back">
    <!-- <navBar :title="'地灾随手拍-上传'"></navBar> -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="yhPoint"
        name="隐患点"
        label="隐患点"
        placeholder="请输入隐患点"
        readonly
      />
      <van-field
        name="情况描述"
        label="情况描述"
        placeholder="100字以内"
        readonly
      />
      <van-field
        v-model="statuDesc"
        rows="2"
        autosize
        label=""
        type="textarea"
        maxlength="100"
        placeholder="请输入描述"
        show-word-limit
        class=" desc"
      />
      <van-field
        name="图片上传"
        label="图片上传"
        placeholder="最多上传5张，仅限jpg,png"
        readonly
      />
      <van-field name="uploader" label="">
        <template #input>
          <van-uploader v-model="imgUploader" />
        </template>
      </van-field>
      <van-field
        name="视频上传"
        label="视频上传"
        placeholder="(选填) 最多上传3段视频"
        readonly
      />
      <van-field name="uploader" label="">
        <template #input>
          <van-uploader v-model="vdoUploader" capture="camcorder" accept="video/*" :max-count="3" :max-size="3 * 1024 * 1024"/>
        </template>
      </van-field>
    </van-form>
    <van-button class="mar-t-10" color="linear-gradient(to right, rgb(255, 166, 163), rgb(238, 77, 71))" style="width: 150px;margin-top: 150px" round type="warning" @click="upSussMod = true">确认上传</van-button>
    <van-popup v-model="upSussMod">
      <div class="up-success pad-tb-10 pu-column al-center">
        <img width="150" src="../../assets/imgs/up-success.jpg" alt="">
        <span>上传成功</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data(){
    return{
      yhPoint: '光泽县芝麻镇芝麻村23号',
      statuDesc: '',
      imgUploader: [],
      vdoUploader: [],
      upSussMod: false
    }
  },
  mounted(){
    this.nav('地灾随手拍-上传');
  }
};
</script>

<style>
.desc{
  padding-top: 0;

}
.desc>.van-field__value{
  background-color: #f2f3f5;
}
.up-success{
  height: 200px;
  width: 80vw;
  border: 1px solid #fff;
  border-radius: 20px;
  background-color: #fff;
  font-size: 20px;
}
.van-popup--center{
  border-radius: 20px;
}
.back{
  background-color: #f7f8fa;
  height: 100vh;
  box-sizing: border-box;
}
.fontColorLan{
  color: #00A0E9;
}
</style>
