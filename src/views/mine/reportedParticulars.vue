<template>
  <div style="    background-color: #f2f3f5;">
    <navBar :title="'灾(险)情上报记录详情'"></navBar>
    <div class="cell_group">
        <div class="cell_group_line">
            <div class="line_title line_title2">灾险情名称</div>
            <div class="line_text line_text2">光泽县止马镇马村43号</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">发布人</div>
            <div class="line_text"><span>王某某</span></div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">联系电话</div>
            <div class="line_text"><span>13799999999</span></div>
        </div>
         <div class="cell_group_line">
            <div class="line_title">灾害类型</div>
            <div class="line_text">新灾点</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">发生时间</div>
            <div class="line_text">4/21/16:25</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">灾点地址</div>
            <div class="line_text">
                <span>光泽县止马镇止马村43号</span>
                <span style="color:red;"><van-icon name="location-o" /></span>
            </div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">威胁人数</div>
            <div class="line_text">7人</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">转移人数</div>
            <div class="line_text">26人</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title line_title3">出动应急技术人员人次</div>
            <div class="line_text line_text3">2次</div>
        </div>
    </div>
    <div class="query_log">
        <div class="query_log_title">现场照片</div>
        <div class="query_log_img">
            <img 
        v-for="(item,i) in 3" :key="i"
        src="../../assets/imgs/bad-bg.png" 
        alt="">
        </div>
    </div>
     <div class="query_log">
        <div class="query_log_title">现场视频</div>
        <div class="query_log_img">
            <img 
        v-for="(item,i) in 1" :key="i"
        src="../../assets/imgs/bad-bg.png" 
        alt="">
        </div>
    </div>
    <div class="query_log">
        <div class="query_log_title">处理记录</div>
        <div class="query_log_jilu">
            <van-steps direction="vertical" :active="5">
                <van-step>
                    <div class="q_time">2019年12月25日 16:56</div>
                    <div class="q_name">陈某某</div>
                    <div class="q_type ysb">已上报</div>
                </van-step>
                <van-step>
                    <div class="q_time">2020年1月2日 16:56</div>
                    <div class="q_name">王某某</div>
                    <div class="q_type cxzj">撤销办结</div>
                </van-step>
                <van-step>
                    <div class="q_time">2020年1月3日 16:56</div>
                    <div class="q_name">张某某</div>
                    <div class="q_type yxg">已修改</div>
                </van-step>
                <van-step>
                    <div class="q_time">2020年1月6日 16:56</div>
                    <div class="q_name">陈某某</div>
                    <div class="q_type ybj">已办结</div>
                </van-step>
                <van-step>
                    <div class="q_time" style="color:#000;">2020年1月10日 16:56</div>
                    <div class="q_name" style="color:#000;">曾某某</div>
                    <div class="q_type ylr">已列入</div>
                </van-step>
            </van-steps>
        </div>
    </div>
    <div class="typeButton">
       <van-button round type="info" size="large" color="linear-gradient( rgb(243, 124, 120),#EE4D47)">取消列入</van-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    
  },
};
</script>

<style>
.typeButton{
    width: 60%;
    margin: 0 auto;
    padding: 40px 0;
}
.query_log_jilu{
    margin-top: 20px;
}
.q_time{
    width: 50%;
    display: inline-block;
    text-align: left;
    color: #aaaaaa;
}
.q_name{
    width: 25%;
    display: inline-block;
    text-align: left;
    color: #aaaaaa;
}
.q_type{
    width: 25%;
    display: inline-block;
    text-align: left;
}
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
.p_img img{
    border-radius: 10px;
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
    height: 100px;
    text-align: left;
    margin-top: 20px;
}
.query_log_img img{
    width: 100px;
    height: 100px;
    margin-right: 5px;
    display: inline-block;
}
.ysb{
    color: rgb(211, 198, 198);
}
.yxg{
    color: rgb(255, 202, 2);
}
.ybj{
    color: rgb(31, 2, 255);
}
.ylr{
    color: rgb(38, 234, 245);
}
.cxzj{
    color: rgb(243, 60, 60);
}

</style>
