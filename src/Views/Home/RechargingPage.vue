<template>
    <div class="recharging">
        <form :action="currentInfo.formAction" method="post" accept-charset="UTF-8">
            <input type="hidden" name="charset" value="utf-8">
            <input type="hidden" name="business" :value="currentInfo.business">
            <input type="hidden" name="cmd" :value="currentInfo.cmd">
            <input type="hidden" name="return" :value="url">
            <input type="hidden" name="rm" :value="currentInfo.rm">
            <input type="hidden" name="notify_url" :value="currentInfo.notifyUrl">
            <input type="hidden" name="custom" :value="currentInfo.orderId">
            <input type="hidden" name="item_name" :value="currentInfo.itemName">
            <input type="hidden" name="amount" :value="currentInfo.amount">
            <input type="hidden" name="currency_code" :value="currentInfo.currencyCode">
            

            <button ref='button' type="submit" style="cursor:pointer;"></button>
        </form>
    </div>
</template>
<script>
export default{
    data () {
        return {
            currentInfo: {},
            url: ''
        }
    },
    mounted(){
        if(this.$route.query.amt){
            window.opener.closeRecharge(); 
            window.close();
        }else{
            this.url = window.location.href
            if(this.$route.query.rechargeInfo){
                this.currentInfo = JSON.parse(this.$route.query.rechargeInfo)
                this.$nextTick().then(() => {
                    // 获取到orderId之后再自动点击表单提交
                    this.$refs.button.click()
                })
            }
        }
    },
}
</script>
<style lang='scss' scoped>

</style>
