/**
 * 验证邮箱@符号前的长度是否符合
 * @param {字符串} str
 */
export const judgeEmailLength = (str) => {
  let index = str.indexOf('@')
  console.log(index);
  // return index > 70
  return str.length >= 70
}
/**
 * 为了验证字符串格式，是否符合邮箱格式
 * @param {验证邮箱的值，字符串} value
 */
export const checkEmail = (value) => {
  // const reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,16})$/g
  if (reg.test(value)) {
    return judgeEmailLength(value) ? false : true
  } else {
    return false
  }
  return reg.test(value)
}
/**
 * 校验字符串长度是否符合规则
 * @param {被校验的字符串} value
 * @param {最小长度} min
 * @param {最大长度} max
 */
export const checkLength = (value, { min, max }) => {
  return value.length > min && value.length < max
}



/**
 * 校验密码6-18位字母和数字组合
 * @param {string} value
 */
export const judgePassword = (value) => {
  const reg = new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,18}$')
  return reg.test(value)
}

/**
 * 校验已登录用户ID,进行打点
 * @param {传参打点数据收集对象object} value
 */
export const logAddUserId = (LogObj) =>{
  let userInfo = window.localStorage.getItem('userInfo')
  if(userInfo){
    userInfo = JSON.parse(userInfo)
    LogObj.uid = userInfo.id
    LogObj.map.uid = userInfo.id
  }
  return LogObj;
}

/**
 * getUserIP((ip) => {let newIP = ip})
 * @param {传参是一个函数，函数的参数是获取到的ip} onNewIP
 */
export const getUserIP = (onNewIP) => {
  let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
  let pc = new MyPeerConnection({
    iceServers: []
  });
  let noop = () => {
  };
  let localIPs = {};
  let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
  let iterateIP = (ip) => {
    if (!localIPs[ip]) onNewIP(ip);
    localIPs[ip] = true;
  };
  pc.createDataChannel('');
  pc.createOffer().then((sdp) => {
    sdp.sdp.split('\n').forEach(function (line) {
      if (line.indexOf('candidate') < 0) return;
      line.match(ipRegex).forEach(iterateIP);
    });
    pc.setLocalDescription(sdp, noop, noop);
  }).catch((reason) => {
  });
  pc.onicecandidate = (ice) => {
    if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
    ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
  };
}

/**
 * 判断元素是否在可视区域内
 * * */
export const eleIsCanSee = (ele) => {
  const eleHeight = ele.offsetHeight
  const eleTop = ele.offsetTop
  const windowScrollTop = window.document.body.scrollTop || document.documentElement.scrollTop
  const windowHeight = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight

  if (((windowScrollTop + windowHeight) < (eleTop)) || (windowScrollTop > (eleHeight + windowHeight + eleTop))) {
    return false
  } else {
    return true
  }
  // if(((windowScrollTop+windowHeight) < (eleTop)) || (windowScrollTop > (eleHeight + windowHeight + eleTop))){
  //   return false
  // }else{
  //   return true
  // }


}

/**
 * 修改url 不刷新页面
 * @param  bookId  ,  chapterId
 * */
export const exchangeURI = (bookId, chapterId) => {
  let state = { title: '', url: window.location.href };
  history.pushState(state, '', bookId + '-' + chapterId);
}
// 返回 YY-MM-DD HH:MM:SS 格式的毫秒
export const getMiliSec = (timeStr) => {
  let a1 = timeStr.split(" ");
  let dateArr = a1[0].split("-");
  let timeArr = a1[1].split(":");

  let DateMS = Date.UTC(...dateArr);

  let DayMS = (timeArr[0] * 3600 + timeArr[1] * 60 + timeArr[2]) * 1000;

  return DateMS - 0 + DayMS - 0;
}

// 去除emoji
export const removeEmoji = (content) => {
  return content.replace(
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
    ""
  );
}


export const judgeFromNow = (val) => {
  let valDate = val.split('-');
  let valYear = valDate[0];
  let valMonth = valDate[1];
  let nowDate = new Date();
  let Year = nowDate.getFullYear();
  let Mon = nowDate.getMonth() + 1;
  if (valYear <= Year && valMonth <= Mon) {
    return true;
  } else {
    return false;
  }
}

// 金额按照 K M 输出
/**
 *
 *  （1）百级及以下的金额显示完整金额小数点后保留两位，例如123.45，显示为123.45
   （2）千级至十万级的金额显示用“K”来表示，小数点后保留两位，例如123456.78，显示为123.45K
   （3）百万级的金额以上显示用“M”来表示，小数点后保留两位，123456789.12，显示为123.45M
 *
*/
export const showMoney = (moneyStr, hasDoler) => {
  if (!moneyStr) {
    return '$0.00';
  }

  if (moneyStr.startsWith('$')) {
    moneyStr = moneyStr.slice(1);
  }

  var zheng = moneyStr.split('.')[0];
  var yu = moneyStr.split('.')[1]
  if (yu) {
    yu = (yu + '00').slice(0, 2)
  } else {
    yu = '00';
  }
  // 千位下
  if (zheng < 1000) {
    if (hasDoler) {
      moneyStr = zheng + "." + yu;
    } else {
      moneyStr = zheng
    }
  } else if (zheng >= 1000 && zheng < 1000000) {  //K
    zheng = (zheng / 1000) + '';
    if (zheng.includes('.')) {
      let zhengArr = zheng.split('.');
      zheng = zhengArr[0] + '.' + zhengArr[1].slice(0, 1)
    } else {
      zheng = zheng + '.0'
    }
    moneyStr = zheng + 'K';
  } else if (zheng >= 1000000) { // m
    zheng = (zheng / 1000000) + '';
    if (zheng.includes('.')) {
      let zhengArr = zheng.split('.');
      zheng = zhengArr[0] + '.' + zhengArr[1].slice(0, 1)
    } else {
      zheng = zheng + '.0'
    }
    moneyStr = zheng + 'M';
  }
  if (hasDoler) {
    return '$' + moneyStr;
  } else {
    return moneyStr;
  }
}

export const fixPopularTitle = (titleStr) => {
  return titleStr.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
}


// 路由拼接参数,空格转短横,删除问号
export const formatSpace = (param) => {
  if(!param){
    param = "unnamed";
  }
  let  res = removeEmoji(param);
  res = encodeURI(res);
  res = res.split('%20').join('-').split('%C2%A0').join('-');
  res = decodeURI(res);
  // res = res.replace(/\?/g , '');
  // 根据URL特殊字符进行替换书名, 只保留普通英文和数字、特殊字符$-_.+!*'()
  // res = res.replace(/[^A-Za-z0-9]/ig , '-')// \_\'\*\(\)\$\+\!\-\.
  // let tempResArr = res.split('-');
  // let resArr = [];
  // tempResArr.forEach((item)=>{
  //   if(item){
  //     resArr.push(item);
  //   }
  // })

  // return resArr.join('-');
  return res
}


 // 处理千位
 export const dealSosen = (num)=>{
  num = num.toString().split("."); // 分隔小数点
  var arr = num[0].split("").reverse(); // 转换成字符数组并且倒序排列
  var res = [];
  for (var i = 0, len = arr.length; i < len; i++) {
      if (i % 3 === 0 && i !== 0) {
          res.push(","); // 添加分隔符
      }
      res.push(arr[i]);
  }
  res.reverse(); // 再次倒序成为正确的顺序
  if (num[1]) {
      // 如果有小数的话添加小数部分
      res = res.join("").concat("." + num[1]);
  } else {
      res = res.join("");
  }
  return res;
}