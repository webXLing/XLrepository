import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import App from './App.vue'
import routes from './routeConfig.js'

//如果在一个模块化工程中使用router必须通过Vue.use() 明确第安装路由的功能;
Vue.use(VueRouter)

//创建 router 实例 然后 routes 配置
const router = new VueRouter({
	// 全局配置 <router-link> 的默认 激活class类名
	linkActiveClass:'active',
	routes
})

//其他组件使用axios的时候 可以直接通过this.$http访问axios的方法了;
Vue.prototype.$http = axios;



new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
