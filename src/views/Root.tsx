import React, { useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { selectors, actions } from '../store/modules/account';

const RootRouter: React.FC<any> = ({children}) => {
  const isLogin = useSelector(selectors.isLogin);
  const dispacth = useDispatch();
  useEffect(() => {
    if (isLogin) {
      dispacth(actions.queryCurrentUserInfo());
    }
  }, [isLogin, dispacth]);
  return isLogin ? children : <Redirect to="/login"></Redirect>
}

export default RootRouter;
