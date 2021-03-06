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
   * ?????????????????????0
   * 
   * @param {string|number} target ??????????????????????????????
   * @param {number} length ?????????????????????
   * @return {string} ????????????0????????????
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
     * ??????????????????????????????????????????????????????
     *
     * @param {array=[]} data ?????????????????????????????????????????????????????????????????? date ??????????????????
     * @param {string='day'} rule ??????????????????????????? hour | day | month | year
     * @param {boolean=true} descending ??????????????????
     * @return {array} ??????????????????
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
       * ???????????????????????????
       * 
       * @param {date} data
       * @param {boolean=true} shorthand ????????????
       * @return {string} ?????????????????????
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
       * ???????????????????????????
       * 
       * @param {date} data
       * @param {boolean=true} shorthand ????????????
       * @return {string} ?????????????????????
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
       * ?????????????????????????????????
       *
       * @param {string|Date} date1 ????????????
       * @param {string|Date} date2 ????????????
       * @param {string} format ????????????????????? s????????? | m????????? | h????????? | d?????????
       * @return {number} ????????????
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
       * ?????????
       *
       * @param {HTMLElement} ????????????????????????
       * @param {string|Date} ????????????0?????????
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
