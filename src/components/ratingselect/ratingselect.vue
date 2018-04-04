<!-- 此组件提出来，只是为了提议联系子夫组件之间的诗句交互，这样会有些麻烦 -->
<!-- 将切换的状态踹会父组件 -->
<template>
	<div id="ratingselect">
		<div id="ratingselect">
			<div class="ratingselect">
				<div class="rating-type">
					<span class="block positive" @click="select(2)" :class="{active:mySelectType==2}">
						{{desc.all}}
						<span class="count">{{ratings.length}}</span>
					</span>
					<span class="block positive" @click="select(0)" :class="{active:mySelectType==0}">
						{{desc.positive}}
						<span class="count">{{positive.length}}</span>
					</span>
					<span class="block positive" @click="select(1)" :class="{active:mySelectType==1}">
						{{desc.nagative}}
						<span class="count">{{nagative.length}}</span>
					</span>
				</div>

				<div class="switch" @click="toggleContent" :class="{on:myOnlyContent}">
					<span class="icon-check_circle iconfont icon-duihao2"></span>
					<span class="text">只看有内容的评价{{selectType}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>

const POSITIVE = 0;//好评
const NAGATIVE = 1;//差评
const ALL = 2;//所有评价
	export default{
		props:{  //避免这些的形容词的改变
			desc:{
				type:Object,
				default (){
					return {
						all:'全部',
  					positive:'满意',
  					nagative:'不满意'
					}
				}
			},
			onlyContent:{
				type:Boolean,
				default:false
			},
			selectType:{
				type:Number,
				default:ALL
			},
			ratings:{
				type:Array,
				default (){
					return []
				}
			},
		},
		data (){
			return{
				mySelectType:this.selectType,
				myOnlyContent:this.onlyContent
			}
		},
		computed:{
			positive (){ //过滤好评的信息
	  			return this.ratings.filter((rating)=>{
	  				return rating.rateType==POSITIVE;
	  			})
	  		},
	  		
	  		nagative (){ //过滤差评的信息
	  			return this.ratings.filter((rating)=>{
	  				return rating.rateType==NAGATIVE;
	  			})
	  		}
		},
		methods:{
			select (num){
				// 子组建无法之间更改父组件的数据，以及同步
				// this.selectType = num
				// 解决方法
				// 1.传过来的是一个对象
				// 2.父组件传过来的数据在自组建做一个中转，然后在向父组件emit更改的数据，我们这里用的是第二种方法
				this.mySelectType = num;
				this.$emit('ratingSelect1',num)
				// ratingSelect 是方法名

			},

			toggleContent (){
				this.myOnlyContent = !this.myOnlyContent;
  			this.$emit('contentToggle1',this.myOnlyContent);
			},

			show (){
				this.mySelectType = ALL;
  				this.myOnlyContent = true;
			}
		}
	}
</script>
<style scoped>
	.ratingselect .rating-type {
	    padding: 18px 0;
	    margin: 0 18px;
	    position: relative;
	    font-size: 0;
	    border-bottom:0.01rem solid rgba(7,17,27,0.1);
	}
	.ratingselect .rating-type .block {
	    display: inline-block;
	    padding: 8px 12px;
	    margin-right: 8px;
	    line-height: 16px;
	    border-radius: 1px;
	    font-size: 12px;
	    color: #4d555d;
	}
	.ratingselect .rating-type .block.positive {
	    background: rgba(0,160,220,0.2);
	}
	.ratingselect .rating-type .block.positive.active {
	    background: #00a0dc;
	}
	.ratingselect .rating-type .block.active {
	    color: #fff;
	}
	.ratingselect .rating-type .block.negative {
	    background: rgba(77,85,93,0.2);
	}
	.ratingselect .rating-type .block.negative.active {
	    background: #4d555d;
	}
	.ratingselect .switch {
	    padding: 12px 18px;
	    line-height: 24px;
	    border-bottom: 1px solid rgba(7,17,27,0.1);
	    color: #93999f;
	    font-size: 0;
	}
	.ratingselect .switch .icon-check_circle {
	    display: inline-block;
	    vertical-align: top;
	    margin-right: 4px;
	    font-size: 24px;
	}
	.ratingselect .switch.on .icon-check_circle {
	    color: #00c850;
	}
</style>