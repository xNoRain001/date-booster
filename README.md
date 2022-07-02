## 下载

### npm

```
npm i date-booster
```

### src

```html
<script src="../dist/date-booster.js"></script>
```

## 使用

```javascript
// import DateBooster from 'date-booster'

const dateBooster = new DateBooster()
```

## API

### foldDate

```javascript
/*
 * 将属于同一时间范围的数据折叠到一起。
 *
 * @param {Array} data - 待处理的数据，数组的每一项是对象，对象中通过 date 属性标识时间
 * @param {string} [rule=day] - 折叠方式，可选值有 hour | day | month | year
 * @param {boolean} [descending=true] - 时间降序排列
 * @return {array} 处理后的数据
 */

const data = [
  {
    number: 1,
    date: new Date('2022-06-01T09:00')
  },
  {
    number: 2,
    date: new Date('2022-06-02T12:00'),
  },
  {
    number: 3,
    date: new Date('2022-06-01T08:00')
  },
  {
    number: 4,
    date: new Date('2022-06-03T06:00'),
  },
  {
    number: 5,
    date: new Date('2022-06-02T07:00'),
  },
  {
    number: 6,
    date: new Date('2022-06-02T07:10')
  }
]

dateBooster.foldDate(data, 'day')
// output
[
  [
    {
      number: 4,
      date: Fri Jun 03 2022 06:00:00 GMT+0800 (中国标准时间) {}
    }
  ],
  [
    {
      number: 5,
      date: Thu Jun 02 2022 07:00:00 GMT+0800 (中国标准时间) {}
    },
    {
      number: 6,
      date: Thu Jun 02 2022 07:10:00 GMT+0800 (中国标准时间) {}
    },
    {
      number: 2,
      date: Thu Jun 02 2022 12:00:00 GMT+0800 (中国标准时间) {}
    }
  ],
  [
    {
      number: 3,
      date: Wed Jun 01 2022 08:00:00 GMT+0800 (中国标准时间) {}
    },
    {
      number: 1,
      date: Wed Jun 01 2022 09:00:00 GMT+0800 (中国标准时间) {}
    }
  ]
]
```

### getMonth

```javascript
/*
 * 获取当前日期的月份
 * 
 * @param {(Date|string)} data - 当前日期
 * @param {boolean} [shorthand=trye] - 是否简写
 * @return {string} 当前日期的月份
 */

dateBooster.getMonth('2022-06-29T12:00') // output: Jun
dateBooster.getMonth('2022-06-29T12:00', false) // output: June
```

### getWeek

```javascript
/*
 * 获取当前日期的星期
 * 
 * @param {(Date|string)} data - 当前日期
 * @param {boolean} [shorthand=true] - 是否简写
 * @return {string} 当前日期的星期
 */

dateBooster.getWeek('2022-06-29T12:00') // output: Wed
dateBooster.getWeek('2022-06-29T12:00', false) // output: Wednesday
```

### getTimeDiff

```javascript
/*
 * 计算两个日期间的时间差
 *
 * @param {(Date|string)} date1 - 开始时间
 * @param {(Date|string)} date2 - 结束时间
 * @param {string} format - 时间差值的单位，可选值有： s（秒） | m（分） | h（时） | d（天）
 * @return {number} 时间差值
 */

dateBooster.getTimeDiff('2022-06-30T12:00', '2022-06-30T13:45', 'm') // output: 105
dateBooster.getTimeDiff('2022-06-30T12:00', '2022-07-15T11:45', 'd') // output: 14
```

### countdown

```javascript
/*
 * 倒计时
 *
 * @param {HTMLElement} - 显示倒计时的元素
 * @param {(Date|string)} - 倒计时为0的时刻
 */

dateBooster.countdown(elm, '2022-06-30T15:11') // elm.innerText: 00:54:38
```