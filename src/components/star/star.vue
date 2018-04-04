<template>
  <div id="star">
    <span v-for="itemClass in itemClasses" class="star-item" :class="itemClass"></span>
  </div>
</template>

<script>
const LENGTH = 5;//一共五个星
const CLS_ON = 'on';//全星;
const CLS_HALF = 'half';//半星
const CLS_OFF = 'off';//空星

export default {
  props:{
    score:{
      type:Number
    }
  },
  computed:{
    itemClasses (){ //计算每一个星应该显示的样式
      let result = [];            4.6
      let score = Math.floor(this.score*2)/2;//判断评分值是否超过.5  4.5
      let hasDecimal = score%1 != 0;  true 是半醒
      let integer = Math.floor(score);

      for( let i=0;i<integer;i++ ){
        result.push(CLS_ON);
      }
      if( hasDecimal ){
        result.push(CLS_HALF);
      }
      while( result.length<LENGTH ){
        result.push(CLS_OFF);
      }
      return result;
    }
  }
}
</script>

<style scoped>
  .on{
    background-image:url(star24_on@2x.png);
  }
  .half{
    background-image:url(star24_half@2x.png);
  }
  .off{
    background-image:url(star24_off@2x.png);
  }
  .star-item{
      display: inline-block;      
      width: 0.36rem;
      height: 0.36rem;
      margin-right: 0.22rem;
      background-size: cover;
      background-repeat: no-repeat;
  }
  .star-item:last-child{
    margin-right:0;
  }
</style>
