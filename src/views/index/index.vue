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
    <div class="zq-menu pu-row pu-row-sa pad-tb-10">
      <div
        class="pu-column al-center"
        @click="menuClick(0)"
      >
        <span class="iconfont icon-17huapoqu icon-border" :class="{active: actIndex==0}"></span>
        <span class="f-white f-12">地灾点</span>
      </div>
      <div
        class="pu-column al-center"
        @click="menuClick(1)"
      >
        <span class="iconfont icon-xiahua icon-border" :class="{active: actIndex==1}"></span>
        <span class="f-white f-12">高陡边坡</span>
      </div>
      <div
        class="pu-column al-center"
        @click="menuClick(2)"
      >
        <span class="iconfont icon-zaihai icon-border" :class="{active: actIndex==2}"></span>
        <span class="f-white f-12">一线报件</span>
      </div>
      <div
        class="pu-column al-center"
        @click="menuClick(3)"
      >
        <span class="iconfont icon-jinggao icon-border" :class="{active: actIndex==3}"></span>
        <span class="f-white f-12">灾情点</span>
      </div>
      <div
        class="pu-column al-center"
        @click="menuClick(4)"
      >
        <span class="iconfont icon-renyuanweizhi icon-border" :class="{active: actIndex==4}"></span>
        <span class="f-white f-12">险情点</span>
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
        <div class="img-wrapper pu-row" v-if="pDetail.images.length != 0">      
          <img
            height="185"
            class="mar-r-10"
            v-for="(pic, index) in pDetail.images"
            :src="pic"
            :key="index"
            alt=""
          />
        </div>
        <van-empty v-else style="margin:0 auto;padding:0;" description="暂无图片" />
        <div
          class="pu-column dz-detail pad-tb-10"
          style="align-items: flex-start;"
        >
          <div class="mar-tb-5">
            <span class="f-gray">灾害类型： </span><span> {{pDetail.type}}</span
            ><span class="f-gray" style="margin-left: 50px">灾害规模： </span
            ><span> {{pDetail.scale}}m<sup>3</sup></span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">防治措施： </span
            ><span>{{pDetail.opinion}}</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">威胁人数： </span><span> {{pDetail.household}}人</span>
          </div>
          <div class="mar-tb-5 zrrspan">
            <span class="f-gray">责任人： </span><span v-for="(v,i) in ren" :key='i'>{{v.name}},</span>
          </div>
          <div class="mar-tb-5">
            <span class="f-gray">发生时间： </span
            ><span> {{timestampToTime(pDetail.happen_time)}}</span>
          </div>
        </div>
      </div>
      <van-button @click="toDetail" style="width: 180px;background:linear-gradient(to right, rgb(255, 166, 163), rgb(238, 77, 71));" round type="warning">详情</van-button>
    </van-popup>
    <bottomTabs :active="0"></bottomTabs>
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
      pDetail: {
        images:[]
      },
      ren:[]
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
    this.userinfo = {
      phone:'123456',
      position:'区县管理员'
    }
    this.localData('set','userinfo',this.userinfo);
    this.initMap();
  },
  methods: {
    getPoints() {
      getPointsAPI({city: '松溪县', phone: this.userinfo.phone})
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
        var temp = res.monitor.split(/[\n,]/g);
        for(var i =0;i<temp.length;i++){
        if(temp[i] == ""){
          temp.splice(i, 1);
          //删除数组索引位置应保持不变
          i--;
        }
      }
      for(var j = 0;j<temp.length;j++){
        var con = temp[j].split("，");
        var name =   con[0].split("姓名：");
        var phone =   con[1].split("电话：");
        this.ren.push({
          name:name[1],
          phone:phone[1]
        })
      }
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
        center: [118.083548,27.379802],
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
                content: `<div class="icon-bg">
                  <span class="iconfont icon-17huapoqu"></span>
                </div>`,
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
                content: `<div class="icon-bg">
                  <span class="iconfont icon-xiahua"></span>
                </div>`,
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
    timestampToTime(timestamp) {
      var date = new Date(timestamp* 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '年';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
      var D = date.getDate() + '日 ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
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
  background: #0E2453;
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
.zrrspan{
   overflow: hidden; 
        text-overflow: ellipsis; 
        -o-text-overflow: ellipsis;
        white-space:nowrap;
        width: 90vw;
}
.icon-border{
  border: 1px solid;
  border-radius: 50px;
  padding: 10px;
  color: #fff;
}
.amap-zoomcontrol{
  bottom: 355px !important;
}
.icon-bg{
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABOCAYAAACdfWDpAAAL00lEQVR4XtVcCXAVVRY9t/+WBQIGDAgoDiW4FSqD6IDsYAgoEUEgIFvCIkESEhgYNkNEBBdMwk4mgqCOjDqjDCViIEqMgmOhgo6OOigoqyGs2f/P73en+mMiYPLf+0t+PreKolJ97r3nne6+/frd158QQPulZ88/EPROGqijALUncBsAzQCEA7D+SsUBcCmYzoBwBMBBwfQfqxD7I/fsMf4OiFF9Zinsd28LzWEdzBoPANNdAN/kQz42RALhCzC/59Qs21vl55/2IZ5b13oRprB39/5gSiDgYQAh9US+lIC3iWlT84KCD/ydw6/CFPXqMZmBWQBu9jdR9/H4a7C2PKqgYLO/8vpFmKJevUaBOBVAF38R8zLOHiJkNN9d8JaX/jVuPglzumfPW4UJWQRE+0rEz/7bhEmktsj7+JC3cb0W5nSfHvMYtNTbxAHwczBjTlR+wQpvcnksDHfubDndpNFGAGO8SRhwH6YNzXfnTybAeKopm0fCnOrduyVp/BEAXx67yuT8CPyKBd0XlZ9fqhpTWZjCPn3u1DTxLkCtVIOr4igsDBQeDjKbIcrKwOXlgNOp6q6GI/wgYB7QIi9Pqe4oCVPUr18HIvENALMaizpQRDC1vRGWTp1gue12aG3awHT9DSCb7XcOougU9KNHoR8+jKoD+1H11ZcXBfPNzjKZO167a9cJWRipMOf69m2ra/xfAGGyYHUdN7VpA1v/aNjuj4YWFeVdGF1H1f4vYN+1E/aCD325os44NcttLXfuPOWOiFthjEJ7JrKJIYpXNcXUrh3CRo+BtUdPgKTnQFkwcboIFW+8DvuOd8F2u7JfNZCAL5vt+uAur4U5Hd13L4CunmamiAiExU9EyMAH/CrIlTz0kydRvm41HJ/+21OKBq/c5rnvx9TlWOdpPB3Tbx4xPJ6nWDrfjfDZc6E1beo5WS89HAUfomxlJrhU+aHjykRM0yJ35q2rLW2twpwbdP9dQvB+j3gSIXRcPEJHxtXrVVIXJ3HyBErS06Af+dkj2jqb2kfl5v5wpVOtwpyJ6XcYoBuVM5jNCE+ZBVu//sou9QHkkhKULFoI57dGWVQ0wtfNduR1lApzJiZ6IohfVAwLaBoaLUiDtWs3ZZf6BBrFuGThPDi/+Vo5DTMPa/5e3mUvnpddMScGDw6z6fYLyvMVIoRPT4YtZpAyiUAAuawMxXNmQf/psGq6ksh7ujWl9HRxyZPrN99zg6IXMSFdNZotdgjCpiSqwgOKE4WFKE6eBi5TK8gESr1me25WrcKcfXCAsVRorMFKzdy+Axo/lwGYfZsMSxP5AKj6ZC9Kly5WjMDHI9/ZaaxBu6zmVjobGxMHxhalKCYTIrJWu6b3wW5lmcvh2P2+Ek0iPHTNtve2XSbMudiBRrW6XSWCbchQhMZPUoE2OIbPn0dx4iSl9ywGPo3ctuNPNcKcjY25g4i+VBmF8SYckbPZ9TZ8tVjlG1tQ+dorSnQtbGnZaNu2QtetdG7IAykAZ6p4hgwbgZAx41WgQYNxPaUmjQdXVkg5MWhs5Nbtr14UZuigbWAaLPXSNET8dRO0yEgpNNgAFTnrYd/xjpQWM78eufXdOOKBA20XQk1nfu0GunU0d+qM8IXKT3MpiUAC9EM/onR2ikrKwqZvvdOSzg5/sLsmyFiulFro9BRYe/eV4oIVUPL4FIjCX6T0hBAd6dzw2BnEXDOxcefVOPslaJFK0xxp8oYAVGSvgSMvV5qawQl0fsTg9WB6TIbWWrVG46y1MlhQH6/a8xHKVyxX4fg8XRj+UC5I3jCzdOuB0BlG9/XqNXH8GEpnTpcPgPEmXRg5xFh3cbvMZ0SyDRsB2/BR8qDBjNB1FI8bCei6hCXvoQtxD/8IoJ1sPKGJybD07C2DBf3x0uSpMDoQEvuOikc9bJTpFjJkaOocmLu4ZstXtZX9JRXiqGSVj+kwFY8eWgSguWy0oXPTYO54pwwW9MfLFy+E/v23Mp4/UfGjw44BaC1Dhs5eAPOdnWSwoD9e/uR86Af/554n4UcqGfvIt2DcIhtRSNJMmO/xuJMiCxvw4+XzZkEck27lO0AlY4fvASBdsLVNnApLr6t31lt9BsqSHwOfPyc7IblUMm7EmwAekSGtsUNhHTZSBgvq41xZibKpEwB2vyOEiDZQ6fi4pQyeJxuRuXMXhCRd5RO8n39C+aK5sqGCmeZSyYSRcQT5kiY1aYqwrPXSoMEMcO7eBfvLG6QUSWAQVUyIu1EnKPUZQp96HlrrmvViaYJgA9jXrYBzn7TPLYRujXItVJUmjPoeQAfZQKwjx8ASHVw9JBnnmuNOJ8pnKrVTPmu0cUuXi8JMHJ1BgLEd1a1p17dFyCKP+/yysAE5rh/4HPbVGSq5loRveO0JlzDlk0YPZdA/VbxC0pZCu/4GFWhQYexrs6Dv/0zKiYjuC8t5da9LmKKEhMZhJsd5AJrM03xPN1gnBWf3sS7uXHQKFU/MAYTsrRqlYa1vamK0amsabmVTxmwkIF4mDDQTQp58BhTVUgoNFoBjcw70vQVyOkyrwnJeSTaANcJUJo5uJ4TJWIKQmumOTrBOk5YkaZxAAMTRI7AvSwNETb++7rQm8w1ha186epkwrlozdexugJQWXayJKTAECmoTAvblSyAOy883M3aGZ788oHo8l20DqZga3xcklBq9FNEE1vmLYfwfrObcvhXGPxVjUNewdZtqJjm/21FVMW1CPoBeKsG0m2+FdfqfXZuHgs3Ed9/AsSZD6RYiYGvI2k3Gt1U19jthypMmtSHhdN1nKma6rxcsceMbZN9dXfz4xDHYM5cCFfKWrBHDYTU1a5K54axbYYyDldPjM1hhwlcdyNwvBuYhI1R0rHeM8Wh2rHxWZWnhVy78VOjqTWlXEqtzO2tlUsJ3nnypZurWC+YRYxr0tuKjP6NqfRa4pFj1BOwPWbXxj7WB6xYmdeJN0HFQNYOB027rCPOjCaBGjT1x8wtW7N+Hqi2bAXulcjxdcOvw1Rtr/a7A7T72iuSJY4noZeVMxsSoSVOXOFqHWz1x8x5rr4Rz6xvQP1Fqv/9WXBlDbCtf/FddiaUb/CtSJi0m4AlPmWud74U5dnj9Pc6ZIQ58BufW18HFxkZTD4wxJ2TFi8+785AK4yrGqVOyCTzFg9QXoWYLTH/qDq3PANA1ftpTIwTEV59Dz9sB4+njqREjw5qVI12KVBLGSO6YOXklg5I8JeLCE0Frfwu0u7tCu+V2ILyRZ2GEAB8/CnFgH8QX+8DFxvuuN0bLbBnZ81U8lYVxiTPrsakM1PpRgkqyapHoutagtu1cL6LU/FpQowjAaru4NdbYDuawgy+cBxcVgo8dgTh0EKjw7SMuYoq3ZqzfpMrTI2GMoFUzJ3djTTO2fF4VG2UY+IVYe9D6wrrPVUVxXeSegKuxnDLluioL/Q2gPt74B8qHGblWi2UsLVtltKE9Mq+Eqc7gmJOYDcDzouwRRW/BtNr63FrvaqK3V8ylVB2zp40Dsd9+U8FbGS71Y+JRtmfX/92XWD5dMdWJq+Ym9mfWNgDc0IvBhwgUb3l2jcJynXvZ/CKMkYLTkyKclSKvAX/44mOz3RpNmZlqr9SSy8lvwlTncc5/PJs54HUnw7JsjXTS5smt5XdhXPOdBUnTiXmVJ0S8xTJ4snXpGvUv8hQT1YswrvnOgmndwaa3AZbu1lLkeiXsBAsxxPrM2n1e+rt1qzdhXHVn0fRWuk7/AHv+7bZksPkmi3U4pb9wdf1G1ZWDci5IzgHBPx84Ma82P73K6/mJ6tVVr1fMpST0hclJDKxUJVY7jqaYl6zI8S2GmnfAhHHVnbQZ9xPjNZVdolfQP86C4yxPr/xYbVi+owIqjKvuzEu6Vpi1XAYUu3X8kanCOpCWLy/zfbjqEQIuTM18Z9GMl8CYIJl/rjIvznL1kgNtDSaMMVA9PWUmGC/UUU8STU9mNtjetgYVxhDEmZYykMhVdy7+fAjhpBDao5bFGbsDfZVcmq/BhXHVnSWprYWTPwTIoQHdKT3zsq5gQwj0fyJlzaYstVW/AAAAAElFTkSuQmCC);
  height: 35px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 80%;
  width: 35px;
}
.icon-bg>.iconfont{
  position: relative;
  top: 6px;
}
</style>