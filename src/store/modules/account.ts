import {Reducer} from 'redux'
import {take, put, call, fork, select} from 'redux-saga/effects'
import accountApi from '../../api/account';
import { UserInfo } from '../../entity';
import { message } from 'antd';

const MODULE_KEY = 'account'

enum ActionType {
  Login = 'account/Login',
  LoginSuccss = 'account/LoginSuccess',
  Query = 'account/Query',
  QuerySuccess = 'account/QuerySuccess',
  ToLogin = 'account/ToLogin',
  ClearAccount = 'account/ClearAccount'
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
    case ActionType.QuerySuccess:
      return Object.assign(state, {userInfo: action.payload});
    case ActionType.ClearAccount:
      return Object.assign({}, preloadState);
    default: return state;
  }
}

const actions = {
  login(payload: UserInfo) {
    return {
      type: ActionType.Login,
      payload,
    }
  },
  queryCurrentUserInfo() {
    return {
      type: ActionType.Query
    }
  },
  toLogin() {
    return {
      type: ActionType.ToLogin
    }
  },
}

const selectors = {
  isLogin: (state: any): boolean => state[MODULE_KEY].token !== null,
  token: (state: any): boolean => state[MODULE_KEY].token,
  userInfo: (state: any): UserInfo => state[MODULE_KEY].userInfo,
}

function* login() {
  const {payload: params} = yield take(ActionType.Login);
  const {token, userInfo} = yield call(accountApi.login, params);
  localStorage.setItem('token', token);
  yield put({type: ActionType.LoginSuccss, payload: {token, userInfo}});
}

function* getUserInfo() {
  yield take(ActionType.Query);
  const token = yield select(selectors.token);
  if (token) {
    try {
      const {user} = yield call(accountApi.getUserInfoByToken, token);
      yield put({type: ActionType.QuerySuccess, payload: user});
    } catch {
      //
    }
  } else {
    message.error('尚未登录');
  }
}

function* toLogin () {
  yield take(ActionType.ToLogin);
  localStorage.clear();
  yield put({type: ActionType.ClearAccount});
  window.location.href = '/';
}

function* saga() {
  yield fork(login);
  yield fork(getUserInfo);
  yield fork(toLogin);
}

export {
  reducer,
  selectors,
  actions,
  saga,
  MODULE_KEY,
  preloadState,
}