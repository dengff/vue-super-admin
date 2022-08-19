// export const mensList = [
//   {
//     menuName: '超级表格',
//     children: [...Array(6)].map((item, index) => {
//       return {
//         menuName: '超级表格',
//       };
//     }),
//   },
// ];
export const menuList = [...Array(8)].map((item, index) => {
  return {
    menuName: '超级表格',
    children: [...Array((index + 2) * 2)].map((_item, _index) => {
      return {
        menuName: '超级表格' + _index,
      };
    }),
  };
});