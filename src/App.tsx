import React from 'react';
import Main from './views';
import {Provider} from 'react-redux';
import store from './store';
import { ReactQueryConfigProvider } from 'react-query';

const queryConfig = {
  retry: 3,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  staleTime: 0,
  cacheTime: 5 * 60 * 1000,
  refetchAllOnWindowFocus: true,
  refetchInterval: false,
  suspense: false,
}

const App: React.FC = () => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Provider store={store}>
        <Main />
      </Provider>
    </ReactQueryConfigProvider>
  )
}

export default App;