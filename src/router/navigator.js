
import Router from "vue-router";

class Navigator extends Router{
    // 维护一个历史栈
    navigatorList = [];
    // 前进 1 或者后退 2
    handleType = 0;

    constructor(...props){
        super(...props);
    }

    push(...args){
        
        this.navigatorList.push(...args);
        this.handleType = 1;
        // console.log(this.navigatorList)
        super.push(...args);
        this.handleType = 0;
      
    }

    replace(...args){
        this.navigatorList.splice(-1, 1).push(...args);
        this.handleType = 1
        super.replace(...args);
        this.handleType = 0;
       
    }

    go(num){
        this.navigatorList.splice(-1, 1);
        this.handleType = 2;
        // console.log(this.navigatorList)
        // console.log(num)
        super.go(num);
        // console.log('wwwww')
        this.handleType = 0;
        
    }

    back(){
        this.go(-1);
    }

    
    beforeRouteBack(to, from, next, callback){
        if(callback){
            callback(to, from, next);
        }else{
            next(-1)
        }
      
    }

}

export default Navigator