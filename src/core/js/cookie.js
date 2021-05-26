/**
 * cookie设置
 * @param {cookie名} c_name 
 * @param {值} value 
 * @param {保存时长} expiredays 
 */
export const setCookie = (c_name, value, expiredays) => {                   
    var exdate = new Date();                   
    exdate.setDate(exdate.getDate() + expiredays);                   
    document.cookie = c_name + "=" + escape(value) + ";expires=" + exdate.toGMTString() + ";path=/";         
} 

/**
 * 获取cookie
 * @param {cookie名} name 
 */
export const getCookie = (name) => {
    
    var strcookie = document.cookie;//获取cookie字符串
    var arrcookie = strcookie.split("; ");//分割
    //遍历匹配
    for ( var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name){
            return arr[1];
        }
    }
    return "";
}

/**
 * 删除cookie
 * @param {cookie名} name 
 */
export const clearCookie = (name) => {     
    setCookie(name, "", -1); 
}