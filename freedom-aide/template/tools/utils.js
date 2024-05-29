exports.contentFile =`// @ts-nocheck
/**
   * 柯里化函数
   * @param fn 要柯里化的函数
   * @returns 返回一个接受剩余参数的函数
   * @example
   * const add = (a: number, b: number) => a + b;
   * const addCurry = curry(add);
   */
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

/**
 * 将日期字符串格式化为 "YYYY-MM-DD HH:mm:ss" 格式。
 * @param {String} dateString - 待格式化的日期字符串，格式为 "YYYY-MM-DDTHH:mm:ss.000Z"
 * @returns {String} 格式化后的日期字符串，格式为 "YYYY-MM-DD HH:mm:ss"
 */
function formatDateString(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());
  const hours = padNumber(date.getHours());
  const minutes = padNumber(date.getMinutes());
  const seconds = padNumber(date.getSeconds());

  return \`$\{year}-$\{month}-$\{day} $\{hours}:$\{minutes}:$\{seconds}\`;
}

/**
 * 在数字前补零，确保数字为两位数。
 * @param {number} n - 待补零的数字
 * @returns {String} 补零后的字符串
 */
function padNumber(n) {
  return String(n).padStart(2, '0');
}

/**
 * 减速缓动函数，根据时间参数返回缓动效果。
 * @param {number} t - 当前时间
 * @param {number} b - 起始值
 * @param {number} c - 变化量
 * @param {number} d - 持续时间
 * @returns {number} 返回当前时间对应的值
 */
function easeOutQuart(t, b, c, d) {
  t /= d;
  t--;
  return -c * (t * t * t * t - 1) + b;
}

/**
 * 防抖函数，确保函数在一定时间内不被连续调用。
 * @param {Function} fn - 要执行的函数
 * @param {number} [delay=500] - 触发延迟时间
 * @param {boolean} [immediate = false] - 首次是否立即执行
 * @returns {Function} 经过防抖处理后的函数
 */
function debounce(fn, delay = 500, immediate = false) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    if (immediate && !timer) {
      fn.apply(this, args);
    }

    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn.apply(this, args);
      }
    }, delay);
  };
}

/**
 * 节流函数，确保函数在一定时间内最多被调用一次。
 * @param {Function} fn - 要执行的函数
 * @param {number} [delay=500] - 触发间隔时间
 * @param {boolean} [immediate = false] - 首次是否立即执行
 * @returns {Function} 经过节流处理后的函数
 */
function throttle(fn, delay = 500, immediate = false) {
  let timer = null;
  let callNow = immediate;
  return function (...args) {
    if (callNow) {
      fn.apply(this, args);
      callNow = false;
    }
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}

/**
 * 计算倒计时，返回剩余时间的天、时、分、秒。
 * @param {String} - 目标时间的时间戳，格式为 "YYYY/MM/DD HH:MM:SS"
 * @returns {Object} - 包含天、时、分、秒的对象
 */
function countdown(targetTime) {
  // 将传入的时间戳字符串转换为时间戳
  var targetTimestamp = new Date(targetTime).getTime();

  // 获取当前时间
  var now = new Date().getTime();

  // 计算剩余时间（单位：毫秒）
  var distance = targetTimestamp - now;

  // 如果目标时间已经过去，则返回倒计时结束
  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // 计算剩余时间中的各个单位
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  hours = String(hours).padStart(2, '0');
  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');
  // 返回包含天、时、分、秒的对象
  return { d: days, h: hours, m: minutes, s: seconds };
}


export {
  formatDateString,
  easeOutQuart,
  debounce,
  throttle,
  countdown,
  padNumber,
  curry,
};
`