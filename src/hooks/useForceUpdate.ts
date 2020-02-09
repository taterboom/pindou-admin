import {useState, useCallback} from 'react';

const useForceUpdate = () => {
  const forceUpdate = useState(0)[1];
  return useCallback(() => forceUpdate(x => x + 1), [forceUpdate]);
}

export default useForceUpdate;