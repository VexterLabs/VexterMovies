import Vue from 'vue'

Vue.filter('optionTxt',function (value,obj,id,val) {
  let newObj = {};
  if(value && obj){
    for(var i=0; i<obj.length; i++){
        newObj[obj[i][id]] = obj[i][val];
    }
    return newObj[value]
  }
  return ''      
})