<template>
  <div>
    <div id="map"></div>
    <div class="ensure-btn">
      <van-button @click="saveAddr" style="width: 180px" round type="warning">确认选择</van-button>
    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
export default {
  data(){
    return {
      locationList: [],
      selected: ''
    }
  },
  mounted() {
    this.initMap()
    this.getLocalNearby()
  },
  methods:{
    initMap() {
      window.map = new AMap.Map("map", {
        resizeEnable: true,
        zoom: 11,
        layers: [new AMap.TileLayer(), new AMap.TileLayer.Satellite()],
      });
    },
    getLocalNearby() {
      console.log(sessionStorage.getItem('location'))
      let cpoint = sessionStorage.getItem('location').split(',')
      var that = this
      AMap.service(["AMap.PlaceSearch"], function() {
        var placeSearch = new AMap.PlaceSearch({
            map: window.map,
            pageSize: 10, // 单页显示结果条数
            pageIndex: 1, // 页码
          });
          placeSearch.searchNearBy('', cpoint, 200, function(status, result) {
            if (status == 'complete') {
              console.log(result.poiList, window.map)
              that.locationList = result.poiList.pois
              AMap.event.addListener(placeSearch,"markerClick",function(e) {
                console.log(e.data.address);//获取当前marker的具体地址信息
                that.selected = e.data.address
              });
            }
          });
      })
    },
    saveAddr() {
      sessionStorage.setItem('selectedAddr', this.selected)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
#map {
  height: 100vh;
  width: 100%;
}
.ensure-btn{
  position: absolute;
  bottom: 20px;
  left: 30%;
  z-index: 20;
}
</style>
