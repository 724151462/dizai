/**
  title: 标题
  path: 要跳转的路径，不传默认返回上一页
 */

<template>
  <van-nav-bar class="" fixed placeholder :left-arrow="isBack == true ? true : false" @click-left="onClickLeft">
    <template #title>
      <span class="font-color-white">{{title}}</span>
    </template>
    <slot></slot>
  </van-nav-bar>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      default: ""
    },
    path: {
      default: ""
    },
    isBack: {
      default: true
    }
  },
  methods: {
    onClickLeft() {
      this.path == "" ? this.$router.go(-1) : this.$router.push({path: this.path})
    },
  },
};
</script>
