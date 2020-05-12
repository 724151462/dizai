<template>
  <div>
    <navBar :title="'首页'" :isBack="false"></navBar>
    <div id="map">

    </div>
  </div>
</template>

<script>
import AMap from 'AMap'
export default {
  data() {
    return{

    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      window.map = new AMap.Map('map', {
        resizeEnable: true,
        zoom:11,
        center: [116.397428, 39.90923]
      });
      var roadNetLayer =  new AMap.TileLayer.RoadNet()
      window.map.add(roadNetLayer)
    }
  }
}
</script>

<style>
#map{
  height: calc(100vh - 100px);
  width: 100%;
}
</style>