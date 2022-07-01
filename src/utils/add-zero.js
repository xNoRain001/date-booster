/*
 * 补齐前面空缺的0
 * 
 * @param {string|number} target 待处理的数字或字符串
 * @param {number} length 最终期望的长度
 * @return {string} 补齐空缺0的字符串
 */

const addZero = (target, length) => {
  if (typeof target === 'number') {
    target += ''
  }

  if (target.length < length) {
    for (let i = 0, l = length - target.length; i < l; i++) {
      target = `0${ target }`
    }
  }

  return target
}

export default addZero