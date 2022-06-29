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
// import dateBooster from 'date-booster'

const dateBooster = new DateBooster()
```

## API

### foldDate

```javascript
/*
 * 将属于同一时间范围的数据折叠到一起。
 *
 * @param {array=[]} data 待处理的数据
 * @param {string='day'} rule 折叠方式，可选值有 hour | day | month | year
 * @param {boolean=true} descending 时间降序排列
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
 * @param {date} data
 * @param {boolean=true} shorthand 是否简写
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
 * @param {date} data
 * @param {boolean=true} shorthand 是否简写
 * @return {string} 当前日期的星期
 */

dateBooster.getWeek('2022-06-29T12:00') // output: Wed
dateBooster.getWeek('2022-06-29T12:00', false) // output: Wednesday
```
