import React, {useMemo, useCallback, useState} from 'react';
import API from '../../api/material';
import { Transfer } from 'antd';
import { Material } from '../../entity';
import { useQuery } from 'react-query';

interface UpdateHotProps {
  onChange: (keys: string[]) => void,
  value: string[],
}

const UpdateHot: React.SFC<UpdateHotProps> = ({onChange, value}) => {
  // const [targetKeys, setTargetKeys] = useState([]);
  const {data} = useQuery([API.getMaterialList.name, {pn: 1, ps: 999}], API.getMaterialList);
  const dataSource = useMemo(() => {
    if (!data) return [];
    return data.list.map((m: Material) => ({
      key: m.id + '',
      title: m.title,
      description: m.description,
    }));
  }, [data]);

  const filterOption = useCallback((inputValue, option) => option.description.indexOf(inputValue) > -1 || option.title.indexOf(inputValue) > -1, []);
  
  const handleChange = useCallback((targetKeys) => onChange(targetKeys), []);

  const handleSearch = useCallback((dir, value) => {
    console.log('search:', dir, value);
  }, []);
  return (
    <div>
      <Transfer
        dataSource={dataSource}
        showSearch
        filterOption={filterOption}
        targetKeys={value}
        onChange={handleChange}
        onSearch={handleSearch}
        render={item => item.title || ''}
      />
    </div>
  )
}

export default UpdateHot;