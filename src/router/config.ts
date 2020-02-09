import UserList from '../views/user/List';
import MaterialList from '../views/material/List';
import RootRouter from '../views/Root';
import GridStroke from '../components/GridStroke';
import MaterialHot from '../views/material/Hot';

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
        component: UserList,
      },
      {
        path: '/material',
        redirect: '/material/list',
        exact: true,
      },
      {
        path: '/material/list',
        component: MaterialList,
      },
      {
        path: '/material/hot',
        component: MaterialHot,
      },
      {
        path: '/gridstroke',
        component: GridStroke,
      }
    ]
  }
]

export default config;