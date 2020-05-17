<template>
  <div>
    <navBar :title="'个人信息'"></navBar>
    <div>
      <van-cell center class="border-b" title="头像" is-link>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <img class="avatar" src="../../assets/imgs/avatar.png" alt="">
          <van-icon name="arrow" style="line-height: inherit;" />
        </template>
      </van-cell>
      <van-cell class="border-b" title="姓名" is-link value="王大仙" />
      <van-cell class="border-b" title="性别" is-link value="男" />
      <van-cell class="border-b" title="年龄" is-link value="36岁" />
      <van-cell class="border-b" title="手机" is-link value="13799999999" />
      <van-cell class="border-b" title="办公电话" is-link value="0599-666666" />
      <van-cell class="border-b" title="职位" is-link value="巡查员" />
      <van-cell class="border-b" title="单位" is-link value="建阳区童游街道自然资源管理所" />
      <van-cell class="border-b" title="管辖责任范围" is-link value="南平市建阳区童游街道" />
    </div>
  </div>
</template>

<script>
export default {

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
</style>