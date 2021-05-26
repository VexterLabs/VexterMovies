<template>
    <div class="read-serialize">
        <div class="text-title">New chapter is coming soon</div>
        <div class="review">WRITE A REVIEW</div>
    </div>
</template>
<script>
export default{
     data () {
        return {
        
        }
    }
}
</script>
<style lang='scss' scoped>
.read-serialize{
    text-align: center;
    padding: 80px 0 40px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    .text-title{    
        color:rgba(58,74,90, 0.6);
        font-size: 32px;
        font-weight: bold;
    }
    .review{
        width: 300px;
        height: 56px;
        text-align: center;
        line-height: 56px;
        border-radius: 4px;
        margin: 96px auto 0;
        font-size: 20px;
        font-weight: bold;
        color: #fff;
        background: #EE3799;
        cursor: pointer;
    }
}
</style>
