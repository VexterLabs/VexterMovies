
<template>
  <transition name="fade">
    <div class="message" :class="type" v-if="visible">
      <i class="icon-type iconfont" :class="'icon-'+type"></i>
      <div class="content">{{content}}
        <i v-if="hasClose" class="btn-close iconfont icon-close" @click="visible=false"></i>
      </div>
    </div>
  </transition>
</template>

<script>
 const Message =  {
    name: "MyMessage",
    data() {
      return {
        content: '',
        time: 3000,
        visible: false,
        type:'info',//'success','warning','error'
        hasClose:false,
      }
    },
    mounted() {
      this.close()
    },
    install(Vue){
      Vue.prototype.$msg = (config) => {
        const MessgeConstructor = Vue.extend(Message)
        const instance = new MessgeConstructor({data: config})
        instance.vm = instance.$mount()
        document.body.appendChild(instance.vm.$el)
        instance.vm.visible = true
      }
    },
    methods: {
      close() {
        setTimeout(() =>{
          this.visible = false
          if(this.$el.parentNode){
            this.$el.parentNode.removeChild(this.$el)
          }
        }, this.time);
      }
    },
    watch: {
      visible(v){
        if(v){
          this.close()
        }
      }
    }
  }
  export default Message
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.message {
  position: fixed;
  z-index: 99999;
  max-width: 480px;
  min-width: 300px;
  padding: 36px 30px;
  border-radius: 4px;
  box-sizing: border-box;
  color: #ffffff;
  background: rgba(0,0,0,0.8);
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
  text-align: center;
  .content{
    font-size: 20px;
    font-weight: 400;
  }
}

</style>
