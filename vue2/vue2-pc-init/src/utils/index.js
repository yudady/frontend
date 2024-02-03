// 去除用户名空格的工具
export function wipeOffBlank(val) {
  let reVal = '';
  val = val && val.toString();
  if (val) {
    reVal = val.replace(/\s+/g, '');
  }
  return reVal;
}

// 判断是否为有效数据的工具（object,array,variable）


// 数据去重工具
export function wipeRepetition(arr) {
  let a = new Set(arr);
  return Array.from(a);
}

// 获取两个数组交集数据
export function intersection(arr1, arr2) {
  if (!arr1) {
    arr1 = [];
  }
  if (!arr2) {
    arr2 = [];
  }
  var returnData = [],
    set = new Set(arr2);

  arr1.forEach((value) => {
    if (set.has(value)) {
      returnData.push(value);
    }
  });
  return returnData;
}

// 获取两个数组的差集数据
export function difference(arr1, arr2) {
  if (!arr1) {
    arr1 = [];
  }
  if (!arr2) {
    arr2 = [];
  }

  let diff = [];
  let tmp = arr2;

  arr1.forEach((val1, i) => {
    if (arr2.indexOf(val1) < 0) {
      diff.push(val1);
    } else {
      tmp.splice(tmp.indexOf(val1), 1);
    }
  });
  return diff.concat(tmp);
}

// 获取两个数组的并集数据
export function unionSet(arr1, arr2) {
  if (!arr1) {
    arr1 = [];
  }
  if (!arr2) {
    arr2 = [];
  }
  let arr = arr1.concat(arr2),
    set = new Set(arr);
  return Array.from(set);
}

// 数字计算的精度计算工具
export function DecimalCompute(num1, num2, op) {
  if (!arguments.length) {
    return;
  }

  if (num1 === undefined) {
    num1 = 0;
  }

  if (num2 === undefined) {
    num2 = 0;
  }

  if (!num1 && num1 != 0) {
    num1 = 0;
  }

  if (!num2 && num2 != 0) {
    num2 = 0;
  }

  num1 = num1.toString();
  num2 = num2.toString();

  if (~num1.indexOf('-')) {
    if (num1.substr(1) > 0) {
      num1 = Number(num1);
    } else {
      num1 = Number(num1);
    }
  }

  if (~num2.indexOf('-')) {
    if (num2.substr(1) > 0) {
      num2 = Number(num2);
    } else {
      num2 = Number(num2);
    }
  }

  var ext1Len = num1.toString().split('.')[1] ? num1.toString().split('.')[1].length : 0;
  var ext2Len = num2.toString().split('.')[1] ? num2.toString().split('.')[1].length : 0;

  var m = Math.pow(1000, Math.max(ext1Len, ext2Len));

  var result = '';

  switch (op) {
    case '+' :
      result = (num1 * m + num2 * m) / m;
      break;
    case '-' :
      result = (num1 * m - num2 * m) / m;
      break;
    case '*' :
      result = ((num1 * m) * (num2 * m)) / Math.pow(m, 2);
      break;
    case '/' :
      result = ((num1 * m) - (num2 * m)) / Math.pow(m, 2);
      break;
    default :
      result = (num1 * m + num2 * m) / m;
  }

  if (!result) {
    result = 0;
  }

  return result;
}

// 数字转大写工具
export function changeNumMoneyToChinese(money) {
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'); //汉字的数字
  var cnIntRadice = new Array('', '拾', '佰', '仟'); //基本单位
  var cnIntUnits = new Array('', '万', '亿', '兆'); //对应整数部分扩展单位
  var cnDecUnits = new Array('角', '分', '毫', '厘'); //对应小数部分单位
  var cnInteger = '整'; //整数金额时后面跟的字符
  var cnIntLast = '元'; //整型完以后的单位
  var maxNum = 999999999999999.9999; //最大处理的数字
  var IntegerNum; //金额整数部分
  var DecimalNum; //金额小数部分
  var ChineseStr = ''; //输出的中文金额字符串
  var parts; //分离金额后用的数组，预定义
  var Symbol = '';//正负值标记
  if (money === '' && money !== 0) {
    return '';
  }

  money = parseFloat(money);

  if (money >= maxNum) {
    alert('超出最大处理数字');
    return '';
  }
  if (money === 0) {
    ChineseStr = cnNums[0] + cnIntLast + cnInteger;
    return ChineseStr;
  }
  if (money < 0) {
    money = -money;
    Symbol = '负 ';
  }
  money = money.toString(); //转换为字符串
  if (money.indexOf('.') == -1) {
    IntegerNum = money;
    DecimalNum = '';
  } else {
    parts = money.split('.');
    IntegerNum = parts[0];
    DecimalNum = parts[1].substr(0, 4);
  }
  if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
    var zeroCount = 0;
    var IntLen = IntegerNum.length;
    for (var i = 0; i < IntLen; i++) {
      var n = IntegerNum.substr(i, 1);
      var p = IntLen - i - 1;
      var q = p / 4;
      var m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          ChineseStr += cnNums[0];
        }
        zeroCount = 0; //归零
        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        ChineseStr += cnIntUnits[q];
      }
    }
    ChineseStr += cnIntLast;
    //整型部分处理完毕
  }
  if (DecimalNum != '') { //小数部分
    var decLen = DecimalNum.length;
    for (var i = 0; i < decLen; i++) {
      var n = DecimalNum.substr(i, 1);
      if (n != '0') {
        ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (ChineseStr == '') {
    ChineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (DecimalNum == '') {
    ChineseStr += cnInteger;
  }
  ChineseStr = Symbol + ChineseStr;

  return ChineseStr;
}

/**
 * 去除对象中的无效数据
 */
export function RemoveInvalidParam(data) {
  if (!data) {
    return {};
  }
  const keys = Object.keys(data);
  let resData = {};
  keys.forEach((item) => {
    if (data[item]) {
      resData[item] = data[item];
    }
  });
  return resData;
}

/**
 * 获取url后面的参数
 * @param str
 * @returns {{}}
 */
export function queryUrlParameter(str) {
  let obj = {}
  let reg = /([^?=&#]+)=([^?=&#]+)/g;
  str.replace(reg, function () {
    obj[arguments[1]] = arguments[2]
  })
  return obj
}

/**
 * 函数防抖
 * @param fn
 * @param wait
 * @param immediate
 * @returns {function(): void}
 */
export function debounce(fn, wait, immediate) {
  let timer;
  return function () {
    if (timer) clearTimeout(timer);
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait)
      if (callNow) {
        fn.apply(this, arguments)
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, wait);
    }
  }
}

/**
 * 函数节流
 * @param func
 * @param wait
 * @param type
 * @returns {function(): void}
 */
export function throttle(func, wait, type) {
  let previous, timeout;
  if (type === 1) {
    previous = 0;
  } else if (type === 2) {
    timeout;
  }
  return function () {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = Date.now();

      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args)
        }, wait)
      }
    }
  }
}

// 日期格式转化工具
export function dateFormater(formater, t) {
  let date = t ? new Date(t) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formater.replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD|dd/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
}

/**
 * 格式化时间
 * @param fmt
 * @param date
 * @returns {*}
 */
export function dateFormat(fmt, date) {
  date = date || new Date(); // 判断是否传参
  let ret;
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt);
    if (ret) {
      // fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      if (ret[1].length == 1) {
        fmt = fmt.replace(ret[1], opt[k]);
      } else {
        for (let i = opt[k].length; i < ret[1].length; i++) {
          opt[k] = '0' + opt[k];
        }
        fmt = fmt.replace(ret[1], opt[k]);
      }
    }
  }
  return fmt;
}

/**
 * 全屏显示页面
 */
export function toFullScreen() {
  let elem = document.body;
  elem.webkitRequestFullScreen
    ? elem.webkitRequestFullScreen()
    : elem.mozRequestFullScreen
    ? elem.mozRequestFullScreen()
    : elem.msRequestFullscreen
      ? elem.msRequestFullscreen()
      : elem.requestFullScreen
        ? elem.requestFullScreen()
        : alert('浏览器不支持全屏');
}

/**
 * 下划线转驼峰
 * @param name
 * @returns {string}
 */
export function toHump(name) {
  let resVal = '';

  // 判断名称中是否存在下划线
  if (name.search('_')) {
    let tempArr = name.split('_');

    tempArr.forEach((item, index) => {
      if (index) {
        item = item.toLowerCase();
        resVal = resVal + item.slice(0, 1).toUpperCase() + item.slice(1);
      } else {
        resVal = item.toLowerCase();
      }
    });
  } else {
    resVal = name.toLowerCase();
  }

  return resVal;
}