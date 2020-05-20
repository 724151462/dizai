<template>
  <div style="background-color: #f2f3f5;">
    <!-- <navBar :title="'灾(险)情上报记录详情'"></navBar> -->
    <div class="cell_group">
        <div class="cell_group_line">
            <div class="line_title line_title2">灾险情名称</div>
            <div class="line_text line_text2">{{info.name}}</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">发布人</div>
            <div class="line_text"><span>{{info.username}}</span></div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">联系电话</div>
            <div class="line_text"><span>{{info.personnel}}</span></div>
        </div>
         <div class="cell_group_line">
            <div class="line_title">灾险类型</div>
            <div class="line_text">{{info.disaster_type}}</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">灾点类型</div>
            <div class="line_text">{{info.type}}</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">发生时间</div>
            <div class="line_text">{{timestampToTime(info.happen_time)}}</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">灾点地址</div>
            <div class="line_text">
                <span>{{info.address}}</span>
                <span style="color:red;"><van-icon name="location-o" /></span>
            </div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">威胁人数</div>
            <div class="line_text">{{info.threaten}}人</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">转移人数</div>
            <div class="line_text">{{info.transfer}}人</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title line_title3">出动应急技术人员人次</div>
            <div class="line_text line_text3">{{info.dispatch_number}}次</div>
        </div>
    </div>
    <div class="query_log">
        <div class="query_log_title">现场照片</div>
        <div class="query_log_img" v-if="info.image.length > 0">
            <img 
        v-for="(item,i) in info.image" :key="i"
                :preview="i"
                preview-text="描述文字"
        src="../../assets/imgs/bad-bg.png" 
        alt="">

         
        </div>
           <van-empty v-else description="暂无图片" />
    </div>
     <div class="query_log" >
        <div class="query_log_title">现场视频</div>
        <div class="query_log_img" v-if="info.video1.length > 0" >
            <div 
            :key="i"  v-for="(item,i) in info.video1"
              class="video_img" 
            @click="showPopup(item)">
                <div></div>
                <img 
                src="../../assets/imgs/bad-bg.png" 
                alt="">
            </div>
        </div>
        <van-empty v-else description="暂无视频" />
    </div>
    <div class="query_log">
        <div class="query_log_title">处理记录</div>
        <div class="query_log_jilu" v-if="log.length > 0">
            <van-steps direction="vertical" :active="log.length">
                <van-step v-for="(item,i) in log" :key="i">
                    <div class="q_time" :style="i==log.length-1?'color:#000;':''">{{timestampToTime(item.open_time)}}</div>
                    <div class="q_name" :style="i==log.length-1?'color:#000;':''">{{item.handler}}</div>
                    <div v-if="item.new_status=='已上报'" class="q_type ysb2">{{item.new_status}}</div>
                    <div v-if="item.new_status=='未通过'" class="q_type ysb2">{{item.new_status}}</div>
                    <div v-if="item.new_status=='已删除'" class="q_type cxbj2">{{item.new_status}}</div>
                    <div v-if="item.new_status=='已办结'" class="q_type ybj2">{{item.new_status}}</div>
                    <div v-if="item.new_status=='已列入'" class="q_type ylr2">{{item.new_status}}</div>
                    <div v-if="item.new_status=='撤销办结'" class="q_type cxbj2">{{item.new_status}}</div>
                    <div v-if="item.new_status=='已修改'" class="q_type yxg2">{{item.new_status}}</div>
                    <div v-if="item.opinion.length > 1" class="yijian"><span>{{item.opinion}}</span></div>
                </van-step>
            </van-steps>
        </div>
        <van-empty v-else description="暂无记录" />
    </div>
    <van-popup v-model="show"> 
        <div class="videoshow">
            <video-player  class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
            ></video-player>
        </div>
    </van-popup>
    <br>
    <van-field 
    label-class="redColor" 
    v-model="why" 
    label="处置原因" 
    placeholder="(未通过、撤销、删除、驳回 必填原因)"/>
    <br>
    <!-- 处置意见  指导一线处置/技术人员现场处置/出具调查报告/函告属地政府 -->
    <van-field
    v-if="user == '区县级人员' && info.status == '已上报'"
    readonly
    clickable
    label="处置意见"
    :value="value"
    placeholder="(办结必选)请选择处置意见"
    @click="showPicker = true"
    :is-link="true"
    label-class="redColor"
    />
        
        <van-popup v-model="showPicker" round position="bottom">
        <van-picker
            title="处置意见" 
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
        />
    </van-popup>
    <div class="typeButton">
        <van-row gutter="20" v-if="(info.personnel == userinfo || userinfo.position == '社区管理员' || userinfo.position == '乡镇管理员')&& info.status == '已上报'">
            <van-col span="12"><van-button round type="info" @click="unsubscribe" size="large" color="linear-gradient(rgb(255, 214, 89), rgb(243, 162, 35))">撤销上报</van-button></van-col>
            <van-col span="12"><van-button round type="info" size="large" color="linear-gradient( rgb(243, 124, 120),#EE4D47)">修改上报</van-button></van-col>
            <br>
        </van-row>
        <van-row gutter="20" v-if="(userinfo.position == '区县管理员' || userinfo.position == '乡镇管理员')&& info.status == '已上报'">
            <van-col span="12"><van-button round type="info" @click="notPass"  size="large" color="linear-gradient(rgb(255, 214, 89), rgb(243, 162, 35))">驳回</van-button></van-col>
            <van-col span="12"><van-button round type="info" size="large" color="linear-gradient( rgb(243, 124, 120),#EE4D47)">报上级处理</van-button></van-col>
            <br>
        </van-row>
        
        <van-row gutter="20" v-if="userinfo.position == '区县管理员' && info.status == '已上报'">
            <van-col span="12"><van-button @click="unsubscribe" round type="info" size="large" color="linear-gradient(rgb(255, 214, 89), rgb(243, 162, 35))">删除上报</van-button></van-col>
            <van-col span="12"><van-button round type="info" @click="finish" size="large" color="linear-gradient( rgb(243, 124, 120),#EE4D47)">办结</van-button></van-col>
            <br>
        </van-row>
        <van-row gutter="20" v-if="(userinfo.position == '区县管理员' ||  userinfo.position == '区市管理员') && info.status == '已办结'">
            <van-col span="12"><van-button @click="cancellation" round type="info" size="large" color="linear-gradient(rgb(255, 214, 89), rgb(243, 162, 35))">撤销办结</van-button></van-col>
            <van-col span="12"><van-button @click="includeList" round type="info" size="large" color="linear-gradient( rgb(243, 124, 120),#EE4D47)">列入系统</van-button></van-col>    
            <br>
        </van-row>
        <van-row gutter="20" v-if="(userinfo.position == '区县管理员' ||  userinfo.position == '区市管理员')&& info.status == '已列入'">
            <van-col span="16"><van-button  @click="delist" round type="info" size="large" color="linear-gradient( rgb(243, 124, 120),#EE4D47)">取消列入</van-button></van-col>    
            <br>
        </van-row>
    </div>
  </div>
</template>

<script>
import {
    getScheduleInfo, 
    operateUnsubscribeAPI, 
    operateDelistAPI, 
    operateCancellationAPI,
    operateIncludeListAPI,
    operateFinishAPI,
    operatenotPassAPI
} from '../../api/mine'
export default {
    data(){
        return {
            info:{},
            log:[],
            // 视频播放
            playerOptions : {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "",
                    src: 'http://vjs.zencdn.net/v/oceans.mp4'//url地址          
                    // src: "" //url地址
                }],
                poster: "", //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true  //全屏按钮
                }
            },
            show: false,
            value: '',
            showPicker: false,
            columns: [
                {
                    text:'指导一线处置',
                    children:[]
                },{
                    text: '技术人员现场处置',
                    children:['1人','2人','3人','4人','5人','6人','7人','8人','9人','10人']
                },{
                    text:'出具调查报告',
                    children:[]
                },{
                    text:'函告属地政府',
                    children:[]
                }
            ],
            why:''
        }
    },
    methods: {
        onConfirm(value) {
            console.log(value);
            if(value[0] == '技术人员现场处置'){
                this.value = value[0] + value[1];
            }else{
                this.value = value[0] ;
            }
            this.showPicker = false;
        },
        // 驳回
        notPass() {
            operatenotPassAPI({id: this.$route.query.id, phone: this.userinfo}).then(res => {
                console.log(res)
                // if(res.status == 'fail')this.$toast.fail(res.msg);
                // if(res.status == "success")this.$toast.success(res.msg);
            })
        },
        // 办结
        finish() {
            operateFinishAPI({id: this.$route.query.id, phone: this.userinfo}).then(res => {
                console.log(res)
                if(res.status == 'fail')this.$toast.fail(res.msg);
                if(res.status == "success")this.$toast.success(res.msg);
            })
        },
        // 列入
        includeList() {
            operateIncludeListAPI({id: this.$route.query.id, phone: this.userinfo}).then(res => {
                console.log(res)
                if(res.status == 'fail')this.$toast.fail(res.msg);
                if(res.status == "success")this.$toast.success(res.msg);
            })
        },
        // 取消列入
        delist() {
            operateDelistAPI({id: this.$route.query.id, phone: this.userinfo}).then(res => {
                console.log(res)
                if(res.status == 'fail')this.$toast.fail(res.msg);
                if(res.status == "success")this.$toast.success(res.msg);
            })
        },
        // 撤销上报
        unsubscribe() {
            operateUnsubscribeAPI({id: this.$route.query.id, phone: this.userinfo,}).then(res => {
                console.log(res)
                if(res.status == 'fail')this.$toast.fail(res.msg);
                if(res.status == "success")this.$toast.success(res.msg);

            })
        },
        // 撤销办结
        cancellation() {
            operateCancellationAPI({id: this.$route.query.id, phone: this.userinfo}).then(res => {
                console.log(res)
                if(res.status == 'fail')this.$toast.fail(res.msg);
                if(res.status == "success")this.$toast.success(res.msg);
            })
        },
        showPopup(url) {
            this.show = true;
            this.playerOptions.sources[0].src = url;
        },
        getInfo(id){
            getScheduleInfo({id:id}).then(res => {
                console.log(res)
                this.info = res.data;
                this.log = res.log;
                this.user = res.user;
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
        this.nav('灾(险)情上报记录详情');
        this.userinfo = this.localData('get','userinfo');
        var id = this.$route.query.id;
        this.getInfo(id)
    },
    
};
</script>

<style>
.videoshow{
    width: 100vw;
    height: auto;
}
.video_img{
    position: relative;
    display: inline-block;
}
.video_img div{
    position: absolute;
    top: 30%;
    left: 30%;
    width: 40%;
    height: 40%;
    background: url('../../assets/imgs/video.png');
    background-size: 100% 100%;
}
.typeButton{
    width: 90%;
    margin: 0 auto;
    padding: 40px 0;
}
.query_log_jilu{
    margin-top: 20px;
}
.q_time{
    width: 50%;
    display: inline-block;
    text-align: center;
    color: #aaaaaa;
}
.q_name{
    width: 25%;
    display: inline-block;
    text-align: center;
    color: #aaaaaa;
}
.q_type{
    width: 25%;
    display: inline-block;
    text-align: center;
    border:none !important;
}
.cell_group{
    box-sizing: border-box;
    padding:20px;
    margin-top: 15px;
    background-color: white;
}
.cell_group_line{
    margin: 10px 0;
    font-size: 18px;
}
.cell_group_line .line_title{
    display: inline-block;
    width: 20%;
    color: rgb(157, 159, 161);
    text-align: left;
}
.cell_group_line .line_text{
    width: 80%;
    color: #000;
    text-align: left;
    box-sizing: border-box;
    padding-left:10px ;
    display: inline-block;
}
.line_title3{
    width: 50% !important;
}
.line_text3{
    width: 50% !important;
}
.line_title2{
    width: 25% !important;
}
.line_text2{
    width: 75% !important;
}
.cell_group_line .line_text span{
    color: #1989fa;
}
.query_log{
    box-sizing: border-box;
    padding: 20px;
    background-color: white;
    margin-top: 5px;
}
.query_log_title{
    color: #868484;
    text-align: left;
    font-size: 18px;
}
.query_log_img{
    width: 100%;
    overflow-x: auto;
    display: flex;
    height: 105px;
    text-align: left;
    margin-top: 20px;
}
.query_log_img img{
    width: 100px;
    height: 100px;
    margin-right: 5px;
    display: inline-block;
}
.ysb2{
    color: rgb(211, 198, 198);
}
.yxg2{
    color: rgb(255, 202, 2);
}
.ybj2{
    color: rgb(31, 2, 255);
}
.ylr2{
    color: rgb(38, 234, 245);
}
.cxbj2{
    color: rgb(243, 60, 60);
}
.yijian{
    text-align: left;
}
.yijian span{
     background-color: #f7f6f6;
    color: #aaaaaa;
    font-size: 12px;
    border-radius: 10px;
    display: inline-block;
    margin-left: 20px;
    margin-top: 5px;
    padding:1px 5px;
}
.alinput{
    border:none;
    width: 100%;
    border-bottom:1px solid #aaaaaa;
    margin-top: 10px;
}
.redColor{
    color: rgb(243, 60, 60) !important;
}
</style>
