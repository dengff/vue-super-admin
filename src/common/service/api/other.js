import createAxiosByInterceptors from '../index';
const request = createAxiosByInterceptors({
  // baseURL:'afasfasf' // 可以覆盖基础config
});
export default {
  GET_GEEKER_MENU_LIST: (params) => request.get('/geeker/menu/list',
    {
      params,
      loading: true,
      notify: true,
      headers:{
        'AdminUserKey-Info': `getCookie('AdminUserKey')`,
      },
    },
  ),
};