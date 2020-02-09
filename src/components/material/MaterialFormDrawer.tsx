import React, { useCallback, useMemo } from 'react';
import { message } from 'antd';
import MaterialForm from './MaterialForm';
import API from '../../api/material';
import CommonDrawer from '../CommonDrawer';
import { useQuery } from 'react-query';
import Loading from '../Loading';

interface MaterialFormDrawerPropsType {
  visible: boolean,
  onClose():void,
  id?: string,
}

const MaterialFormDrawer: React.SFC<MaterialFormDrawerPropsType> = ({ visible, onClose, id }) => {
  const isUpdate = useMemo(() => id !== undefined, [id]);
  const { data } = useQuery(visible && id !== undefined && [API.getMaterialById.name, {id}], API.getMaterialById)
  const onSubmit = useCallback((params) => {
    if (id !== undefined) {
      return API.update(id, params).then(onClose).then(() => { message.success('编辑成功~'); });
    } else {
      return API.create(params).then(onClose).then(() => { message.success('创建成功~'); });
    }
  }, [onClose, id]);
  return (
    <CommonDrawer
      title="新建拼豆素材"
      onClose={onClose}
      visible={visible}
    >
      {
        (!isUpdate || data) ? <MaterialForm onSubmit={onSubmit} value={data ? data.material : undefined}/> : <Loading />
      }
      
    </CommonDrawer>
  )
}

export default MaterialFormDrawer;