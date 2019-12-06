import React from 'react';
import {useQuery} from 'react-query';
import API from '../../api/user';
import { Table } from 'antd';
import usePagination from '../../hooks/usePagination';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

let i = 0
const List: React.FC = (props) => {
  const [{pn, ps}, setPagination] = usePagination()
  const data = useQuery([API.getUserById.name, {id: '1'}], API.getUserById);
  const data2 = useQuery([API.getUserList.name, {pn, ps}], API.getUserList);
  console.log(i++, data, data2)
  return (
    <div className="happy">
      <Table
        dataSource={data2.data ? data2.data.list : []}
        columns={columns}
        pagination={{size: 'small', showQuickJumper: true, showSizeChanger: true}}
        onChange={setPagination}
      />
    </div>
  )
}

export default React.memo(List);