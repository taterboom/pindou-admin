import axios from 'axios';
import { Modal } from 'antd';

axios.interceptors.request.use(config => {
  config.headers.authorization = localStorage.getItem('token')
  return config
}, rej => {
  Promise.reject(rej)
})

const prefix = '/api';

const ajax = (method, url, params, ...regs) => {
  return axios[method](prefix + url, params, ...regs).then((res) => {
    return res.data;
  })
}

const request = (method, url, params) => ajax(method, url, params).then(data => {
  if (data.status !== 200) {
    Modal.confirm({
      content: data.msg,
      onOk: () => {
        localStorage.clear();
        window.location.href = '/'
      }
    })
    const err = Object.assign(new Error(data.msg), data);
    throw err;
  } else {
    return data;
  }
});



export default request;