import React from 'react';
import {Switch, Route} from 'react-router-dom'

type RouterType = {
  RouterComponent: React.ComponentType,
  prefix: string
}

class Router {
  _routers: RouterType[] = [];
  use = (RouterComponent: React.ComponentType | RouterType, prefix?: string, ) => {
    this._routers.push((prefix ? {RouterComponent, prefix} : RouterComponent) as RouterType);
  };

  getComponent(): React.ComponentType {
    return () => {
      return (
        <Switch>
          {
            this._routers.map(({RouterComponent, prefix}, index) => (
              <Route path={'' + prefix} component={RouterComponent} key={index}/>
            ))
          }
        </Switch>
      )
    }
  }

}

export default Router;