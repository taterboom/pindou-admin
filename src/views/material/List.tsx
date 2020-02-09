import React, { useState, useCallback, useMemo } from 'react';
import {useQuery} from 'react-query';
import API from '../../api/material';
import { Table, Button, Modal, message } from 'antd';
import usePagination from '../../hooks/usePagination';
import Album from '../../components/Album';
import Page from '../../components/Page';
import MaterialFormDrawer from '../../components/material/MaterialFormDrawer';
import MaterialInfoDrawer from '../../components/material/MaterialInfoDrawer';
import { CommonFile } from '../../entity';

const List: React.FC = (props) => {
  const [{pn, ps}, setPagination] = usePagination()
  const {data, refetch} = useQuery([API.getMaterialList.name, {pn, ps}], API.getMaterialList);
  const [createDrawerVisible, setCreateDrawerVisible] = useState(false);
  const [infoDrawerVisible, setInfoDrawerVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [checkedId, setCheckedId] = useState();
  const onCloseCreateDrawer = useCallback(() => {
    setCreateDrawerVisible(false);
    refetch();
  }, [refetch]);
  // const data = useQuery([API.getUserById.name, {id: '1'}], API.getUserById);

  const closeDeleteModal = useCallback(() => {
    setDeleteModalVisible(false);
  }, []);

  const deleteMaterial = useCallback(() => {
    API.delete(checkedId).then(closeDeleteModal).then(() => {message.success('删除成功~')}).then(refetch);
  }, [checkedId, closeDeleteModal, refetch]);
  
  const columns = useMemo(() => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
      },
      {
        title: 'Title',
        dataIndex: 'title',
      },
      {
        title: 'Desc',
        dataIndex: 'description',
      },
      {
        title: '图片',
        dataIndex: 'files',
        render: (files: CommonFile[]) => <Album images={files}/>
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (_: any, record: any) => (
          <div>
            <Button type="link" onClick={() => { setCheckedId(record.id); setInfoDrawerVisible(true); }}>详情</Button>
            <Button type="link" onClick={() => { setCheckedId(record.id); setCreateDrawerVisible(true); }}>编辑</Button>
            <Button type="link" onClick={() => { setCheckedId(record.id); setDeleteModalVisible(true); }}>删除</Button>
          </div>
        )
      }
    ]
  }, []);

  return (
    <Page onCreate={() => {setCheckedId(undefined); setCreateDrawerVisible(true);}}>
      <Table
        dataSource={data ? data.list : []}
        columns={columns}
        pagination={{size: 'small', showQuickJumper: true, showSizeChanger: true}}
        onChange={setPagination}
        rowKey={record => record.id + ''}
      />
      <MaterialFormDrawer visible={createDrawerVisible} onClose={onCloseCreateDrawer} id={checkedId}/>
      <MaterialInfoDrawer id={checkedId + ''} visible={infoDrawerVisible} onClose={() => setInfoDrawerVisible(false)}/>
      <Modal
        visible={deleteModalVisible}
        onOk={deleteMaterial}
        onCancel={closeDeleteModal}
      >
        <p>确定删除id.{checkedId}?</p>
      </Modal>
    </Page>
  )
}

export default React.memo(List);