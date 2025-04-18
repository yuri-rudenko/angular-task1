
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/task1/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/task1"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23590, hash: '302c8d5d8c5d1408aab9589e16da6d219cff8160806e074f84f7e001dca1a977', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17139, hash: '25c7378bcf5d79a7a20fa5440bdf66299f23303eac4030c27d830f77ef41c8b0', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 93180, hash: 'dd1339e245cc8d460a3382ad03156e8c3145e6da1591569d9e55d5e92f748a09', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-K6IDTOCX.css': {size: 7004, hash: 'BkJFPJNGeAU', text: () => import('./assets-chunks/styles-K6IDTOCX_css.mjs').then(m => m.default)}
  },
};
