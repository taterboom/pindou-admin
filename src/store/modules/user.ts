import {Reducer} from 'redux'
import {take, call, select} from 'redux-saga/effects'
import accountApi from '../../api/account';
import { UserInfo } from '../../entity';
import { message } from 'antd';

const MODULE_KEY = 'account'

enum ActionType {
  Login = 'account/Login',
  LoginSuccss = 'account/LoginSuccess',
}

interface Account {
  userInfo: UserInfo | null,
  token: string | null,
}

const preloadState: Account = {
  token: localStorage.getItem('token'),
  userInfo: null,
}

const reducer: Reducer = (state: Account = {userInfo: null, token: preloadState.token}, action) => {
  switch(action.type) {
    case ActionType.LoginSuccss:
      state = {
        userInfo: action.payload.userInfo,
        token: action.payload.token,
      };
      return state;
    default: return state;
  }
}

const actions = {
  login(payload: UserInfo) {
    return {
      type: ActionType.Login,
      payload,
    }
  }
}

const selectors = {
  isLogin: (state: any): boolean => state[MODULE_KEY].token !== null,
  token: (state: any): boolean => state[MODULE_KEY].token,
}

function* getUserInfo() {
  yield take();
  const token = yield select(selectors.token);
  if (token) {
    yield call(accountApi.getUserInfoByToken, token);
  } else {
    message.error('尚未登录');
  }
}

function* saga() {
  // yield fork(getUserInfo);
}

export {
  reducer,
  selectors,
  actions,
  saga,
  MODULE_KEY,
  preloadState,
}