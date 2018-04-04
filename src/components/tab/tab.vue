<template>
	<div id="tab">
		<ul>
			<li class="tab-item">
				<router-link to="/goods">商品</router-link>
			</li>
			<li class="tab-item">
				<router-link to="/ratings">评论</router-link>
			</li>
			<li class="tab-item">
				<router-link to="/seller">商家</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	export default{

	}
</script>
<style scoped>
	#tab{
		width:100%;
		border-bottom:0.01rem solid rgba(7,17,27,0.1);
	}
	#tab ul{
		display:-webkit-flex;
		display:flex;
		height:40px;
		line-height:40px;
	}
	#tab .tab-item{
		flex-grow:1;
		text-align:center;
		line-height:40px;
		font-size:0.28rem;
	}
	#tab .tab-item .active{
		color:rgb(240,20,20);
	}
	#tab .tab-item a{
		display:block;
	}
</style>