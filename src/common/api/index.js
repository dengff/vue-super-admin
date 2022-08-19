import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e',
  // baseURL: '',
  headers: {
    'x-access-token': 'bqddxxwqmfncffacvbpkuxvwvqrhln',
    // 'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16048932421303221926625281","bc":"440100"}',
    // 'X-Host': 'mall.film-ticket.film.list',
  },
});

let config = {
  withCredentials: true,
};

instance.interceptors.request.use(function(config) {
    return config;

  }, function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  });
instance.interceptors.response.use(function(response) {
  const {data} = response;
  return data;
}, function(error) {
  return Promise.reject(error);
});

export default instance;