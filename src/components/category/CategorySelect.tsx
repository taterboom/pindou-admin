import React from 'react';
import { Select } from 'antd';
import { useQuery } from 'react-query';
import API from '../../api/category';

interface Props{
  onChange?: () => void,
  value?: string,
}

const CategorySelect: React.SFC<Props> = ({onChange, value}, ref) => {
  const {data, isLoading} = useQuery(API.getCategoryList.name, API.getCategoryList);
  return (
    <Select ref={ref} style={{ width: 120 }} loading={isLoading} onChange={onChange} value={value}>
      {
        data && data.list.map(c => <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>)
      }
    </Select>
  )
}

export default React.forwardRef(CategorySelect);