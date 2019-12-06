import ajax from '../utils/ajax';
import { UserInfo } from '../entity';

const prefix = '/users';

const ajaxUsers = (method: string, url: string, params?: any) => ajax(method, prefix + url, params);

export default {
  getUserById: ({id = ''}): Promise<UserInfo> => {
    return ajaxUsers('get', `/${id}`);
  },
  getUserList: (params: any): Promise<{list: UserInfo[]}> => {
    return ajaxUsers('post', '/list', params)
  }
}