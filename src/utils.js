export const deepClone = (
  initalObj,
  finalObj
) => {
  const obj = finalObj || (initalObj.constructor === Array ? [] : {});
  Object.keys(initalObj).forEach((key) => {
    const value = initalObj[key];
    // 避免死循环导致内存溢出
    if (value === obj) return;
    // 如果被复制的值不为数组或对象，直接赋值
    if (value == null || typeof value !== 'object') {
      obj[key] = value
      return
    }
    // 如果类型不一样，直接赋值
    if (typeof obj[key] !== typeof value) {
      obj[key] = value
      return;
    }
    deepClone(initalObj[key], obj[key]);
  });
  return obj;
};
