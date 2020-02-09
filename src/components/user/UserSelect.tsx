import React, {useCallback, useState, useRef} from 'react';
import { Button, Modal } from 'antd';
import UserTable from './UserTable';
import { UserInfo } from '../../entity';

interface UserSelectProps{
  onChange?: (selectedRows: any) => void,
  value?: UserInfo[],
}

const UserSelect: React.SFC<UserSelectProps> = ({onChange, value}, ref) => {
  const [modalVis, setModalVis] = useState(false);
  const openModal = useCallback(() => {
    setModalVis(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalVis(false);
  }, []);
  const onSelect = useCallback((selectedRowKeys: any, selectedRows: any) => {
    onChange && onChange(selectedRows);
  }, [onChange]);
  return (
    <div ref={ref}>
      <Button onClick={openModal} className="fufufuck">选择用户({value ? value.length : 0})</Button>
      <Modal
        title="选择用户"
        visible={modalVis}
        onCancel={closeModal}
        footer={null}
      >
        <UserTable onSelect={onSelect} selectedRowKeys={value ? value.map(user => user.id + '') : []}/>
      </Modal>
    </div>
  )
}

export default React.forwardRef(UserSelect);