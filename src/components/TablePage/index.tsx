import React, { useEffect } from 'react';
import { Table } from 'antd';
import { PaginationConfig } from 'antd/lib/table';

interface Props {
  data: object[];
  total: number;
  onQuery: (pagination: PaginationConfig) => void;
  columns: object[];
}

const TablePage: React.FC<Props> = ({data, columns, onQuery}) => {
  useEffect(() => {
    onQuery({
      current: 1,
      pageSize: 10,
    })
  }, [])
  return (
    <div>
      <Table dataSource={data} columns={columns} onChange={onQuery} pagination={{size: 'small', showQuickJumper: true, showSizeChanger: true}}/>
    </div>
  )
}

export default TablePage;