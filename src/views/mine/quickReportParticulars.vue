<template>
  <div >
    <navBar :title="'灾(险)情速报记录详情'"></navBar>
    <div>
        <div class="p_title">光泽县芝麻镇芝麻村15号</div>
        <div class="p_title_bz">光泽县止马镇</div>
    </div>
    <div class="query_log">
        <van-steps active-color="red" direction="vertical" :active="0">
            <van-step v-for="(item,i) in 5" :key="i">
                <div class="r_top">
                    <div class="r_time"><span>4月29日 19:24</span></div>
                    <div class="r_button"><span>修改</span></div>
                </div>
                <div class="r_num">
                    <div class="amount">
                        <span class="amount_text">灾情数量</span>
                        <span class="amount_num">12处</span>
                    </div>
                    <div class="amount">
                        <span class="amount_text">险情数量</span>
                        <span class="amount_num">9处</span>
                    </div>
                    <div class="amount">
                        <span class="amount_text">转移人数</span>
                        <span class="amount_num">1204人</span>
                    </div>
                    <div class="amount">
                        <span class="amount_text">巡查地灾点</span>
                        <span class="amount_num">1524次</span>
                    </div>
                    <div class="amount">
                        <span class="amount_text">巡查高陡边坡</span>
                        <span class="amount_num">154次</span>
                    </div>
                    <div class="amount">
                        <span class="amount_text">巡查人次</span>
                        <span class="amount_num">584次</span>
                    </div>
                    <div class="amount" style="width:100%;">
                        <span class="amount_text">触动应急技术人员人次</span>
                        <span class="amount_num">201人</span>
                    </div>
                </div>
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
    padding:20px 20px 10px 20px;
}
.p_title_bz{
    font-size: 16px;
    text-align: left;
    padding: 0 20px ;
}
.query_log{
    box-sizing: border-box;
    padding: 20px;
}
.r_top{
    position: absolute;
    top: 5px;
    left: 0;
    width: 100%;
}
.r_time{
    width: 70%;
    display: inline-block;
    text-align: left;
}
.r_time span{
    background-color: #FF5000;
    font-size: 22px;
    color: white;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 20px;
    background-image: -webkit-linear-gradient(left, #EE4D47,rgb(243, 124, 120));
}
.r_button{
    width: 30%;
    display: inline-block;
    text-align: right;
}
.r_button span{
    border-radius: 20px;
    padding: 2.5px 5px;
    color: rgba(224, 53, 53, 0.945);
    border:1px solid rgba(224, 53, 53, 0.945);
    font-size: 16px;
    
}
.r_num{
    margin: 35px 0;
}
.amount{
    width: 50%;
    display: inline-block;
    text-align: left;
    font-size: 16px;
    margin: 5px 0;
}
.amount_text{
    color: #aea7a7;
    padding-right:10px ;
}
.amount_num{
    color: #000;
}
</style>
