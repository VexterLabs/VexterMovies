
<template>
  <div class="index">
    <NavBox :loginshow="anav"></NavBox>
    <router-view></router-view>
  </div>
</template>
<script>
import NavBox from '@/components/Home/NavBox'

export default {
  name: 'index',
  data(){
    return {
      anav: []
    }
  },
  mounted () {
    
  },
  methods: {
    
  },
  components: {
    NavBox
  }
}
</script>
