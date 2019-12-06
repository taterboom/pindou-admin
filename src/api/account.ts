import ajax from '../utils/ajax';
import { UserInfo } from '../entity';

interface LoginInfo {
  token: string,
  userInfo: UserInfo,
}

const prefix = '/account';

const ajaxAccount = (method: string, url: string, params?: any) => ajax(method, prefix + url, params);

export default {
  login: (params: any): Promise<LoginInfo> => {
    return ajaxAccount('post', '/login', params);
  },
  getUserInfoByToken: (token: string): Promise<UserInfo> => {
    return ajax('post', '/users/getUserInfoByToken', {token});
  },
  getUserById: ({id = ''}): Promise<UserInfo> => {
    return ajaxAccount('get', `/users/${id}`);
  }
}