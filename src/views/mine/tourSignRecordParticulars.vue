<template>
  <div >
    <navBar :title="'巡查详情'"></navBar>
    <div>
        <div class="p_title">
            光泽县芝麻镇芝麻村15号
        </div>
        <div class="p_img img-wrapper pu-row">
            <img
                class="mar-r-5"
                v-for="(pic, index) in 7"
                src="../../assets/imgs/bad-bg.png"
                :key="index"
                :preview="index"
                preview-text="描述文字"
                alt=""
            />
        </div>
    </div>
    <div class="cell_group">
        <div class="cell_group_line">
            <div class="line_title">灾害类型</div>
            <div class="line_text">滑坡</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">灾害规模</div>
            <div class="line_text">3m<sup>3</sup></div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">是否处理</div>
            <div class="line_text">已处理反馈</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">监测人</div>
            <div class="line_text">
                <span>陈某某</span>
                 / 
                <span>13799999999</span>
            </div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">发生地点</div>
            <div class="line_text">
                <span>光泽县止马镇马村15号</span>
            </div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">发生时间</div>
            <div class="line_text">2020年4月13日 15:54</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">防治措施</div>
            <div class="line_text">防护围挡、警告指示牌</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">威胁户数</div>
            <div class="line_text">19户</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">威胁人数</div>
            <div class="line_text">62人</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">威胁财产</div>
            <div class="line_text">10万元</div>
        </div>
        <div class="cell_group_line">
            <div class="line_title">责任人</div>
            <div class="line_text">
                王某某
                 / 
                <span>13788888888</span>
            </div>
        </div>
    </div>
    <div class="henxian"></div>
    <div class="query_log">
        <div class="query_log_title">查询记录</div>
        <van-steps active-color="red" direction="vertical" :active="0">
            <van-step v-for="(item,i) in 3" :key="i">
                <div class="p_steps_top">
                    <div class="top_time">2月10号 15:21</div>
                    <div class="top_text">陈某某 <span><van-icon name="location-o" /></span></div>
                </div>
                <div class="p_steps_imgs">
                    <img
                        class="p_steps_img"
                        v-for="(pic, index) in 3"
                        src="../../assets/imgs/bad-bg.png"
                        :key="index"
                        :preview="index"
                        preview-text="描述文字"
                        alt=""
                    />
                </div>
                <p class="p_steps_bottom">有变形</p>
            </van-step>
        </van-steps>
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
</style>
