import React, { useState, useCallback, useEffect } from 'react';
import Page from '../../components/Page';
import Album from '../../components/Album';
import usePagination from '../../hooks/usePagination';
import { Table, Modal, message } from 'antd';
import { useQuery } from 'react-query';
import API from '../../api/material';
import UpdateHot from '../../components/material/UpdateHot';
import { Material, CommonFile } from '../../entity';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: '图片',
    dataIndex: 'files',
    render: (files: CommonFile[]) => <Album images={files}/>
  }
];

const Hot: React.SFC = () => {
  const [hotKeys, setHotKeys] = useState<string[]>([]);
  const [modalVis, setModalVis] = useState(false);
  const [, setPagination] = usePagination();
  const {data, refetch} = useQuery(API.getHotList.name, API.getHotList);

  useEffect(() => {
    setHotKeys(data ? data.list.map((m: Material) => m.id + '') : []);
  }, [data]);

  const cancel = useCallback(() => {
    setModalVis(false);
  }, []);
  const confirm = useCallback(() => {
    API.changeHot(hotKeys).then(cancel).then(() => {
      refetch();
      message.success('更新成功~');
    });
  }, [cancel, hotKeys, refetch]);
  return (
    <Page onCreate={() => {setModalVis(true);}} createText="更新">
      <Table
        dataSource={data ? data.list : []}
        columns={columns}
        // pagination={{size: 'small', showQuickJumper: true, showSizeChanger: true}}
        onChange={setPagination}
        rowKey={(record: {id: string}) => record.id + ''}
      />
      <Modal
        title="更新热门素材"
        visible={modalVis}
        onOk={confirm}
        onCancel={cancel}
      >
        <UpdateHot onChange={k => setHotKeys(k)} value={hotKeys}></UpdateHot>
      </Modal>
    </Page>
  )
}

export default Hot;