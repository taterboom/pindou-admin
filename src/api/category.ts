import ajax from '../utils/ajax';
import { Category } from '../entity';

const prefix = '/category';

const ajaxUsers = (method: string, url: string, params?: any) => ajax(method, prefix + url, params);

export default {
  getCategoryList: (params: any): Promise<{list: Category[]}> => {
    return ajaxUsers('post', '/list', params);
  }
}