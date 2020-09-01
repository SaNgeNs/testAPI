import loadable from '@loadable/component';

const Main = loadable(() => import(/* webpackChunkName: "page_main" */'Pages/Main'));

const Routes = [
  {
    path: '/:s(s-.*?)?/:b(b-.*?)?/:st(st-.*?)?',
    exact: true,
    component: Main,
    name: 'main',
  },
];

export default Routes;
