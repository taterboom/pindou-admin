import Store from './Store'
import logger from 'redux-logger';
import * as user from './modules/user';
import * as account from './modules/account';
Store.use(user);

Store.use(account);

const store = new Store([logger]);

export default store;