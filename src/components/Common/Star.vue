<!--
 * @Description:
 * @FilePath: \webfic_pc_ssr\src\components\Common\Star.vue
 * @Version: 1.0
 * @Autor: CuiGang
 * @Date: 2019-12-30 16:50:48
 * @LastEditors: CuiGang
 * @LastEditTime: 2021-01-04 19:34:16
-->
<template>
    <div class="book-star">
        <slot></slot>
        <strong class="home" v-if="textPos == 'home'">{{dealRatings}}</strong>

        <ul class="stars" v-if="count > 0">
          <li
            v-for="(item, index) in 10"
            :key="index"
            :class=" { 'star-empty':true, 'star-fill': count>=20 && index <= Math.round(ratings)-1}"
          ></li>
        </ul>
        <span v-if="textPos == 'end' && count > 0">{{ (count < 20) ? "0.0" : dealRatings}}</span>

        <div
        v-if="!count"
        v-for="(item , index) in 5"
        :key="index"
        :class="['book-star-item',{'active':( item>Math.round(ratings/2) ) }
        ,{homeText: textPos == 'home'}]"></div>
        <span v-if="textPos == 'end' && !count">{{ dealRatings}}</span>
        <!-- count < 20 ||  -->
        <!-- !count ? '0.0' :  -->
    </div>
</template>
<script>
export default{
    props: {
        ratings: {
            default: ''
        },
        textPos: {
            default: 'end'
        },
        count:{
            default:0,
        }
    },
    computed: {
        dealRatings(){
            if((this.ratings+'').indexOf('.') > -1){
                return this.ratings
            }else{
                return this.ratings + '.0'
            }
        }
    },
    data () {
        return {

        }
    }
}
</script>
<style lang='scss' scoped>

.stars {
    overflow: hidden;
    display: inline-block;
    margin-bottom: -2px;
    li {
      float: left;
      width: 8px;
      height: 16px;
      line-height: 16px;
      font-size: 16px;
      &:nth-child(2n) {
        margin-right: 7px;
        background-position: -8px 0;
      }
    }
  }

.book-star{
    font-size: 0;
    .home{
        font-size: 30px;
        margin-right: 10px;
    }
    .book-star-item{
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url('../../assets/images/icons/fill_star.png') no-repeat center center/100% 100%;
        margin-right: 8px;
        &.active{
            background-image: url('../../assets/images/icons/empty_star.png');
        }
        &.homeText{
            width: 28px;
            height: 28px;
        }
    }
    span{
        color:rgba(58,74,90,1);
        font-size: 14px;
        position: relative;
        top: -2px;
    }
}
</style>
