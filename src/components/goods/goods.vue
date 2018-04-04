<template>
	<div id="goods">
		<!-- 侧边栏 -->
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li class="menu-item" :class="{'current':index==currentIndex}" v-for="(val,index) in goods" @click="seletMenu(index)">
					<span class="text">
						<span class="icon" v-show="val.type > 0" :class="classMap[val.type]"></span>{{val.name}}
				</span>
				</li>
			</ul>
		</div>
		<!--/ 侧边栏 -->

		<!-- 食物主体部分 -->
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li class="food-list food-list-hook" v-for="(val,index) in goods">
					<h1 class="title">{{val.name}}</h1>
					<ul>
						<li class="food-item" v-for="(item,itemIndex) in val.foods" @click="selectFood(item,$event)">
							<div class="icon">
								<img :src="item.icon" alt="美食" width=57 height=57>
							</div>
							<div class="content">
								<h2 class="name">{{item.name}}</h2>
								<p class="desc">{{item.description}}</p>
								<div class="extra">
									<span class="count">月售{{item.sellCount}}分</span>
									<span>好评率{{item.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{item.price}}</span>
									<span class="old" v-show="item.oldPrice">￥{{item.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="item"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!--/ 食物主体部分 -->

		<!-- 购物车部分 -->
		<!-- 购物车需要的数据：
		seller里的数据
			minPrice最低起送费 
			deliveryPrice另需要配送费
		goods里的数据
			通过商品是否含有count这个属性去判断
			你选择了什么商品 -->
		<shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
		<!--/ 购物车部分 -->

		<!-- 商品详情页 -->
		<food ref="food" :food="selectedFood"></food>
		<!--/ 商品详情页 -->

	</div>
</template>
<script>
import BScroll from 'better-scroll'
import Cartcontrol from '../cartcontrol/cartcontrol.vue'
import Shopcart from '../shopcart/shopcart.vue'
import Food from '../food/food.vue'
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data (){
			return{
				goods:[],
				classMap:['decrease','discount','guarantee','invoic','special'],
				scrollY:0,
				menuScroll:null,//菜单滚轮实例
				foodsScroll:null,//foods滚轮实例
				listHeight:[],//存放foods中每个大块的高度
				selectedFood:{}//展开商品详情页的对应的商品data
			}
		},
		mounted(){
			// 获取goods的数据
			this.$http.get('https://www.easy-mock.com/mock/5aa0e486d7ebd14ee7554b47/example/goods').then((res)=>{

				this.goods = res.data
				// nextTick 一定要放在then里面，不然会出现dom没加载完js就执行了
				this.$nextTick(()=>{
					// 当DOM渲染完毕后执行里面内容
					this._initScroll();
					this._calculateHeight();
				})
			})

			console.log(this.seller.deliveryPrice)
		},
		computed:{
			// 计算切换到哪一个goods区间的index
			currentIndex (){  
				for( let i = 0; i<this.listHeight.length; i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					// &&的优先级高于||
					if( !height2 || this.scrollY >= height1 && this.scrollY < height2){
						return i
					}
				}
			},

			//筛选出选择的食品
			selectFoods (){
				let foods = [];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if( food.count ){
							foods.push(food)
						}
					})
				})
				return foods
			}
		},
		methods:{
			// 初始化滚轮
			_initScroll (){
				// 第一个参数是滚动内容的父层，第二个参数是一个对象
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{
					click:true //将click事件开启不然BScroll默认你要滑动
				})

				this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
					probeType:3,//probeType:3 滚动的时候会时时派发scroll事件
					click:true
				})

				this.foodsScroll.on('scroll',(pos)=>{
					this.scrollY = Math.abs(Math.round(pos.y))
					// console.log(this.scrollY)
				})
			},

			//计算存储所有foodList的高度
			_calculateHeight (){  
				// console.log(this.$refs.foodsWrapper)
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let height =0;

				this.listHeight.push(height);

				for( let i=0;i<foodList.length;i++){

					height += foodList[i].clientHeight

					this.listHeight.push(height)
				}
			},

			// 点击侧边栏滚动goods组件进行切换
			seletMenu (index){
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');

				let el = foodList[index];
				// BScroll对象有滚动到相应位置的事件
				this.foodsScroll.scrollToElement(el,300)
			},

			// 显示商品详情页
			selectFood (food,ev){
				this.selectedFood = food;
				this.$refs.food.show()//这里是在父组件可以调用自组建的方法
				//console.log(1)
			}
		},
		components:{
			Cartcontrol,
			Shopcart,
			Food
		}
	}
</script>
<style scoped>

	#goods{
		display:flex;
		position:absolute;
		top:174px;
		bottom:46px;
		width:100%;
		overflow:hidden;
	}
	.menu-wrapper{
		flex:0 0 80px;
		width:80px;
		background:#f3f5f7;
	}
	.foods-wrapper{
		flex:1;
	}
	.icon {
	    display: inline-block;
	    vertical-align:top;
	    width: 12px;
	    height: 12px;
	    margin-right: 0.04rem;
	    background-size: 12px 12px;
	    background-repeat: no-repeat;
	}
	.decrease{
		background-image:url(./decrease_3@2x.png);
	}
	.discount{
		background-image:url(./discount_3@2x.png);
	}
	.guarantee{
		background-image: url(./guarantee_3@2x.png);
	}
	.invoic{
		background-image: url(./invoice_3@2x.png)
	}
	.special{
		background-image:url(./special_3@2x.png);
	}
	.menu-item{
		display:table;
		width:56px;
		height:54px;
		line-height:14px;
		padding: 0 12px;
		border-bottom:0.01rem solid rgba(7,17,27,0.1);
	}
	.current{
		position:relative;
		margin-top:-1px;
		z-index:10;
		background:#fff;
		font-weight:700;
		border-bottom:none;
	}
	.menu-item:last-child{
		border-bottom:none;
	}
	.menu-item .text{
		display:table-cell;
		width:56px;
		font-size:12px;
		vertical-align:middle;
	}
	.foods-wrapper .title {
	    padding-left: 14px;
	    height: 26px;
	    line-height: 26px;
	    border-left: 2px solid #d9dde1;
	    font-size: 12px;
	    color: #93999f;
	    background: #f3f5f7;
	}
	.foods-wrapper .food-item {
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    margin: 18px;
	    padding-bottom: 18px;
	    position: relative;
	    border-bottom:0.01rem solid rgba(7,17,27,0.1);
	}
	.foods-wrapper .food-item:last-child{
		border-bottom:0;
		margin-bottom:0;
	}
	.foods-wrapper .food-item .icon {
	    -webkit-box-flex: 0;
	    -ms-flex: 0 0 57px;
	    flex: 0 0 57px;
	    margin-right: 10px;
	}
	.foods-wrapper .food-item .content {
	    -webkit-box-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	}
	.foods-wrapper .food-item .content .name {
	    margin: 2px 0 8px 0;
	    height: 14px;
	    line-height: 14px;
	    font-size: 14px;
	    color: #07111b;
	}	
	.foods-wrapper .food-item .content .desc,.foods-wrapper .food-item .content .extra {
	    line-height: 10px;
	    font-size: 10px;
	    color: #93999f;
	}
	.foods-wrapper .food-item .content .desc {
	    line-height: 12px;
	    margin-bottom: 8px;
	}
	.foods-wrapper .food-item .content .price {
	    font-weight: 700;
	    line-height: 24px;
	}
	.foods-wrapper .food-item .content .extra .count {
	    margin-right: 12px;
	}
	.foods-wrapper .food-item .content .extra span{
		font-size:12px;
	}
	.foods-wrapper .food-item .content .price .now {
	    margin-right: 8px;
	    font-size: 14px;
	    color: #f01414;
	}
	.foods-wrapper .food-item .content .price .old {
	    text-decoration: line-through;
	    font-size: 10px;
	    color: #93999f;
	}	
	.foods-wrapper .food-item .content .cartcontrol-wrapper {
	    position: absolute;
	    right: 0;
	    bottom: 12px;
	}

</style>