<template>
  <div >
    <!-- <navBar :title="'巡查详情'"></navBar> -->
    <div>
        <div class="p_title">
            {{info.address}}
        </div>
        <div class="p_img img-wrapper pu-row">
             <template v-if="info.images.length != 0" class="xxx">
                 <img
                class="mar-r-5 aaaaa"
                v-for="(pic, index) in info.images"
                :src="pic"
                :key="index"
                :preview="index"
                preview-text="描述文字"
                alt=""
            />
                </template>
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
            <div class="line_text" v-if="ren.length > 0">
                <div v-for="(item,i) in ren" :key='i'><span>{{item.name}}</span> / <span>{{item.phone}}</span></div>
            </div>
            <div class="line_text" v-else >暂无</div>
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
        <div class="cell_group_line">
            <div class="line_title">责任人</div>
            <div class="line_text" v-if="ren.length > 0">
                <span>{{ren[0].name}}</span> / <span>{{ren[0].phone}}</span>
            </div>
            <div class="line_text" v-else >暂无</div>
        </div>
    </div>
    <div class="henxian"></div>
    <div class="query_log">
        <div class="query_log_title">查询记录</div>
        <van-steps v-if="log.length > 0" active-color="red" direction="vertical" :active="log.length">
            <van-step v-for="(item,i) in log" :key="i">
                <div class="p_steps_top">
                    <div class="top_time">{{timestampToTime(item.create_time)}}</div>
                    <div class="top_text">{{item.username}} <span><van-icon name="location-o" /></span></div>
                </div>
                <div class="p_steps_imgs">
                    <img
                        class="p_steps_img"
                        v-for="(pic, index) in item.images"
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
        <van-empty v-else description="暂无记录" />
    </div>
    
  </div>
</template>

<script>
import {patrolInfo} from '../../api/mine'
export default {
    data(){
        return {
            info:{
                images: []
            },
            log:[],
            ren:[
                {name:'',phone:''}
            ]
        }
    },
  methods: {
    getInfo(id){
        patrolInfo({id:id}).then(res => {
            console.log(res)
            this.info = res.data;
            var temp = this.info.monitor.split(/[\n,]/g);
            for(var i =0;i<temp.length;i++){
                if(temp[i] == ""){
                temp.splice(i, 1);
                //删除数组索引位置应保持不变
                i--;
                }
            }
            console.log(temp);
            this.ren = [];
            for(var j = 0;j<temp.length;j++){
                var con = temp[j].split("，");
                var name =   con[0].split("姓名：");
                var phone =   con[1].split("电话：");
                this.ren.push({
                    name:name[1],
                    phone:phone[1]
                })
            }
            console.log(this.ren);
            this.log = res.log;
        })
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
    margin-bottom:20px;
    padding-bottom: 20px;
    box-shadow: 0px 3px 10px #cac7c7;
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
     vertical-align:top;
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
    color: #00caf8;
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
.aaaaa{
    width: 90vw;
    height: 200px;
}
.img-wrapper {
    width: 100%;
    overflow-x: auto;
}
.pu-row {
    display: flex;
    align-items: center;
}
</style>
