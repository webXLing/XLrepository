<template>
	<div id="ratings" ref="ratings">
		<div class="rating-content">
			<!-- 综合评分 -->
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%
					</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<!-- 星星组件 -->
						<star :score="seller.serviceScore" class="star star-36"></star>
						<!-- /星星组件 -->
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<!-- 星星组件 -->
						<star :score="seller.foodScore" class="star star-36"></star>
						<!-- /星星组件 -->
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<!--/ 综合评分 -->

			<!-- 分割线split -->
			<split></split>
			<!--/ 分割线split -->

			<!-- 类型选择组件 -->
			<!--desc 用来描述
			onlyContent 监控文本类型
			selectType 监控选择类型
			ratings 对应的评论长度 -->
			<ratingselect @ratingSelect1="ratingSelect" @contentToggle1="contentToggle" :only-content="onlyContent" :select-type="selectType" :ratings="ratings"></ratingselect>
			<!--/ 类型选择组件 -->

			<!-- 评价内容部分 -->
			<div class="rating-wrapper">
				<ul>
					<li class="rating-item" v-for="(val,index) in ratings" v-show="needShow(val.text,val.rateType)">
						<div class="avatar">
							<img :src="val.avatar" width=28 height=28 alt="用户头像">
						</div>
						<div class="content">
							<h1 class="name">{{val.username}}</h1>
							<div class="star-wrapper">
								<!-- 星星组件 -->
								<star :score="val.score" class="star star-24"></star>
								<!--/ 星星组件 -->
								<span class="delivery" v-show="val.deliveryTime">{{val.deliveryTime}}分钟送达</span>
							</div>
							<p class="text" v-show="val.text">
								{{val.text}}
							</p>
							<div class="recommend">
								<span class="iconfont icon-zan icon-thumb_up" v-show="val.recommend.length"></span>
								<span class="item" v-for="(v) in val.recommend">{{v}}</span>
							</div>
							<div class="time">{{val.rateTime | formatDate1}}</div>
						</div>
					</li>
				</ul>
			</div>
			<!-- /评价内容部分 -->

			
		</div>
	</div>
</template>
<script>
	import Star from '../star/star.vue'
	import BScroll from 'better-scroll'
	import Ratingselect from '../ratingselect/ratingselect.vue'
	import Split from '../split/split.vue'
	import {formatDate} from '../../assets/js/date.js'

const POSITIVE = 0;//好评
const NAGATIVE = 1;//差评
const ALL = 2;//所有评价

	export default{
		data(){
			return{
				ratings:[],
				scroll:null,
				onlyContent:true,
				selectType:ALL
			}
		},
		props:{
			seller:{
				type:Object
			}
		},
		mounted (){
			this.$http.get('https://www.easy-mock.com/mock/5aa0e486d7ebd14ee7554b47/example/rating').then((res)=>{
				this.ratings = res.data
				// console.log(res.data)
				this.$nextTick(()=>{
					this.scroll = new BScroll(this.$refs.ratings,{
						click:true
					})
				})
			})
		},
		methods:{
			// 这个是用来接子组件改变评论类型的数据的方法
			ratingSelect (data){
				//console.log(data)
				this.selectType = data
			},

			// 这个是用来接子组件改变是否显示文本内容的数据的方法
			contentToggle (type){
				//console.log(type)
				this.onlyContent = type
			},

			needShow (text,type){
				//console.log(1)
				//如果用户要求显示有文本内容的，那无文本内容的不显示
				if(this.onlyContent && !text){  
					return false
				}
				if( this.selectType==ALL ){
					return true
				}else{
					return this.selectType == type
				}
			}
		},
		filters:{
			formatDate1 (data){
				let a = new Date(data);
				return formatDate(a);
			}
		},
		components:{
			Star,
			Ratingselect,
			Split
		}
	}
</script>
<style>
	#ratings {
	    position: absolute;
	    top: 174px;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    overflow: hidden;
	}
	#ratings .overview {
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    padding: 18px 0;
	}
	#ratings .overview .overview-left {
	    -webkit-box-flex: 0;
	    -ms-flex: 0 0 137px;
	    flex: 0 0 137px;
	    padding: 6px 0;
	    width: 137px;
	    border-right: 1px solid rgba(7,17,27,0.1);
	    text-align: center;
	}
	@media screen and (max-width:320px){
		#ratings .overview .overview-left {
		    -ms-flex: 0 0 80px;
		    flex: 0 0 80px;
		    width:80px;
		}
	}
	#ratings .overview .overview-right {
	    -webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	    padding: 6px 0 6px 24px;
	}
	#ratings .overview .overview-left .score {
	    margin-bottom: 6px;
	    line-height: 28px;
	    font-size: 24px;
	    color: #f90;
	}
	#ratings .overview .overview-left .title {
	    margin-bottom: 8px;
	    line-height: 12px;
	    font-size: 12px;
	    color: #07111b;
	}
	#ratings .overview .overview-left .rank {
	    line-height: 14px;
	    font-size: 10px;
	    color: #93999f;
	}
	#ratings .overview .overview-right .score-wrapper {
	    margin-bottom: 8px;
	    font-size: 0;
	}
	#ratings .overview .overview-right .score-wrapper .title {
	    display: inline-block;
	    line-height: 18px;
	    vertical-align: top;
	    font-size: 12px;
	    color: #07111b;
	}
	#ratings .overview .overview-right .score-wrapper .score {
	    display: inline-block;
	    line-height: 18px;
	    vertical-align: top;
	    font-size: 12px;
	    color: #f90;
	}
	.star {
	    font-size:0;
	}
	#ratings .overview .overview-right .score-wrapper .star {
	    display: inline-block;
	    margin: 0 12px;
	    vertical-align: top;
	}
	.star-36 .star-item {
	    width: 15px;
	    height: 15px;
	    margin-right: 6px;
	    background-size: 15px 15px;
	}
	.star.star-24 .star-item {
	    width: 10px;
	    height: 10px;
	    margin-right: 3px;
	    background-size: 10px 10px;
	}
	#ratings .overview .overview-right .delivery-wrapper {
	    font-size: 0;
	}
	#ratings .overview .overview-right .delivery-wrapper .title {
	    line-height: 18px;
	    font-size: 12px;
	    color: #07111b;
	}
	#ratings .overview .overview-right .delivery-wrapper .delivery {
	    margin-left: 12px;
	    font-size: 12px;
	    color: #93999f;
	}
	#ratings .rating-wrapper {
	    padding: 0 18px;
	}
	#ratings .rating-wrapper .rating-item {
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    padding: 18px 0;
	    position: relative;
	    border-bottom: 0.01rem solid rgba(7,17,27,0.1);
	}
	#ratings .rating-wrapper .rating-item .avatar {
	    -webkit-box-flex: 0;
	    -ms-flex: 0 0 28px;
	    flex: 0 0 28px;
	    width: 28px;
	    margin-right: 12px;
	}
	#ratings .rating-wrapper .rating-item .avatar img {
	    border-radius: 50%;
	}
	#ratings .rating-wrapper .rating-item .content {
	    position: relative;
	    -webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	}
	#ratings .rating-wrapper .rating-item .content .name {
	    margin-bottom: 4px;
	    line-height: 12px;
	    font-size: 10px;
	    color: #07111b;
	}
	#ratings .rating-wrapper .rating-item .content .star-wrapper {
	    margin-bottom: 6px;
	    font-size: 0;
	}
	#ratings .rating-wrapper .rating-item .content .star-wrapper .star {
	    display: inline-block;
	    margin-right: 6px;
	    vertical-align: top;
	}
	#ratings .rating-wrapper .rating-item .content .star-wrapper .delivery {
	    display: inline-block;
	    vertical-align: top;
	    line-height: 12px;
	    font-size: 10px;
	    color: #93999f;
	}
	#ratings .rating-wrapper .rating-item .content .text {
	    margin-bottom: 8px;
	    line-height: 18px;
	    color: #07111b;
	    font-size: 12px;
	}
	#ratings .rating-wrapper .rating-item .content .recommend {
	    line-height: 16px;
	    font-size: 0;
	}
	#ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_up, #ratings .rating-wrapper .rating-item .content .recommend .item {
	    display: inline-block;
	    margin: 0 8px 4px 0;
	    font-size: 9px;
	}
	#ratings .rating-wrapper .rating-item .content .recommend .icon-thumb_up {
	    color: #00a0dc;
	}
	#ratings .rating-wrapper .rating-item .content .recommend .item {
	    padding: 0 6px;
	    border: 1px solid rgba(7,17,27,0.1);
	    border-radius: 1px;
	    color: #93999f;
	    background: #fff;
	}
	#ratings .rating-wrapper .rating-item .content .time {
	    position: absolute;
	    top: 0;
	    right: 0;
	    line-height: 12px;
	    font-size: 10px;
	    color: #93999f;
	}	
</style>