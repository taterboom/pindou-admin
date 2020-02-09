import React from 'react';
import { Drawer } from 'antd';

interface CommonDrawerPropsType {
  title: string,
  visible: boolean,
  onClose():void,
}

const CommonDrawer: React.SFC<CommonDrawerPropsType> = ({ title, visible, onClose, children }) => {
  return (
    <Drawer
      title={title}
      placement="right"
      width="400"
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      {children}
    </Drawer>
  )
}

export default CommonDrawer;