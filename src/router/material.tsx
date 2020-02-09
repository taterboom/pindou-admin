import {Switch, Route, useRouteMatch, match, Redirect} from 'react-router-dom';
import React from 'react';
import List from '../views/material/List';

export default () => {
  const {path} = useRouteMatch() as match;
  return (
    <Switch>
      <Route path={`${path}/list`}><List /></Route>
      <Redirect to={`${path}/list`}/>
    </Switch>
  )
}
