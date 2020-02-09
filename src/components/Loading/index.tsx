import React from 'react';
import { Spin, Icon } from 'antd';

const Loading: React.SFC = () => {
  return (
    <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}/>
  )
}

export default Loading;