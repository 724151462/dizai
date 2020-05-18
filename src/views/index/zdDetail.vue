<template>
  <div>
    <navBar :title="'灾点详情'"></navBar>
    <div
        class="pu-column al-start pad-tb-5 pad-lr-10 bg-white"
        style="align-items: flex-start;"
      >
        <h3>{{pDetail.address}}</h3>
        <div class="img-wrapper pu-row">
          <img
            height="185"
            class="mar-r-10"
            v-for="(item, index) in 4"
            src="../../assets/imgs/bad-bg.png"
            :key="index"
            alt=""
          />
        </div>
        <div
          class="pu-column dz-detail pad-tb-10"
          style="align-items: flex-start;"
        >
          <div class="mar-tb-5">
            <span class="f-gray">灾害类型</span><span> {{pDetail.type}}</span
            ><span class="f-gray" style="margin-left: 50px">灾害规模</span
            ><span> {{pDetail.scale}}米</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">防治措施</span
            ><span> {{pDetail.opinion}}</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">威胁人数</span><span> {{pDetail.number}}</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">责任人</span><span> {{pDetail.monitor}}</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">发生时间</span
            ><span> 2020年5月12日 14:00</span>
          </div>
        </div>
        <van-button style="width: 180px;margin: 0 auto" round type="warning">具体巡查记录</van-button>
      </div>
  </div>
</template>
<script>
import {getPointDetailAPI} from '../../api/index'
export default {
  data() {
    return {
      pDetail: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    getDetail() {
      let id = this.$route.query.id
      getPointDetailAPI({id: id}).then(res => {
        // console.log(res)
        res.id = id
        this.pDetail = res
      })
    },
  },
}
</script>

<style>
</style>