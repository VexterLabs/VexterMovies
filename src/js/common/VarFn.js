export default {
  install ( Vue, options ){
    Vue.prototype.getRequestId = function () {
      let time_four = (new Date()).valueOf() + ''
      time_four = time_four.substr(time_four.length - 8)
      return 'HWYC' + time_four + parseInt(Math.random() * 1e4)
    },    
    Vue.prototype.routePush = function (url) {
      if (url) this.$router.push(url)
    },
    Vue.prototype.optionText = function (value,obj,id,val){
      let newObj = {};
      if(value && obj){
        for(var i=0; i<obj.length; i++){
            newObj[obj[i][id]] = obj[i][val];
        }
        return newObj[value]
      }
      return '' 
    }
  }
}