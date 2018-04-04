<template>
	<transition name="xl">
		<div id="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<!-- 商品头部图片以及后退 -->
				<div class="image-header">
					<img :src="food.image" alt="商品图片">
					<div class="back">
						<i class="icon-arrow_lift iconfont icon-fanhui" @click="back"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月{{food.sellCount}}售份</span>
				    <span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}元</span>
				    <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}元</span>
					</div>

					<!-- 加入购物车的组件 -->	
					<div class="cartcontrol-wrapper" v-show="food.count>0">
						<cartcontrol :food="food"></cartcontrol>
					</div>
					<transition name="xv">
						<div class="buy" @click="addFirst" v-show="!food.count || food.count==0">加入购物车</div>
					</transition>
				</div>
				<!-- split -->
				<split></split>

				<!-- 商品信息 -->
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<!--/ 商品信息 -->

				<!-- split -->
				<split v-show="food.info"></split>
				<!-- 商品评价部分 -->
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<!-- 评价类型选择组件 -->
					<!-- 需要传的数据 -->
					<!-- 	1.用户的评价 ratings
								2.是否要文本评价 onlyContent
								3.评价类型 selectType
								4.desc -->
					<ratingselect :desc="desc" :only-content="onlyContent"
					:select-type="selectType"
					:ratings="food.ratings" @ratingSelect1="ratingSelect" @contentToggle1="contentToggle" ref="ratingSelect"></ratingselect>
					<!--/ 评价类型选择组件 -->
					
					<!-- 评价下部分 -->
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li class="rating-item" v-for="(val,index) in food.ratings" v-show="needShow(val.rateType,val.text)">
								<div class="user">
									<span class="name">{{val.username}}</span>
									<img :src="val.avatar" width=12 height=12 alt="用户头像" class="avatar">
								</div>
								<div class="time">
									{{val.rateTime | formatDate1}}
								</div>
								<p class="text">
									<span class="iconfont"
									:class="{'icon-thumb_up icon-zan':val.rateType==0,'icon-thumb_down icon-thumbdown':val.rateType==1}"></span>
									{{val.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
					</div>
					<!--/ 评价下部分 -->
				</div>
			</div>
		</div>
	</transition>
	
</template>
<script>
import Vue from 'vue'
import Split from '../split/split.vue'
import Ratingselect from '../ratingselect/ratingselect.vue'
import BScroll from 'better-scroll'
import Cartcontrol from '../cartcontrol/cartcontrol.vue'
//用export导出的  //解构赋值:可以直接调用该函数
import {formatDate} from '../../assets/js/date.js'
const POSITIVE = 0;//好评
const NAGATIVE = 1;//差评
const ALL = 2;//所有评价
	export default{
		props:{
				food:{
					type:Object
				}
		},
		data (){
			return{
				showFlag :false, //控制food商品详情页的显示隐藏
				scroll : null,//better-scroll组件实例
				selectType:ALL,//选择的类型
				onlyContent:true,//是否显示文本内容的评价
				desc:{ //三种类型
					all:'全部',
					positive:'推荐',
					nagative:'吐槽'
				}
			}
		},
		methods:{
			
			show (){
				this.showFlag = true;//展示food组件
				this.selectType = ALL;
				this.onlyContent = true;
				this.$refs.ratingSelect.show();
				let el = this.$refs.food
				// 确保DOM渲染完毕以后开始初始化better-scroll
				this.$nextTick(()=>{
					// 判断滚轮是否已经初始化过了
					if(!this.scroll){
						this.scroll = new BScroll(el,{
							click:true
						})
					}else{
						// 重新取内部DOM的高度
						this.scroll.refresh();
					}
				})
				// console.log(typeof this.selectType)
				
			},

			// 隐藏food组件或者返回
			back (){
				this.showFlag = false;
			},

			//商品展示页，首次将商品添加到购物车
			addFirst (){
				Vue.set(this.food,'count',1)
				// console.log(this.food.count)
			},

			// 自组建向父组件传递的修改后的selectType
			ratingSelect (num){
				this.selectType = num
			},

			// 同过评价类型以及是否显示文本来控制品论的显示隐藏
			needShow (type,text){
					if( this.onlyContent && !text ){ //如果用户选择了只显示有内容并且内容为空不要显示该评论
						// console.log(1)
						return false;
						
					}
					if( this.selectType==ALL ){ //如果用户选择ALL显示全部评价
						// console.log(2)
						return true;
						
					}else{
						// console.log(3)
						return type==this.selectType;//根据用户选择的评论类型selectType控制应该显示的留言;
						
					}
			},

			// 切换是否显示文本
			contentToggle(type){
				this.onlyContent = type
			}
		},
		filters:{
			formatDate1 (time){
				// 为什么这里的new Date 不放在分装的函数里，放在这里可以不用多次new
				let date = new Date(time)
				return formatDate(date)
			}
		},
		components:{
			Split,
			Ratingselect,
			Cartcontrol
		}
	}
</script>
<style>
	.xl-enter-active,.xl-leave-active{
		-webkit-transition:all .6s ease;
		transition:all .6s ease;
	}
	.xl-enter{
		transform: translate3d(-100%,0,0);
		opacity: 0;
	}
	.xl-leave-to{
		transform: translate3d(100%,0,0);
		opacity: 0
	}
	.xv-enter-active,.xv-leave-active{
		-webkit-transition:all .6s ease;
		transition: all .6s ease
	}
	.xv-enter,.xv-leave-to{
		opacity: 0
	}
	#food {
	    position: fixed;
	    left: 0;
	    top: 0;
	    bottom: 48px;
	    z-index: 30;
	    width: 100%;
	    background: #fff;
	}
	.food-enter-active,.food-leave-active{
		-webkit-transition: all 0.3s linear;
	    transition: all 0.3s linear;
	}
	.food-enter,.food-leave-to{
	    -webkit-transform:translate3d(100%, 0, 0);
	    transform:translate3d(100%, 0, 0);
	}
	.food-leave,.food-enter-to{
		-webkit-transform:translate3d(0, 0, 0);
	    transform:translate3d(0, 0, 0);
	}
	.fade-enter-active,.fade-leave-active{
		-webkit-transition: all 0.3s linear;
	    transition: all 0.3s linear;
	}
	.fade-enter,.fade-leave-to{
	    opacity:0;
	}
	.fade-leave,.fade-enter-to{
		opacity:1;
	}
	#food .image-header {
	    position: relative;
	    width: 100%;
	    height: 0;
	    padding-top: 100%;
	}
	#food .image-header img {
	    position: absolute;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	}
	#food .image-header .back {
	    position: absolute;
	    top: 10px;
	    left: 0;
	}
	#food .image-header .back .icon-arrow_lift {
	    display: block;
	    padding: 10px;
	    font-size: 20px;
	    color: #fff;
	}
	#food .content {
	    position: relative;
	    padding: 18px;
	}
	#food .content .title {
	    line-height: 14px;
	    margin-bottom: 8px;
	    font-size: 14px;
	    font-weight: 700;
	    color: #07111b;
	}
	#food .content .detail {
	    margin-bottom: 18px;
	    line-height: 10px;
	    height: 10px;
	    font-size: 0;
	}
	#food .content .detail .sell-count, #food .content .detail .rating {
		display:inline-block;
	    font-size: 10px;
	    color: #93999f;
	}
	#food .content .detail .sell-count {
	    margin-right: 12px;
	}
	#food .rating {
	    padding-top: 18px;
	}
	#food .content .price {
	    font-weight: 700;
	    line-height: 24px;
	}
	#food .content .price .now {
	    margin-right: 8px;
	    font-size: 14px;
	    color: #f01414;
	}
	#food .content .price .old {
	    text-decoration: line-through;
	    font-size: 10px;
	    color: #93999f;
	}
	#food .content .buy {
	    position: absolute;
	    right: 18px;
	    bottom: 18px;
	    z-index: 10;
	    height: 24px;
	    line-height: 24px;
	    padding: 0 12px;
	    box-sizing: border-box;
	    border-radius: 12px;
	    font-size: 10px;
	    color: #fff;
	    background: #00a0dc;
	}	
	#food .info {
	    padding: 18px;
	}
	#food .info .title {
	    line-height: 14px;
	    margin-bottom: 6px;
	    font-size: 14px;
	    color: #07111b;
	}
	#food .info .text {
	    line-height: 24px;
	    padding: 0 8px;
	    font-size: 12px;
	    color: #4d555d;
	}
	#food .rating {
	    padding-top: 18px;
	}
	#food .rating .title {
	    line-height: 14px;
	    margin-left: 18px;
	    font-size: 14px;
	    color: #07111b;
	}
	
	
	#food .content .cartcontrol-wrapper {
	    position: absolute;
	    right: 18px;
	    bottom: 18px;
	}

	#food .rating .rating-wrapper {
	    padding: 0 18px;
	}
	#food .rating .rating-wrapper .no-rating {
	    padding: 16px 0;
	    font-size: 12px;
	    color: #93999f;
	}
	#food .rating .rating-wrapper .rating-item {
	    position: relative;
	    padding: 16px 0;
	    position: relative;
	    border-bottom:0.01rem solid rgba(7,17,27,0.1);
	}
	#food .rating .rating-wrapper .rating-item .user {
	    position: absolute;
	    right: 0;
	    top: 16px;
	    line-height: 12px;
	    font-size: 0;
	}
	#food .rating .rating-wrapper .rating-item .user .name {
	    display: inline-block;
	    margin-right: 6px;
	    vertical-align: top;
	    font-size: 10px;
	    color: #93999f;
	}
	#food .rating .rating-wrapper .rating-item .user .avatar {
	    border-radius: 50%;
	}
	#food .rating .rating-wrapper .rating-item .time {
	    margin-bottom: 6px;
	    line-height: 12px;
	    font-size: 10px;
	    color: #93999f;
	}
	#food .rating .rating-wrapper .rating-item .text {
	    line-height: 16px;
	    font-size: 12px;
	    color: #07111b;
	}
	#food .rating .rating-wrapper .rating-item .text .icon-thumb_up, #food .rating .rating-wrapper .rating-item .text .icon-thumb_down {
	    margin-right: 4px;
	    line-height: 16px;
	    font-size: 12px;
	}
	#food .rating .rating-wrapper .rating-item .text .icon-thumb_up {
	    color: #00a0dc;
	}
	.food .rating .rating-wrapper .rating-item .text .icon-thumb_down {
	    color: #93999f;
	}	
</style>