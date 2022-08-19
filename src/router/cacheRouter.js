let cacheRoute = [];
import {children as routes} from './modules/index';

const filterKeepAlive = (routerList = [], cacheRoute = []) => {
  routerList.forEach(item => {
    item?.meta?.keepAlive && item.name && cacheRoute.push(item.name);
    item?.children?.length && filterKeepAlive(item.children, cacheRoute);
  });
};
filterKeepAlive(routes, cacheRoute);

export default cacheRoute;