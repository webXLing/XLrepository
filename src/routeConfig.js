//配置路由的文件

// 引入路由文件
import Goods from './components/goods/goods.vue'
import Ratings from './components/ratings/ratings.vue'
import Seller from './components/seller/seller.vue'

export default[
	{
		path:'/goods',
		component:Goods
	},
	{
		path:'/ratings',
		component:Ratings
	},
	{
		path:'/seller',
		component:Seller
	},
	{
		path:'/',   //默认显示那个组件
		redirect:'/goods'
	},
	{
		path:'*',  
		redirect:'/goods'  //路由重定向
	}
]