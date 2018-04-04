<template>
	<div id="seller" ref="sellerWrapper">
		<div class="seller-content">
			<!-- 总体评价部分 -->
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<!-- 组件 -->
					<star class="star star-36" :score="seller.score"></star>
					<!-- 组件 -->

					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<!-- remark 评论 -->
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}元</span>
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}元</span>
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}元</span>
						</div>
					</li>
				</ul>
				<div class="favorite">
					<span class="icon-favorite iconfont icon-xin" @click="like" :class="{active:favorate}"></span>
					<span class="text">{{likeTog}}</span>
				</div>
			</div>
			<div class="split"></div>
			<!--/ 总体评价部分 -->
			
			<!-- 活动于公告 -->
			<div class="bulletin">
				<h1 class="title">活动与公告</h1>
				<div class="content-wrapper">
					<p class="content">
						{{seller.bulletin}}
					</p>
				</div>
				<ul class="supports">
					<li class="support-item" v-for="(item,index) in seller.supports">
						<span class="icon" :class="classMap[item.type]"></span>
						<span class="text">
							{{item.description}}
						</span>
					</li>
				</ul>
			</div>
			<div class="split"></div>
			<!-- /活动于公告 -->

			<!-- 商家实景 -->
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="(val,index) in seller.pics">
							<img :src="val" width=120 height="90" alt="商家实景图">
						</li>
					</ul>
				</div>
			</div>
			<div class="split"></div>
			<!--/ 商家实景 -->

			<!-- 商家信息部分 -->
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="(val,index) in seller.infos">{{val}}</li>
				</ul>
			</div>
			<!-- /商家信息部分 -->
		</div>
	</div>
</template>
<script>
import Split from '../split/split.vue'
import BScroll from 'better-scroll'
import Star from '../star/star.vue'
export default{
	props:{
		seller:{
			type:Object
		}
	},
	data(){
		return {
			bigScroll:null,
			smallScroll:null,
			classMap:['decrease','discount','guarantee','invoic','special'],
			favorate:false
		}
	},
	watch:{
		'seller' (){
			this._initScroll();
			this._initPcs();
			this.testLocalStorage();
		}
	},
	mounted() {
		this._initScroll();
		this._initPcs();
		this.testLocalStorage();
	},
	computed:{
		likeTog (){
			// if( this.favorate ){
			// 	return '已收藏'
			// }else{
			// 	return '收藏'
			// }
			// 这样的if语句明显可以用三元表达式，真sb
			return this.favorate?'已收藏':'收藏'
		}
	},
	methods:{
		_initScroll (){ //初始整个页面的化滚轮
			this.$nextTick(()=>{ //用nextTick的目的是让DOM元素加载完毕后再去初始化滚轮
				this.bigScroll = new BScroll(this.$refs.sellerWrapper,{
					click:true
				})
			})
		},

		// 初始化图片部分的滚轮
		_initPcs (){
			if( this.seller.pics ){
				let picWidth = 120; 
				let margin = 6;
				let width = (picWidth + margin)*this.seller.pics.length - margin
				//console.log(width)
				this.$refs.picList.style.width = width + 'px'
				this.$nextTick(()=>{
					if( !this.smallScroll ){
						this.smallScroll = new BScroll(this.$refs.picWrapper,{
							click:true,
							scrollX:true,  //设置横向滚动
							eventPassThrough:'verticle'//设置横向滚动的时候不要去影响竖向滚动
						})
					}else{
						this.smallScroll.refresh();
					}
					
				})
			}
		},

		//
		like (){ //将设置收藏的收藏的信息存入localStorage中，如果不收藏那就删除该条信息
			this.favorate = !this.favorate
			if (this.favorate){
				localStorage.setItem(this.seller.ID,true)
			}else{
				localStorage.removeItem(this.seller.ID)
			}
		},

		testLocalStorage (){  //检测localStorage中是否含有收藏该条商店的信息
			//console.log(localStorage.getItem(this.seller.ID))
			if( localStorage.getItem(this.seller.ID) ){
				this.favorate = localStorage.getItem(this.seller.ID)
			}
		}
	},
	components:{
		Split,
		Star
	}
}
</script>
<style scoped>
	#seller {
	    position: absolute;
	    top: 174px;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    overflow: hidden;
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
	#seller .overview {
	    position: relative;
	    padding: 18px;
	}
	#seller .overview .title {
	    margin-bottom: 8px;
	    line-height: 14px;
	    color: #07111b;
	    font-size: 14px;
	}
	#seller .overview .desc {
	    padding-bottom: 18px;
	    position: relative;
	    font-size: 0;
	    border-bottom: 0.01rem solid rgba(7,17,27,0.1);
	}
	#seller .overview .desc .star {
	    display: inline-block;
	    margin-right: 8px;
	    vertical-align: top;
	}
	.star.star-36 .star-item {
	    width: 15px;
	    height: 15px;
	    margin-right: 6px;
	    background-size: 15px 15px;
	}
	#seller .overview .desc .text {
	    display: inline-block;
	    margin-right: 12px;
	    line-height: 18px;
	    vertical-align: top;
	    font-size: 10px;
	    color: #4d555d;
	}
	#seller .overview .remark {
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    padding-top: 18px;
	}
	#seller .overview .remark .block {
	    -webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    text-align: center;
	    border-right: 1px solid rgba(7,17,27,0.1);
	}
	#seller .overview .remark .block:last-child{
		border-right:0;
	}
	#seller .overview .remark .block h2 {
	    margin-bottom: 4px;
	    line-height: 10px;
	    font-size: 10px;
	    color: #93999f;
	}
	#seller .overview .remark .block .content {
	    line-height: 24px;
	    font-size: 10px;
	    color: #3e3f41;
	}
	#seller .overview .remark .block .content .stress {
	    font-size: 21px;
	}
	#seller .overview .favorite {
	    position: absolute;
	    width: 50px;
	    right: 15px;
	    top: 18px;
	    text-align: center;
	}
	#seller .overview .favorite .icon-favorite {
	    display: block;
	    margin-bottom: 4px;
	    line-height: 24px;
	    font-size: 24px;
	    color: #d4d6d9;
	}
	#seller .overview .favorite .icon-favorite.active {
	    color: #f01414;
	}
	#seller .overview .favorite .text {
	    line-height: 10px;
	    font-size: 10px;
	    color: #4d555d;
	}
	#seller .bulletin {
	    padding: 18px 18px 0 18px;
	}
	#seller .bulletin .title {
	    margin-bottom: 8px;
	    line-height: 14px;
	    color: #07111b;
	    font-size: 14px;
	}
	#seller .bulletin .content-wrapper {
	    padding: 0 12px 16px 12px;
	    position: relative;
	    border-bottom: 0.01rem solid rgba(7,17,27,0.1);
	}
	#seller .bulletin .content-wrapper .content {
	    line-height: 24px;
	    font-size: 12px;
	    color: #f01414;
	}
	#seller .bulletin .supports .support-item {
	    padding: 16px 12px;
	    position: relative;
	    font-size: 0;
	    border-bottom: 0.01rem solid rgba(7,17,27,0.1);
	}
	#seller .bulletin .supports .support-item:last-child{
		border-bottom:none;
	}
	#seller .bulletin .supports .icon {
	    display: inline-block;
	    width: 16px;
	    height: 16px;
	    vertical-align: top;
	    margin-right: 6px;
	    background-size: 16px 16px;
	    background-repeat: no-repeat;
	}
	#seller .bulletin .supports .text {
	    line-height: 16px;
	    font-size: 12px;
	    color: #07111b;
	}
	#seller .pics {
	    padding: 18px;
	}
	#seller .pics .title {
	    margin-bottom: 12px;
	    line-height: 14px;
	    color: #07111b;
	    font-size: 14px;
	}
	#seller .pics .pic-wrapper {
	    width: 100%;
	    overflow: hidden;
	    white-space: nowrap;
	}
	#seller .pics .pic-wrapper .pic-list {
	    font-size: 0;
	}
	#seller .pics .pic-wrapper .pic-list .pic-item {
	    display: inline-block;
	    margin-right: 6px;
	    width: 120px;
	    height: 90px;
	}
	#seller .pics .pic-wrapper .pic-list .pic-item:last-child{
		margin-right:0;
	}
	#seller .info {
	    padding: 18px 18px 0 18px;
	    color: #07111b;
	}
	#seller .info .title {
	    padding-bottom: 12px;
	    line-height: 14px;
	    position: relative;
	    font-size: 14px;
	    border-bottom: 0.01rem solid rgba(7,17,27,0.1);
	}
	#seller .info .info-item {
	    padding: 16px 12px;
	    line-height: 16px;
	    position: relative;
	    font-size: 12px;
	}
	#seller .info .info-item:after {
	    display: block;
	    position: absolute;
	    left: 0;
	    bottom: 0;
	    width: 100%;
	    border-top: 1px solid rgba(7,17,27,0.1);
	    content: ' ';
	}
</style>