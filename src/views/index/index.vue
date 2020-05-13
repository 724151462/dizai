<template>
  <div>
    <navBar :title="'首页'" :isBack="false"></navBar>
    <div id="map"></div>
    <div class="zq-menu pu-row pu-row-sa bg-white pad-tb-10">
      <div
        :class="['pu-column', actIndex == 0 ? 'active' : '']"
        @click="menuClick(0)"
      >
        <van-icon badge="4" name="location-o" />
        <span>地灾点</span>
      </div>
      <div
        :class="['pu-column', actIndex == 1 ? 'active' : '']"
        @click="menuClick(1)"
      >
        <van-icon badge="9" name="like-o" />
        <span>高陡边坡</span>
      </div>
      <div
        :class="['pu-column', actIndex == 2 ? 'active' : '']"
        @click="menuClick(2)"
      >
        <van-icon badge="10" name="star-o" />
        <span>一线报件</span>
      </div>
      <div
        :class="['pu-column', actIndex == 3 ? 'active' : '']"
        @click="menuClick(3)"
      >
        <van-icon badge="20" name="phone-o" />
        <span>灾情点</span>
      </div>
      <div
        :class="['pu-column', actIndex == 4 ? 'active' : '']"
        @click="menuClick(4)"
      >
        <van-icon badge="12" name="fire-o" />
        <span>险情点</span>
      </div>
    </div>
    <van-popup
      v-model="pointPop"
      round
      position="bottom"
      :style="{ height: '75%' }"
    >
      <div
        class="pu-column al-start pad-tb-10 pad-lr-10"
        style="align-items: flex-start;"
      >
        <h3>光泽县芝麻镇芝麻村43号</h3>
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
            <span class="f-gray">灾害类型</span><span> 地面塌陷</span
            ><span class="f-gray" style="margin-left: 50px">灾害规模</span
            ><span> 3米</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">防治措施</span
            ><span> 防护围挡，警告指示牌</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">威胁人数</span><span> 20</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">责任人</span><span> 王某</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">联系方式</span><span> 18459183928</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">发生时间</span
            ><span> 2020年5月12日 14:00</span>
          </div>
        </div>
      </div>
      <van-button style="width: 180px" round type="warning">详情</van-button>
    </van-popup>
  </div>
</template>

<script>
import AMap from "AMap";
export default {
  data() {
    return {
      pointPop: false,
      actIndex: 0,
      dzd: [{ id: "", lng: "116.397428", lat: "39.90923" }],
      gdbp: [{ id: "", lng: "116.387428", lat: "39.90923" }],
      yxbj: [{ id: "", lng: "116.377428", lat: "39.90923" }],
      zqd: [{ id: "", lng: "116.367428", lat: "39.90923" }],
      xqd: [{ id: "123", lng: "116.357428", lat: "39.90923" }],
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      window.map = new AMap.Map("map", {
        resizeEnable: true,
        zoom: 11,
        layers: [new AMap.TileLayer(), new AMap.TileLayer.Satellite()],
      });
      window.map.plugin("AMap.Geolocation", function() {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          extensions: "all",
        });
        window.map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
        AMap.event.addListener(geolocation, "error", (err) => {
          console.log(err);
        }); //返回定位出错信息
        function onComplete(data) {
          var lnglatXY = [data.position.getLng(), data.position.getLat()]; //地图上所标点的坐标
          console.log(lnglatXY)
          AMap.service("AMap.Geocoder", function() {
            //回调函数
            let geocoder = new AMap.Geocoder({});
            geocoder.getAddress(lnglatXY, function(status, result) {
              console.log(status,result)
              if (status === "complete" && result.info === "OK") {
                //获得了有效的地址信息:
                //即，result.regeocode.formattedAddress
                console.log(result.regeocode.formattedAddress);
                var address = result.regeocode.formattedAddress;
                document.getElementById("address").innerHTML =
                  "详细地址：" + address;
              } else {
                //获取地址失败
              }
            },function (err) {
              console.log(err)
            });
          });
        }
      });
    },
    menuClick(idx) {
      this.actIndex = idx;
      window.map.clearMap();
      switch (idx) {
        case 0:
          this.dzd.forEach((element) => {
            var marker = new AMap.Marker({
              position: new AMap.LngLat(element.lng, element.lat),
              icon:
                "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
              offset: new AMap.Pixel(-13, -30),
            });
            window.map.add(marker);
          });
          break;
        case 1:
          this.gdbp.forEach((element) => {
            var marker = new AMap.Marker({
              position: new AMap.LngLat(element.lng, element.lat),
              icon:
                "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
              offset: new AMap.Pixel(-13, -30),
            });
            window.map.add(marker);
          });
          break;
        case 2:
          this.yxbj.forEach((element) => {
            var marker = new AMap.Marker({
              position: new AMap.LngLat(element.lng, element.lat),
              icon:
                "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
              offset: new AMap.Pixel(-13, -30),
            });
            window.map.add(marker);
          });
          break;
        case 3:
          this.zqd.forEach((element) => {
            var marker = new AMap.Marker({
              position: new AMap.LngLat(element.lng, element.lat),
              icon:
                "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
              offset: new AMap.Pixel(-13, -30),
            });
            window.map.add(marker);
          });
          break;
        case 4:
          this.xqd.forEach((element) => {
            var marker = new AMap.Marker({
              position: new AMap.LngLat(element.lng, element.lat),
              icon:
                "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
              offset: new AMap.Pixel(-13, -30),
              extData: {
                id: element.id,
              },
            });
            marker.on("click", (evt) => {
              console.log(evt.target.De.extData.id);
              setTimeout(() => {
                this.pointPop = true;
              }, 200);
            });
            window.map.add(marker);
          });
          break;
      }
      window.map.setFitView();
    },
  },
};
</script>

<style>
#map {
  height: calc(100vh - 100px);
  width: 100%;
}
.zq-menu {
  border-radius: 10px;
  position: absolute;
  bottom: 70px;
  left: 5%;
  height: 50px;
  width: 90vw;
  z-index: 10;
}
.active {
  color: #ee4d47;
}
.img-wrapper {
  width: 100%;
  overflow-x: auto;
}
.dz-detail {
}
</style>
