import React, {useState} from 'react';
import {useQuery} from 'react-query';
import API from '../../api/user';
import { Table, Input } from 'antd';
import usePagination from '../../hooks/usePagination';
import {UserInfo} from '../../entity';
import style from './index.module.scss';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

interface UserTableProps{
  onSelect?: (selectedRowKeys: any, selectedRows: any) => void,
  selectedRowKeys?: string[],
}

const UserTable: React.FC<UserTableProps> = ({onSelect, selectedRowKeys}) => {
  const [{pn, ps}, setPagination] = usePagination()
  const [searchContent, setSearchContent] = useState();
  const data2 = useQuery([API.getUserList.name, {pn, ps, ext: {searchContent}}], API.getUserList);
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      onSelect && onSelect(selectedRowKeys, selectedRows);
    },
    getCheckboxProps: (record: UserInfo) => ({
      disabled: record.name === 'root', // Column configuration not to be checked
      name: record.name,
    }),
    selectedRowKeys,
    selections: onSelect ? true : false,
  };
  return (
    <div>
      <div className={style['user-select__search-container']}>
        <Input.Search placeholder="id/name/email" enterButton onSearch={setSearchContent}/>
      </div>
      <Table
        dataSource={data2.data ? data2.data.list : []}
        columns={columns}
        pagination={{size: 'small', showQuickJumper: true, showSizeChanger: true}}
        onChange={setPagination}
        rowKey={record => record.id + ''}
        rowSelection={rowSelection}
      />
    </div>
  )
}

export default UserTable;