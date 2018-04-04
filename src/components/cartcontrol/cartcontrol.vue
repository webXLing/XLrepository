<template>
  <div id="cartcontrol">
    <div class="cartcontrol">
    	<transition name="fade">
    		<div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart">
	    		<span class="inner iconfont icon-jianhao1"></span>
	    	</div>
    	</transition>    	
    	<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    	<div class="cart-add iconfont icon-jiahao" @click.stop="addCart"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props:{
  	food:{
  		type:Object
  	}
  },
  methods:{
  	addCart (){
  		if( !this.food.count ){
  			Vue.set(this.food,'count',1);
  		}else{
  			this.food.count++;
  		}
  	},
  	decreaseCart (){
  		if( this.food.count ){
  			this.food.count--;
  		}
  	}
  }
}
</script>

<style scoped>
	.cartcontrol {
	    font-size: 0;
	}
	.cartcontrol .cart-add {
	    display: inline-block;
	    font-size: 24px;
	    color: #fff;
	    background: #00a0dc;
	    border-radius: 50%;
	    margin-top: 5px;
	    margin-left: 5px;
	}
	.cartcontrol .cart-count {
	    display: inline-block;
	    vertical-align: top;
	    width: 12px;
	    padding-top: 6px;
	    line-height: 24px;
	    text-align: center;
	    font-size: 10px;
	    color: #93999f;
	}
	.fade-enter-active,.fade-leave-active{
		-webkit-transition: all 0.4s linear;
	    transition: all 0.4s linear;
	}
	.fade-enter,.fade-leave-to{
	    opacity: 0;
	    -webkit-transform:translate3d(24px, 0, 0);
	    transform:translate3d(24px, 0, 0);
	}
	.fade-leave,.fade-enter-to{
		opacity: 1;
		-webkit-transform:translate3d(0, 0, 0);
	    transform:translate3d(0, 0, 0);
	}	
	.cartcontrol .cart-decrease {
	    display: inline-block;    
	}
	.cartcontrol .cart-decrease .inner {
	    display: inline-block;
	    font-size: 24px;
	    color: #00a0dc;
	    border:2px solid #00a0dc;
	    border-radius:50%;
	    -webkit-transform:scale(0.85);
	    transform:scale(0.85);
	}
</style>
