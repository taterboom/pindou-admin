import React from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import config, { RouteConfig } from './config';
import Login from '../views/Login';

function renderRoute(config: RouteConfig) {
  return (
    <Route path={config.path} exact={config.exact} key={config.path}>
      { 
        config.redirect
          ? <Redirect from={config.path} to={config.redirect || ''} exact={config.exact} key={config.path}></Redirect>
          : <config.component {...config}>
              {
                config.routes && (
                  <Switch>
                    {(config.routes || []).map(renderRoute)}
                  </Switch>
                )
              }
            </config.component>
      }
    </Route>
  )
}

function createRouter(Container: any) {
  const MainRouter: React.FC = () => (
    <BrowserRouter>
      <Switch>
        <Route path="/login"><Login></Login></Route>
        <Container>
          {config.map(renderRoute)}
        </Container> 
      </Switch>
    </BrowserRouter>
  )
  return MainRouter;
}

export default createRouter;
