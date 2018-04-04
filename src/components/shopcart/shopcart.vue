<template>
	<div id="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{highlight:totalCount>0}">
						<i class="iconfont icon-gouwuchekong" :class="{highlight:totalCount>0}"></i>
					</div>
					<div class="num" v-show="totalCount">{{totalCount}}</div>
				</div>
				<div class="price highlight">
					￥{{totalPrice}}
				</div>
				<div class="desc">
					另需配送费{{deliveryPrice}}元
				</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">
					{{payDesc}}
				</div>
			</div>
		</div>
		<transition name="fold">
			<div class="shopcart-list" v-show="fold">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li class="food" v-for="(val,index) in selectFoods">
							<span class="name">{{val.name}}</span>
							<div class="price">
								<span>￥{{val.count*val.price}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="val"></cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>

		<!-- 遮罩部分 -->
		<transition name="fade">
			<div class="list-mask" v-show="fold" @click="hideList"></div>
		</transition>
		
		<!--、 遮罩部分 -->
	</div>
</template>
<script>
import Cartcontrol from '../cartcontrol/cartcontrol.vue'
import BScroll from 'better-scroll'
export default{
	props:{
		selectFoods:{
			type:Array,
			default (){
				return []
			}
		},
		deliveryPrice:{
			type:Number,
			default:0
		},
		minPrice:{
			type:Number,
			default:0
		},
	},
	data (){
		return{
			fold:false,
			scroll:false
		}
	},
	methods:{

		// 打开你买什么神东西的列表
		toggleList (){
			if( this.totalCount == 0){
				return
			}
			this.fold = !this.fold
			if( this.fold ){

			}
			this.$nextTick(()=>{
				// 如果滚轮初始化过了，那就不初始化了避免印影响性能，前提是在DOM元素加载完后
				if( !this.scroll ){
					this.scroll = new BScroll(this.$refs.listContent,{
						click:true//使它可以点击
					})
				}else{
					//一旦你内部元素增多
					this.scroll.refresh();//重新初始化高度
				}
			})
		},

		//隐藏购物车的列表
		hideList (){
			this.fold = false;
		},

		empty (){
			this.selectFoods.forEach((item)=>{
				item.count = 0;
				this.fold = false
			})
		}
	},
	computed:{
		//计算选择的商品总价
		totalPrice (){
			let total = 0;
			this.selectFoods.forEach((val)=>{
				total +=val.count*val.price
			})
			return total
		},

		//计算选择了多少个食品
		totalCount (){
			let total = 0;
			this.selectFoods.forEach((val)=>{
				total +=val.count
			})
			if( !total ){
				this.fold = false
			}
			return total
		},

		//描述运送费
		payDesc (){
			if( this.totalPrice == 0){
				return `还差￥${this.minPrice}元起送`
			}else if( this.totalPrice < this.minPrice ){
				return `还差￥${this.minPrice-this.totalPrice}元起送`
			}else{
				return '去结算'
			}
		},

		//去结算的activeclass
		payClass (){
			if(this.totalPrice < this.minPrice){
				return 'not-enough'
			}else{
				return 'enough'
			}
		}
	},
	components:{
		Cartcontrol
	}
	// mounted (){
	// 	console.log(this.selectFoods,this.deliveryPrice)
	// }
}	
</script>
<style>

	#shopcart{
	    position: fixed;
	    left: 0;
	    bottom: 0;
	    z-index: 50;
	    width: 100%;
	    height: 48px;
	}
	#shopcart .content {
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    background: #141d27;
	    font-size: 0;
	    color: rgba(255,255,255,0.4);
	}
	#shopcart .content .content-left {
	    -webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	}
	#shopcart .content .content-right {
	    -webkit-box-flex: 0;
	    -ms-flex: 0 0 105px;
	    flex: 0 0 105px;
	    width: 105px;
	}
	#shopcart .content .content-left .logo-wrapper {
	    display: inline-block;
	    vertical-align: top;
	    position: relative;
	    top: -10px;
	    margin: 0 12px;
	    padding: 6px;
	    width: 56px;
	    height: 56px;
	    box-sizing: border-box;
	    border-radius: 50%;
	    background: #141d27;
	}
	#shopcart .content .content-left .logo-wrapper .logo {
	    width: 100%;
	    height: 100%;
	    border-radius: 50%;
	    text-align: center;
	    background: #2b343c;
	}
	#shopcart .content .content-left .logo-wrapper .logo .icon-gouwuchekong {
	    line-height: 44px;
	    font-size: 24px;
	    color: #80858a;
	}
	#shopcart .content .content-left .logo-wrapper .logo.highlight {
	    background: #00a0dc;
	}
	#shopcart .content .content-left .logo-wrapper .logo .icon-gouwuchekong.highlight {
	    color: #fff;
	}
	#shopcart .content .content-left .logo-wrapper .num {
	    position: absolute;
	    top: 0;
	    right: 0;
	    width: 24px;
	    height: 16px;
	    line-height: 16px;
	    text-align: center;
	    border-radius: 16px;
	    font-size: 9px;
	    font-weight: 700;
	    color: #fff;
	    background: #f01414;
	    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
	}
	#shopcart .content .content-left .price {
	    display: inline-block;
	    vertical-align: top;
	    margin-top: 12px;
	    line-height: 24px;
	    padding-right: 12px;
	    box-sizing: border-box;
	    border-right: 1px solid rgba(255,255,255,0.1);
	    font-size: 16px;
	    font-weight: 700;
	}
	#shopcart .content .content-left .price.highlight {
	    color: #fff;
	}
	#shopcart .content .content-left .desc {
	    display: inline-block;
	    vertical-align: top;
	    margin: 12px 0 0 12px;
	    line-height: 24px;
	    font-size: 10px;
	}

	#shopcart .content .content-right .pay {
	    height: 48px;
	    line-height: 48px;
	    text-align: center;
	    font-size: 12px;
	    font-weight: 700;
	}
	#shopcart .content .content-right .pay.not-enough {
	    background: #2b333b;
	}
	#shopcart .content .content-right .pay.enough {
	    background: #00b43c;
	    color: #fff;
	}
	.shopcart-list {
	    position: absolute;
	    left: 0;
	    top: 0;    
	    z-index: -1;
	    width: 100%;
	    -webkit-transform:translate3d(0,-100%,0);
	    transform:translate3d(0,-100%,0);
	}
	#shopcart .shopcart-list .list-header {
	    height: 40px;
	    line-height: 40px;
	    padding: 0 18px;
	    background: #f3f5f7;
	    border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	#shopcart .shopcart-list .list-header .title {
	    float: left;
	    font-size: 14px;
	    color: #07111b;
	}
	#shopcart .shopcart-list .list-header .empty {
	    float: right;
	    font-size: 12px;
	    color: #00a0dc;
	}
	.fold-enter-active,.fold-leave-active {
	  -webkit-transition: all .5s ease;
	  transition: all .5s ease;
	}
	.fold-enter, .fold-leave-to{
	  -webkit-transform:translate3d(0,0,0);
	  transform:translate3d(0,0,0);
	}	
	#shopcart .shopcart-list .list-content {
	    padding: 0 18px;
	    max-height: 217px;
	    overflow: hidden;
	    background: #fff;
	}
	#shopcart .shopcart-list .list-content .food {
	    position: relative;
	    padding: 12px 0;
	    box-sizing: border-box;
	    position: relative;
	}
	.food {
	    position: fixed;
	    left: 0;
	    top: 0;
	    bottom: 48px;
	    z-index: 30;
	    width: 100%;
	    background: #fff;
	}
	#shopcart .shopcart-list .list-content .food .name {
	    line-height: 24px;
	    font-size: 14px;
	    color: #07111b;
	}
	#shopcart .shopcart-list .list-content .food .price {
	    position: absolute;
	    right: 90px;
	    bottom: 12px;
	    line-height: 24px;
	    font-size: 14px;
	    font-weight: 700;
	    color: #f01414;
	}
	#shopcart .shopcart-list .list-content .food .cartcontrol-wrapper {
	    position: absolute;
	    right: 0;
	    bottom: 12px;
	}
	.list-mask {
	    position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    z-index: -2;
	    -webkit-filter: blur(10px);
	    filter: blur(10px);
	    background: rgba(7,17,27,0.6);
	}
	.fade-enter-active,.fade-leave-active {
	  -webkit-transition: all .5s ease;
	  transition: all .5s ease;
	}
	.fade-enter, .fade-leave-to{
	  opacity: 0;
	}	
</style>