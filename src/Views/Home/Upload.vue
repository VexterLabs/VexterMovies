<template>
    <div class="uplaod">
        <div id="buttonId">按钮</div>
        {{url}}
        <img class="img" :src="url" alt="upload">
    </div>
</template>
<script>
// import { ZxImageProcess } from 'image-process'
export default{
    data () {
        return {
            url: 'aaa'
        }
    },
    mounted () {
        this.uploadImgInit()
    },
    methods: {
        uploadImgInit(){
            var that = this
            const zxImageProcess = new this.ZxImageProcess({
                // 默认为空，图片和视频文件，前提是浏览器支持input[accept=]
                accept: 'image/*',
                // 自动裁剪
                auto: true,
                // 触发文件选择的元素
                selector: '#buttonId',
                // 限制宽度等比缩放，则只需设置width值
                // 限制高度等比缩放，则只需设置height值
                // 同时设置了width、height值，则会对图片按尺寸裁剪
                width: 600,
                height: 800,
                // 裁剪按钮名称
                submitText: '确 定',
                // 裁剪容器按钮样式
                submitStyle: '',
                cancelStyle: 'color: red',
                // 旋转按钮名称
                // rotateText: '旋转90度',
                // 最大文件限制
                success: function (result) {
                    // 返回数据
                    that.url = result.url
                },
                error: function (err) {
                    console.error(err);
                }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.uplaod{
    min-height: 600px;
    .img{
        width: 60px;
        height: 80px;
    }
}
</style>
