<template>
  <div>
    <!-- <navBar :title="'灾点详情'"></navBar> -->
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
            <div class="line_text" v-if="ren.length > 1" >
                <div   v-for="(item,i) in ren" :key='i'><span>{{item.name}}</span> / <span>{{item.phone}}</span></div>
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
        <van-button style="width: 180px;margin: 0px auto;margin-bottom:50px;background:linear-gradient(to right, rgb(255, 166, 163), rgb(238, 77, 71));" round type="warning" @click="to(info.id)">详情巡查记录</van-button>

  </div>
</template>
<script>
import {getPointDetailAPI} from '../../api/index'
export default {
  data() {
    return {
      info: {
        images:[]
      },
      ren:[{
        name:'',phone:''
      }]
    }
  },
  mounted() {
    this.nav('灾点详情');
    this.getDetail()
  },
  methods: {
    getDetail() {
      let id = this.$route.query.id
      getPointDetailAPI({id: id}).then(res => {
      console.log(res)

      var temp = res.monitor.split(/[\n,]/g);
        for(var i =0;i<temp.length;i++){
        if(temp[i] == ""){
          temp.splice(i, 1);
          //删除数组索引位置应保持不变
          i--;
        }
      }
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

        res.id = id
        this.info = res
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
    },
    to(id){
      this.$router.push({path: '/mine/toursignrecordparticulars',query:{id:id}})
    }
  },
}
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
    vertical-align:top;
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
    color: #00caf8;
}
</style>