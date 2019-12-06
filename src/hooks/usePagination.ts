import {useState, useMemo, useCallback} from 'react';
import { PaginationConfig } from 'antd/lib/table';

export type usePaginationReturn = [
  {pn: number, ps: number},
  (p: PaginationConfig) => void
]

function usePagination({pn = 1, ps = 10} = {}): usePaginationReturn {
  const [_pn, setPn] = useState(pn);
  const [_ps, setPs] = useState(ps);
  const pagination = useMemo(() => ({
    pn: _pn,
    ps: _ps,
  }), [_pn, _ps]);
  const setPagination = useCallback((_p: PaginationConfig) => {
    const {current, pageSize} = _p;
    setPn(current || 1);
    setPs(pageSize || 10);
  }, [])
  return [pagination, setPagination];
}

export default usePagination;