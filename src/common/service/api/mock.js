import createAxiosByInterceptors from '../index';

const request = createAxiosByInterceptors({
  baseURL: 'https://mock.apifox.cn/m1/1225980-0-default', // 可以覆盖基础config
});

export default {
  POST_ENUM: (params) => request.post('/enum', {params}),
};