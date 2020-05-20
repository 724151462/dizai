/* eslint-disable no-undef */
<template>
  <div>
    <navBar :title="'首页'" :isBack="false"></navBar>
    <div id="map"></div>
    <div class="hand-upload-btn">
      <router-link :to="{path: '/handPic/upload'}">
        <img src="../../assets/imgs/upload-btn.png" alt="">
      </router-link>
    </div>
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
    <van-overlay :show="locationLoad">
      <div class="wrapper" @click.stop>
        <van-loading style="margin-top: 70%" size="24px" vertical>获取定位中...</van-loading>
      </div>
    </van-overlay>
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
            ><span>{{pDetail.opinion}}</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">威胁人数</span><span> {{pDetail.household}}人</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">责任人</span><span> {{pDetail.monitor}}</span>
          </div>
          <!-- <div class="mar-tb-5">
            <span class="f-gray">联系方式</span><span> 18459183928</span>
          </div> -->
          <div class="mar-tb-5">
            <span class="f-gray">发生时间</span
            ><span> 2020年5月12日 14:00</span>
          </div>
        </div>
      </div>
      <van-button @click="toDetail" style="width: 180px" round type="warning">详情</van-button>
    </van-popup>
    <bottomTabs></bottomTabs>
  </div>
</template>

<script>
import AMap from "AMap";
import {getPointsAPI, getPointDetailAPI} from '../../api/index'
export default {
  data() {
    return {
      locationLoad: false,
      pointPop: false,
      actIndex: 0,
      dzd: [{ id: "", lng: "116.397428", lat: "39.90923" }],
      gdbp: [{ id: "", lng: "116.387428", lat: "39.90923" }],
      yxbj: [{ id: "", lng: "116.377428", lat: "39.90923" }],
      zqd: [{ id: "", lng: "116.367428", lat: "39.90923" }],
      xqd: [{ id: "123", lng: "116.357428", lat: "39.90923" }],
      pDetail: {}
    };
  },
  mounted() {
    // this.nav('首页');
    
    // 1 - 先从localstorage中获取用户信息

    //   有数据

    //   没数据

    //     打开登录


    // var infoCookie = this.getCookie('userinfo');
    // if(!infoCookie){
    //   var infoLocal = this.localData('get','userinfo');
    //   if(!infoLocal){
    //     location.href="http://auth-ser.zsnanping.com/oauth/authorize?client_id=1e0bd883d84f456ca0043b6b19a392ce&response_type=code&grant_type=authorization_code&scope=snsapi_userinfo&redirect_uri=http://npdzzh.3dy.me/manage/public/index/index/callback";
    //     return ;
    //   }else{
    //     this.localData('set','userinfo',this.getCookie('userinfo'));
    //   }
    // }else{
    //   this.localData('set','userinfo',this.getCookie('userinfo'));
    // }
    
    this.localData('set','userinfo','123456');
    this.initMap();
  },
  methods: {
    getPoints() {
      getPointsAPI({city: '松溪县', phone: this.userinfo})
      .then(res => {
        this.dzd = res.no_slope
        this.gdbp = res.slope
        this.yxbj = res.county
        this.zqd = res.disaster
        this.xqd = res.danger
        this.menuClick(0)
      })
    },
    getDetail(id) {
      getPointDetailAPI({id: id}).then(res => {
        // console.log(res)
        res.id = id
        this.pDetail = res
      })
    },
    initMap() {
      this.locationLoad = true
      let that = this
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
        // window.map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
        AMap.event.addListener(geolocation, "error", (err) => {
          console.log(err);
        }); //返回定位出错信息
        function onComplete(data) {
          console.log(66666);
          that.locationLoad = false
          var lnglatXY = [data.position.getLng(), data.position.getLat()]; //地图上所标点的坐标
          sessionStorage.setItem('location', lnglatXY)
          console.log(lnglatXY)
          AMap.service("AMap.Geocoder", function() {
            //回调函数
            let geocoder = new AMap.Geocoder({});
            geocoder.getAddress(lnglatXY, function(status, result) {
              console.log(status,result)
              if (status === "complete" && result.info === "OK") {
                //获得了有效的地址信息:
                //即，result.regeocode.formattedAddress
                console.log(result.regeocode);
                that.getPoints();
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
          // eslint-disable-next-line no-case-declarations
          let dzd = this.dzd.filter(element => {
            return element.x_coordinate != '' && element.y_coordinate != ''
          })
          // eslint-disable-next-line no-unused-vars
          var dzdCluster, dzdMarkers = [];
          dzd.forEach(element => {
            let marker = new AMap.Marker({
                position: [element.x_coordinate, element.y_coordinate],
                content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
                offset: new AMap.Pixel(-15, -15),
                extData: {id: element.id}
            })
            dzdMarkers.push(marker)
            marker.on('click', (evt) => {
              let id = evt.target.De.extData.id
              this.getDetail(id)
              setTimeout(() => {
                this.pointPop = true;
              }, 200);
              console.log(evt)
            })
          })
          dzdCluster = new AMap.MarkerClusterer(window.map, dzdMarkers, {gridSize: 80});
          window.map.setCenter([dzd[0].x_coordinate,dzd[0].y_coordinate]);
          
          break;
        case 1:
          // eslint-disable-next-line no-case-declarations
          let gdbp = this.gdbp.filter(element => {
            return element.x_coordinate != '' && element.y_coordinate != ''
          })
          // eslint-disable-next-line no-unused-vars
          var gdbpCluster, gdbpMarkers = [];
          gdbp.forEach(element => {
            let marker = new AMap.Marker({
                position: [element.x_coordinate, element.y_coordinate],
                content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
                offset: new AMap.Pixel(-15, -15),
                extData: {id: element.id}
            })
            gdbpMarkers.push(marker)
            marker.on('click', (evt) => {
              let id = evt.target.De.extData.id
              this.getDetail(id)
              setTimeout(() => {
                this.pointPop = true;
              }, 200);
              console.log(evt)
            })
          })
          gdbpCluster = new AMap.MarkerClusterer(window.map, gdbpMarkers, {gridSize: 80});
          window.map.setCenter([gdbp[0].x_coordinate,gdbp[0].y_coordinate]);
          break;
        case 2:
          // eslint-disable-next-line no-case-declarations
          let yxbj = this.yxbj.filter(element => {
            return element.x_coordinate != '' && element.y_coordinate != ''
          })
          // eslint-disable-next-line no-unused-vars
          var yxbjCluster, yxbjMarkers = [];
          yxbj.forEach(element => {
            let marker = new AMap.Marker({
                position: [element.x_coordinate, element.y_coordinate],
                content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
                offset: new AMap.Pixel(-15, -15),
                extData: {id: element.id}
            })
            yxbjMarkers.push(marker)
            marker.on('click', (evt) => {
              let id = evt.target.De.extData.id
              this.getDetail(id)
              setTimeout(() => {
                this.pointPop = true;
              }, 200);
              console.log(evt)
            })
          })
          yxbjCluster = new AMap.MarkerClusterer(window.map, yxbjMarkers, {gridSize: 80});
          window.map.setCenter([yxbj[0].x_coordinate,yxbj[0].y_coordinate]);
          break;
        case 3:
          // eslint-disable-next-line no-case-declarations
          let zqd = this.zqd.filter(element => {
            return element.x_coordinate != '' && element.y_coordinate != ''
          })
          // eslint-disable-next-line no-unused-vars
          var zqdCluster, zqdMarkers = [];
          zqd.forEach(element => {
            let marker = new AMap.Marker({
                position: [element.x_coordinate, element.y_coordinate],
                content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
                offset: new AMap.Pixel(-15, -15),
                extData: {id: element.id}
            })
            zqdMarkers.push(marker)
            marker.on('click', (evt) => {
              let id = evt.target.De.extData.id
              this.getDetail(id)
              setTimeout(() => {
                this.pointPop = true;
              }, 200);
              console.log(evt)
            })
          })
          zqdCluster = new AMap.MarkerClusterer(window.map, zqdMarkers, {gridSize: 80});
          window.map.setCenter([zqd[0].x_coordinate,zqd[0].y_coordinate]);
          break;
        case 4:
          // eslint-disable-next-line no-case-declarations
          let xqd = this.xqd.filter(element => {
            return element.x_coordinate != '' && element.y_coordinate != ''
          })
          // eslint-disable-next-line no-unused-vars
          var xqdCluster, xqdMarkers = [];
          xqd.forEach(element => {
            let marker = new AMap.Marker({
                position: [element.x_coordinate, element.y_coordinate],
                content: '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
                offset: new AMap.Pixel(-15, -15),
                extData: {id: element.id}
            })
            xqdMarkers.push(marker)
            marker.on('click', (evt) => {
              let id = evt.target.De.extData.id
              this.getDetail(id)
              setTimeout(() => {
                this.pointPop = true;
              }, 200);
              console.log(evt)
            })
          })
          xqdCluster = new AMap.MarkerClusterer(window.map, xqdMarkers, {gridSize: 80});
          window.map.setCenter([xqd[0].x_coordinate,xqd[0].y_coordinate]);
          break;
      }
    },
    toDetail() {
      console.log(this.pDetail)
      this.$router.push({path: '/index/zqdetail',query: {id: this.pDetail.id}})
    },
    reg(){

    }
  },
};
</script>

<style scope>
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
.dz-detail {
}
.hand-upload-btn{
  position: absolute;
  z-index: 11;
  bottom: 160px;
  right: 20px;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
}
.van-overlay{
  z-index: 999;
}
</style>