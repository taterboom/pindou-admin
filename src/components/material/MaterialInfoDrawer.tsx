import React from 'react';
import { Form, Spin, Icon, Table } from 'antd';
import CommonDrawer from '../CommonDrawer';
import { useQuery } from 'react-query';
import API from '../../api/material';
import CommonImage, { TYPE } from '../CommonImage';
import Album from '../Album';
import usePagination from '../../hooks/usePagination';
import { UserInfo } from '../../entity';
import Loading from '../Loading';

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

interface UserInfoTableProps{
  dataSource: UserInfo[],
}

const UserInfoTable: React.SFC<UserInfoTableProps> = ({dataSource = []}) => {
  const [, setPagination] = usePagination()

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{size: 'small', showQuickJumper: true, showSizeChanger: true}}
      onChange={setPagination}
      rowKey={record => record.id + ''}
    />
  )
};

interface MaterialInfoDrawerPropsType {
  visible: boolean,
  onClose():void,
  id?: string,
}

const formLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 14 },
    sm: { span: 14 },
  },
}

const MaterialInfoDrawer: React.SFC<MaterialInfoDrawerPropsType> = ({ id, visible, onClose }) => {
  const {data} = useQuery(visible && id !== undefined && [API.getMaterialById.name, {id}], API.getMaterialById);
  return (
    <CommonDrawer
      title="拼豆素材详情"
      onClose={onClose}
      visible={visible}
    >
      {
        data && data.material
          ?
          <Form {...formLayout}>
            <Form.Item label="Title">
              {data.material.title}
            </Form.Item>
            <Form.Item label="Desc">
              {data.material.description}
            </Form.Item>
            <Form.Item label="Cover">
              <CommonImage src={data.material.cover.filePath}/>
            </Form.Item>
            <Form.Item label="BG">
              <CommonImage type={TYPE.color} color={data.material.background}/>
            </Form.Item>
            <Form.Item label="Files">
              <Album images={data.material.files}/>
            </Form.Item>
            <Form.Item label="Users">
              <UserInfoTable dataSource={data.material.users}/>
            </Form.Item>
            <Form.Item label="Category">
              {data.material.category.name}
            </Form.Item>
          </Form>
          :
          <Loading />
      }
    </CommonDrawer>
  )
}

export default MaterialInfoDrawer;