import {checkType} from '../common/utils';
import {AuthStore} from 'src/store/modules/auth';

export const auth = {
  install: (app) => {
    const authStore = AuthStore();
    app.directive('auth', {
      // 当被绑定的元素插入到 DOM 中时……
      mounted: function(el, binding) {
        // let type  = checkType(binding.value)
        let type = binding.value;
        switch (Object.prototype.toString.call(binding.value)) {
          case '[object Array]':
            type = 'Array';
            break;
          case '[object String]':
            type = 'String';
            break;
          case '[object Number]':
            type = 'Number';
            break;
          default:
            type = '';
            break;
        }
        if (type === '') {
          el.parentNode.removeChild(el);
          return;
        }
        const waitUse = binding.value.toString().split(',');
        let flag = waitUse.some(item => item === userInfo.authorityId);
        if (binding.modifiers.not) {
          flag = !flag;
        }
        if (!flag) {
          el.parentNode.removeChild(el);
        }
      },
    });
  },
};
