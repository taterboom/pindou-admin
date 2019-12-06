import List from '../views/user/List';
import RootRouter from '../views/Root';

export interface RouteConfig {
  path: string,
  component?: any, // TODO: react 组件统称为什么
  redirect?: string,
  routes?: RouteConfig[],
  exact?: boolean,
}

export type RouteConfigs = RouteConfig[];

const config: RouteConfigs = [
  {
    path: '',
    component: RootRouter,
    routes: [
      {
        path: '/',
        exact: true,
        redirect: '/user',
      },
      {
        path: '/user',
        redirect: '/user/list',
        exact: true,
      },
      {
        path: '/user/list',
        component: List,
      }
    ]
  }
]

export default config;