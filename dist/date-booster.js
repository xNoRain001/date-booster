(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DateBooster = factory());
})(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var canBeFolded = function canBeFolded(prevGroupDate, date, rule) {
    if (rule === 'year') {
      return date.getYear() === prevGroupDate.getYear();
    } else if (rule === 'month') {
      return date.getYear() === prevGroupDate.getYear() && date.getMonth() === prevGroupDate.getMonth();
    } else if (rule === 'day') {
      return date.getYear() === prevGroupDate.getYear() && date.getMonth() === prevGroupDate.getMonth() && date.getDay() === prevGroupDate.getDay();
    } else if (rule === 'hour') {
      return date.getYear() === prevGroupDate.getYear() && date.getMonth() === prevGroupDate.getMonth() && date.getDay() === prevGroupDate.getDay() && date.getHours() === prevGroupDate.getHours();
    }
  };

  var monthMap = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
  };
  var monthMapWithShorthand = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
  };

  var weekMap = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  };
  var weekMapWithShorthand = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat'
  };

  var getTime = function getTime(date) {
    return new Date(date).getTime();
  };

  /*
   * 补齐前面空缺的0
   * 
   * @param {string|number} target 待处理的数字或字符串
   * @param {number} length 最终期望的长度
   * @return {string} 补齐空缺0的字符串
   */
  var addZero = function addZero(target, length) {
    if (typeof target === 'number') {
      target += '';
    }

    if (target.length < length) {
      for (var i = 0, l = length - target.length; i < l; i++) {
        target = "0".concat(target);
      }
    }

    return target;
  };

  var DateBooster = /*#__PURE__*/function () {
    function DateBooster(timeZone) {// ...

      _classCallCheck(this, DateBooster);
    }
    /*
     * 将属于同一时间范围的数据折叠到一起。
     *
     * @param {array=[]} data 待处理的数据，数组的每一项是对象，对象中通过 date 属性标识时间
     * @param {string='day'} rule 折叠方式，可选值有 hour | day | month | year
     * @param {boolean=true} descending 时间降序排列
     * @return {array} 处理后的数据
     */


    _createClass(DateBooster, [{
      key: "foldDate",
      value: function foldDate() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var rule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'day';
        var descending = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (descending) {
          data.sort(function (a, b) {
            return b.date.getTime() - a.date.getTime();
          });
        } else {
          data.sort(function (a, b) {
            return a.date.getTime() - b.date.getTime();
          });
        }

        var foldedDate = [];
        foldedDate.push([data[0]]);
        var prevGroupIndex = 0;

        for (var i = 1, l = data.length; i < l; i++) {
          var item = data[i];

          if (canBeFolded(foldedDate[prevGroupIndex][0].date, item.date, rule)) {
            foldedDate[prevGroupIndex].push(item);
          } else {
            prevGroupIndex++;
            foldedDate.push([item]);
          }
        }

        return foldedDate;
      }
      /*
       * 获取当前日期的月份
       * 
       * @param {date} data
       * @param {boolean=true} shorthand 是否简写
       * @return {string} 当前日期的月份
       */

    }, {
      key: "getMonth",
      value: function getMonth(date) {
        var shorthand = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (shorthand) {
          return monthMapWithShorthand[new Date(date).getMonth()];
        } else {
          return monthMap[new Date(date).getMonth()];
        }
      }
      /*
       * 获取当前日期的星期
       * 
       * @param {date} data
       * @param {boolean=true} shorthand 是否简写
       * @return {string} 当前日期的星期
       */

    }, {
      key: "getWeek",
      value: function getWeek(date) {
        var shorthand = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (shorthand) {
          return weekMapWithShorthand[new Date(date).getDay()];
        } else {
          return weekMap[new Date(date).getDay()];
        }
      }
      /*
       * 计算两个日期间的时间差
       *
       * @param {string|Date} date1 开始时间
       * @param {string|Date} date2 结束时间
       * @param {string} format 时间差值的单位 s（秒） | m（分） | h（时） | d（天）
       * @return {number} 时间差值
       */

    }, {
      key: "getTimeDiff",
      value: function getTimeDiff(date1, date2) {
        var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 's';
        format = format.toLowerCase();
        var diff = getTime(date2) - getTime(date1);

        if (format === 's') {
          return Math.floor(diff / 1000);
        } else if (format === 'm') {
          return Math.floor(diff / (1000 * 60));
        } else if (format === 'h') {
          return Math.floor(diff / (1000 * 60 * 60));
        } else if (format === 'd') {
          return Math.floor(diff / (1000 * 60 * 60 * 24));
        }
      }
      /*
       * 倒计时
       *
       * @param {HTMLElement} 显示倒计时的元素
       * @param {string|Date} 倒计时为0的时刻
       */

    }, {
      key: "countdown",
      value: function countdown(elm, date) {
        if (this.getTimeDiff(Date.now(), date) <= 0) {
          throw new Error('invalid date.');
        }

        var h = this.getTimeDiff(Date.now(), date, 'h');
        var m = this.getTimeDiff(Date.now(), date, 'm') - h * 60;
        var s = this.getTimeDiff(Date.now(), date, 's') - h * 60 * 60 - m * 60;
        elm.innerText = "".concat(addZero(h, 2), ":").concat(addZero(m, 2), ":").concat(addZero(s, 2));
        return function () {
          var timeout = setInterval(function () {
            if (s === 0) {
              if (m === 0) {
                clearInterval(timeout);
                return;
              } else {
                s = 60;
                m--;

                if (m === 0) {
                  if (h > 0) {
                    m = 59;
                    h--;
                  }
                }
              }
            }

            s -= 1;
            elm.innerText = "".concat(addZero(h, 2), ":").concat(addZero(m, 2), ":").concat(addZero(s, 2));
          }, 1000);
        }();
      }
    }]);

    return DateBooster;
  }();

  return DateBooster;

}));
