import ajax from '../utils/ajax';
import { Material } from '../entity';

const prefix = '/materials';

const ajaxUsers = (method: string, url: string, params?: any) => ajax(method, prefix + url, params);

export default {
  getMaterialById: ({id = ''}): Promise<{material: Material}> => {
    return ajaxUsers('get', `/${id}`);
  },
  getMaterialList: (params: any): Promise<{list: Material[]}> => {
    return ajaxUsers('post', '/list', params)
  },
  create: (params: any) => {
    return ajaxUsers('post', '', params);
  },
  getHotList: (params: any) => {
    return ajaxUsers('post', '/hot', params);
  },
  changeHot: (ids: string[]) => {
    return ajaxUsers('post', '/changeHot', {ids});
  },
  update: (id: number | string, material: Material) => {
    return ajaxUsers('patch', `/${id}`, material);
  },
  delete: (id: number | string) => {
    return ajaxUsers('delete', `/${id}`);
  }
}