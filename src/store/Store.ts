import { createStore, combineReducers, applyMiddleware, Store as _Store, Middleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import {fork, all} from 'redux-saga/effects';

type Module = {
  MODULE_KEY: string,
  reducer: object,
  saga: any,
  preloadState: any,
}

class Store implements _Store {
  static modules: Array<Module> = [];

  static use = (_module: Module) => {
    if (Store.modules.indexOf(_module) === -1) {
      Store.modules.push(_module);
    }
    // Store.prototype.useModule = Store.prototype.useModule.bind(Store.prototype, _module);
  }
   
  /**
   * 
   * @returns [reucer, rootSaga]
   */
  static useModule(): [any, any, any] {
    const modules = Store.modules;
    let reducer: {[key: string]: any} = {};
    let preloadState: {[key: string]: any} = {};
    modules.forEach((m: Module): any => {
      reducer[m.MODULE_KEY] = m.reducer;
      preloadState[m.MODULE_KEY] = m.preloadState;
    });

    const sagas = modules.map(m => m.saga);
    function* rootSaga() {
      yield all(sagas.map(saga => saga&&fork(saga)));
    }
    return [combineReducers(reducer), rootSaga, preloadState];
  }

  dispatch: any;
  getState: any;
  subscribe: any;
  replaceReducer: any;
  [Symbol.observable]: any;

  constructor(middlewares: Middleware[]) {

      const [reducer, rootSaga, preloadState] = Store.useModule();

      const sagaMiddleware = createSagaMiddleware(); 

      const store =  createStore(reducer, preloadState, applyMiddleware(sagaMiddleware, ...middlewares));

      sagaMiddleware.run(rootSaga);

      return store;
  }
 
}

export default Store;