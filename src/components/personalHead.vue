<template>
  <div>
    <navBar :title="'个人信息'" left-arrow></navBar>
    <div class="handPic-head">
      <div>
        <p>
          <span class="font-color-white"><b style="font-size:32px">王大仙&nbsp;&nbsp;</b>巡查员</span>
        </p>
        <p style=""><span>单位：建阳区童游街道自然资源所</span></p>
        <p><span>管辖范围：南平市建阳区童游街道</span></p>
      </div>
      <div>
        
      </div>
    </div>
    <div class="handPic-info">
      <ul class="chooser-list">
        <li 
          :class="[actIndex == 0 ? 'active' : '']"  
          @click="goHandPlc()"
        >
          <span>12</span>
          <div>随手拍</div>
        </li>
        <li
          :class="[actIndex == 1 ? 'active' : '']" 
          @click="goCheckIn()"
        >
          <span>250</span>
          <div>巡查签到</div>
        </li>
        <li @click="goDisasterStudies()">
          <span>42</span>
          <div>灾情速报</div>
        </li>
        <li @click="goDisasterReport()">
          <span>39</span>
          <div>灾情上报</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default{
  data() {
    return {
      actIndex:''
    }
  },
  methods: {
    goHandPlc(){
      this.$router.push({path: '/personal/handPic'})
    },
    goCheckIn(){
      this.$router.push({path: '/personal/chenkIn'})
    },
    goDisasterStudies(){
      this.$router.push({path: '/personal/disasterStudies'})
    },
    goDisasterReport(){
      this.$router.push({path: '/personal/disasterReport'})
    }
  },
}

</script>
<style>
  .handPic-head{
    width: 100%;
    height: 150px;
    background-color: #F25952;
  }
  p{
    margin: 0;
  }
  .handPic-info{
		padding: 8px 0;
		font-size: 14px;
	}
	.handPic-info ul{
		display: flex;
    justify-content: space-around;
  }
  .handPic-info ul li{
    width: 70px;
    height: 40px;
  }
  .active{
    background-color: #F8F8FB;
  }
</style>