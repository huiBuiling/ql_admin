import { defineConfig } from 'umi';
import { routes } from './route';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  dva: {
    skipModelValidate: true,
    immer: true,
    hmr: true,
  },
  proxy: {
    '/api': {
      'target': 'http://127.0.0.1:7001',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
});
