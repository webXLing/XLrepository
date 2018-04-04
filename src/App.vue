<template>
  <div id="app">
    <Header :seller="seller"></Header>
    <tab></tab>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from './components/header/header.vue'
import Tab from './components/tab/tab.vue'
export default {
  name: 'app',
  data () {
    return {
      seller:{}
    }
  },
  components:{
    Header,
    Tab
  },
  mounted (){
    this.$http.get('https://www.easy-mock.com/mock/5aa0e486d7ebd14ee7554b47/example/seller').then((res)=>{
     // console.log(res.data)
      this.seller = res.data
    })
  }
}
</script>

<style>
</style>
