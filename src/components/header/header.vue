<template>
	<div id="header">
		<!-- 头部主题部分 -->
		<div class="content-wrapper">
			<!-- 商家头像 -->
			<div class="avatar">
				<img :src="seller.avatar" alt="商家头像">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">	{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<!-- 判断商家是否优惠活动，无：隐藏，有：显示第一个优惠活动 -->
				<!-- v-if v-show都是动态的显示DOM元素
				v-if是动态的向DOM树内添加或者删除DOM元素；v-show是通过设置DOM元素的display样式属性控制显隐 -->
				<div v-if="seller.supports" class="supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<!-- 与上同理 -->
			<div class="support-count" v-if="seller.supports" @click="showDetail()">
				<span class="count">{{seller.supports.length}}个</span>
				<i>&gt;</i>
			</div>
		</div>
		<!--/ 头部主题部分 -->

		<!-- 头部广告部分 -->
		<div class="bulletin-wrapper" @click="showDetail()">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i>&gt;</i>
		</div>
		<!--/ 头部广告部分 -->

		<!-- 模糊背景图部分 -->
		<div class="background">
			<img :src="seller.avatar" alt="商家头像" width="100%" height="100%">
		</div>
		<!--/ 模糊背景图部分 -->

		<!-- detail 类似模态框部分 -->
		<transition name="fade">
			<div class="detail clearfix" v-show="DetailShow">
				<div class="detail-wrapper">
					<div class="detail-main">
						<!-- 名称 -->
						<div class="name">{{seller.name}}</div>
						<!-- 5课星 -->
						<div class="star-wrapper">
							<Star :score="seller.score"></Star>
						</div>
						<!-- 优惠信息 -->
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul class="supports" v-if="seller.supports">
							<li class="support-item" v-for="(val,index) in seller.supports">
								<span class="icon" :class="classMap[val.type]"></span>
								<span class="text">{{val.description}}</span>
							</li>
						</ul>
						<!-- 商家公告 -->
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<!-- bulletin 公告 -->
						<div class="bulletin">
							<p class="content">
								{{seller.bulletin}}
							</p>
						</div>
					</div>
				</div>
				<div class="detail-close" @click="hideDetail();">
					<i>×</i>
				</div>
			</div>
		</transition>
		
		<!--/ detail 类似模态框部分 -->
	</div>
</template>
<script>
import Star from '../star/star.vue'
export default{
	data(){
		return{
			// classMap 商家所有的优惠名称
			classMap:['decrease','discount','guarantee','invoic','special'],
			DetailShow:false
		}
	},
	props:{
		seller:{
			type:Object
		}
	},
	methods:{
		hideDetail (){
			this.DetailShow = false
		},

		showDetail (){
			this.DetailShow = true
		},
	},
	components:{
		Star
	}
}
</script>
<style scoped>
	#header{
		color:#fff;
		position:relative;
		background:rgba(7,17,27,0.4);
		overflow:hidden;
		height: 134px;
	}
	.avatar img{
		width: 64px;
    	height: 64px;
	}
	.content-wrapper{
		display:flex;
		position:relative;
		padding: 24px 0.12rem 18px 0.24rem;
	}
	.content-wrapper .content{
		margin-left: 16px;
	}
	.content-wrapper .content .title{
		margin: 2px 0 8px 0;
	}
	.content-wrapper .content .brand{
		display:inline-block;
		width: 30px;
	    height: 18px;
		background:url('brand@2x.png') center top no-repeat;
		background-size:cover;
		vertical-align: middle;
	}
	.content-wrapper .content .name{
		margin-left: 6px;
	    font-size: 16px;
	    line-height: 18px;
	    font-weight: bold;
	    vertical-align: middle;
	}
	.content-wrapper .content .description {
	    margin-bottom: 10px;
	    line-height: 12px;
	    font-size: 12px;
	}
	.content-wrapper .content .text{
		line-height: 12px;
    	font-size: 10px;
	}
	.content-wrapper .support-count {
	    position: absolute;
	    right: 0.12rem;
	    bottom: 0.34rem;
	    padding: 5px 8px;
	    height: 0.24rem;
	    line-height: 0.24rem;
	    border-radius: 14px;
	    background: rgba(0,0,0,0.2);
	    text-align: center;

	}
	.support-count .count{
		font-size:12px;
	} 
	.content-wrapper .content .supports .icon {
	    display: inline-block;
	    vertical-align: middle;
	    width: 12px;
	    height: 12px;
	    margin-right: 0.04rem;
	    background-size: 12px 12px;
	    background-repeat: no-repeat;
	}
	.decrease{
		background:url(decrease_1@2x.png);
	}
	.discount{
		background:url(discount_1@2x.png);
	}
	.guarantee{
		background: url(guarantee_1@2x.png);
	}
	.invoic{
		background: url(invoice_1@2x.png)
	}
	.special{
		background:url(special_1@2x.png);
	}
	.bulletin-wrapper {
	    position: relative;
	    height: 24px;
    	line-height: 24px;
	    padding: 0 22px 0 12px;
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    background: rgba(7,17,27,0.2);
	}
	.bulletin-wrapper .bulletin-title{
		display:inline-block;
		width:0.3rem;
		height:0.18rem;
		background:url(bulletin@2x.png) center top no-repeat;
		background-size:cover;
		
	}
	.bulletin-wrapper i{
		position: absolute;
	    font-size: 10px;
	    right: 12px;
	    top: 0.03rem;
	}
	.bulletin-wrapper .bulletin-text{
		font-size:10px;
	}
	.background{
		position:absolute;
		left:0;top:0;
		width:100%;height:100%;
		z-index:-1;
		filter:blur(10px);
	}
	.detail{
		position:fixed;
		z-index:100;
		left:0;top:0;
		width:100%;height:100%;
		background:rgba(7,17,27,0.8);
		overflow:auto;
	}
	.detail .detail-main{
		margin-top: 64px;
    	padding-bottom: 64px;
	}
	.detail .detail-wrapper {
	    width: 100%;
	    min-height: 99%;
	    display: inline-block;
	}
	.detail .detail-close {
	    position: relative;
	    width: 0.32rem;
	    height: 0.32rem;
	    margin: -0.64rem auto 0 auto;
	    clear: both;
	    
	}
	.detail-close i{
		font-size: 0.64rem;
	}
	.detail-main .name{
		line-height: 16px;
	    text-align: center;
	    font-size: 16px;
	    font-weight: 700;
	}
	.detail-main .star-wrapper{
		margin-top: 18px;
	    padding: 2px 0;
	    text-align: center;
	}
	.detail-main .title {
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    width: 80%;
	    margin: 28px auto 24px auto;
	}
	.detail-main .title .line {
	    -webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    position: relative;
	    top: -6px;
	    border-bottom: 1px solid rgba(255,255,255,0.2);
	}
	.detail-main .supports .support-item .icon {
	    display: inline-block;
	    width: 16px;
	    height: 16px;
	    vertical-align: top;
	    margin-right: 6px;
	    background-size: 16px 16px;
	    background-repeat: no-repeat;
	}
	.detail-main .supports .support-item .text {
	    line-height: 16px;
	    font-size: 12px;
	}
	.detail-main .title .text {
	    padding: 0 12px;
	    font-weight: 700;
	    font-size: 14px;
	}
	.detail-main .supports {
	    width: 80%;
	    margin: 0 auto;
	}
	.detail-main .supports .support-item {
	    padding: 0 12px;
	    margin-bottom: 12px;
	    font-size: 0;
	}
	.detail-main .bulletin {
	    width: 80%;
	    margin: 0 auto;
	}
	.detail-main .bulletin .content {
	    padding: 0 12px;
	    line-height: 24px;
	    font-size: 12px;
	}
	/*控制transition淡出动画*/
	.fade-enter-active,.fade-leave-active{
		-webkit-transition:opacity .6s;
		transition:opacity .6s;
	}
	.fade-enter,.fade-leave-to{
		opacity:0;
	}
</style>