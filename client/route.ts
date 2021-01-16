// 商城路由
const shopRoutes = [
  { path: '/shop/1/user', component: '@/components/shop/user' },
  { path: '/shop/2/product', component: '@/components/shop/product' },
  { path: '/shop/auth', component: '@/components/shop/product' },
];

// layout路由汇总，可配置多项
const layoutRoutes = [shopRoutes];

const layoutPaths = ['/shop'];
let newLayoutRoutes = [];
newLayoutRoutes = layoutRoutes.map((item, i) => {
  return {
    path: layoutPaths[i],
    component: '@/layouts/layout',
    routes: item,
  };
});

// 总路由
const routes = [
  { exact: true, path: '/', redirect: '/home' },
  { exact: true, path: '/home', component: '@/pages/home' },
  ...newLayoutRoutes,
];

export { routes };
