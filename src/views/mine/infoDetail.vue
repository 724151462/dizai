<template>
  <div>
    <!-- <navBar :title="'个人信息'"></navBar> -->
    <div>
      <van-cell center  title="头像" is-link>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <img class="avatar" :src="myInfo.avatar" alt="">
          <van-icon name="arrow" style="line-height: inherit;" />
        </template>
      </van-cell>
      <van-cell  title-style="width:30%" value-class="box_r" title="姓名" is-link :value="myInfo.name" />
      <van-cell  title-style="width:30%" value-class="box_r" title="性别" is-link :value="myInfo.sex" />
      <van-cell  title-style="width:30%" value-class="box_r" title="年龄" is-link :value="myInfo.age" />
      <van-cell  title-style="width:30%" value-class="box_r" title="手机" is-link :value="myInfo.mobile" />
      <van-cell  title-style="width:30%" value-class="box_r" title="办公电话" is-link :value="myInfo.phone" />
      <van-cell  title-style="width:30%" value-class="box_r" title="职位" is-link :value="myInfo.position" />
      <van-cell  title-style="width:30%" value-class="box_r" title="单位" is-link :value="myInfo.unit" />
      <van-cell  title-style="width:30%" value-class="box_r" title="管辖责任范围" is-link :value="myInfo.range" />
    </div>
  </div>
</template>

<script>
import {getMyIndexDetailAPI} from '../../api/mine'
export default {
  data() {
    return {
      myInfo: {},
    }
  },
  mounted() {
    this.nav('个人信息');
    this.userinfo = this.localData('get','userinfo');
    var id = this.$route.query.id;
    this.getMyIndex(id)
  },
  methods:{
    getMyIndex(id) {
      getMyIndexDetailAPI({id: id}).then(res => {
        // console.log(res)
        // res.id = id
        this.myInfo = res.data;
      })
    }
  }
}
</script>

<style lang="less">
.van-cell__value{
  color: #000;
}
.avatar{
  height: 50px;
  width: 50px;
  border-radius: @border-radius-max;
  margin-right: 5px;
}
.box_r{
  width: 70%;
}
</style>