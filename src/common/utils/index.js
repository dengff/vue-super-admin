/**
 * 它返回目标的类型
 * @param target - 要检查的目标对象。
 * @returns 目标的类型。
 */
const checkType = function checkType(target) {
  const value = Object.prototype.toString.call(target);
  const result = value.match(/\[object (\S*)\]/)[1];
  return result.toLocaleLowerCase();
};

export {
  checkType,
};
