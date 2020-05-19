<template>
  <div >
    <!-- <navBar :title="'巡查详情'"></navBar> -->
    <div>
        <div class="p_title">
            {{log[0].name}}
        </div>
        <div class="p_img img-wrapper pu-row">
             <templat v-if="info.image.length != 0" class="xxx">
                 <img
                class="mar-r-5 aaaa"
                v-for="(pic, index) in info.image"
                :src="pic"
                :key="index"
                :preview="index"
                preview-text="描述文字"
                alt=""
            />
                </templat>
         <van-empty v-else description="暂无图片" />
           
           
        </div>
    </div>
    <div class="cell_group">
        <div class="cell_group_line">
            <div class="line_title">灾害类型</div>
            <div class="line_text">{{info.type}}</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">灾害规模</div>
            <div class="line_text">{{info.scale}}m<sup>3</sup></div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">是否处理</div>
            <div class="line_text">{{info.is_handle}}</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">监测人</div>
            <div class="line_text">
                <span>{{info.monitor}}</span>
            </div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">发生地点</div>
            <div class="line_text">
                <span>{{info.address}}</span>
            </div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">发生时间</div>
            <div class="line_text">{{timestampToTime(info.happen_time)}}</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">防治措施</div>
            <div class="line_text">{{info.opinion}}</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">威胁户数</div>
            <div class="line_text">{{info.household}}户</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">威胁人数</div>
            <div class="line_text">{{info.number}}人</div>
        </div>
        <!-- <div class="cell_group_line">
            <div class="line_title">威胁财产</div>
            <div class="line_text">10万元</div>
        </div> -->
        <div class="cell_group_line">
            <div class="line_title">责任人</div>
            <div class="line_text">
                {{log[0].username}}
                 / 
                <span>{{log[0].mobile}}</span>
            </div>
        </div>
    </div>
    <div class="henxian"></div>
    <div class="query_log">
        <div class="query_log_title">查询记录</div>
        <van-steps active-color="red" direction="vertical" :active="log.length">
            <van-step v-for="(item,i) in log" :key="i">
                <div class="p_steps_top">
                    <div class="top_time">{{timestampToTime(item.create_time)}}</div>
                    <div class="top_text">{{item.username}} <span><van-icon name="location-o" /></span></div>
                </div>
                <div class="p_steps_imgs">
                    <img
                        class="p_steps_img"
                        v-for="(pic, index) in item.image"
                        :src="pic"
                        :key="index"
                        :preview="index"
                        preview-text="描述文字"
                        alt=""
                    />
                </div>
                <p class="p_steps_bottom">{{item.content}}</p>
            </van-step>
        </van-steps>
    </div>
    
  </div>
</template>

<script>
import {patrolInfo} from '../../api/mine'
export default {
    data(){
        return {
            info:{},
            log:[]
        }
    },
  methods: {
    getInfo(id){
        patrolInfo({id:id}).then(res => {
            console.log(res)
            this.info = res.data;
            this.log = res.log;
        })
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '年';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
      var D = date.getDate() + '日 ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
  },
  mounted(){
      this.nav('巡查详情');
      this.userinfo = this.localData('get','userinfo');
      var id = this.$route.query.id;
      this.getInfo(id)
  }
};
</script>

<style>
.p_title{
    font-size: 24px;
    text-align: left;
    font-weight: 600;
    padding:20px ;
}
.p_img{
    box-sizing: border-box;
    padding:0 20px ;
    margin-bottom: 50px;
    
}
.xxx{
    display: flex;
  flex-direction:  row ;
}
.p_img img{
    border-radius: 10px;
}
.cell_group{
    box-sizing: border-box;
    padding:0 20px;
    margin-bottom: 25px;
}
.cell_group_line{
    margin: 10px 0;
    font-size: 18px;
}
.cell_group_line .line_title{
    display: inline-block;
    width: 20%;
    color: rgb(157, 159, 161);
    text-align: right;
}
.cell_group_line .line_text{
    width: 80%;
    color: #000;
    text-align: left;
    box-sizing: border-box;
    padding-left:10px ;
    display: inline-block;
}
.cell_group_line .line_text span{
    color: #1989fa;
}
.query_log{
    box-sizing: border-box;
    padding: 20px;
}
.query_log_title{
    color: #868484;
    text-align: left;
    font-size: 18px;
}
.p_steps_top{
    width: 80%;
    margin-bottom: 15px;
}
.top_time{
    text-align: left;
    color: #000;
    width: 50%;
    display: inline-block;
}
.top_text{
    text-align: right;
    width: 50%;
     display: inline-block;
    color: #aaaaaa;
}
.p_steps_imgs{
    text-align: left;
}
.p_steps_img{
    width: 70px;
    height: 70px;
    border-radius: 5px;
    margin-right: 10px;
    
}
.p_steps_bottom{
    text-align: left;
    color: #000;
}
.henxian{
    width: 100%;
    height: 3px;
    background-color: #e4e3e3;
}
.top_text span{
    color: red;
}
.aaaa{
    height: 150px;
}
</style>
