<template>
    <div class="recharge-status" @click="handleClose">
        充值成功
    </div>
</template>
<script>
export default{
     data () {
        return {
        
        }
    },
    methods: {
        handleClose(){
            this.$emit('handleRechargeStatus', false)
        }
    }
}
</script>
<style lang='scss' scoped>
.recharge-status{
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.6);
    color: #fff;
    left: 0;
    top: 0;
}
</style>
