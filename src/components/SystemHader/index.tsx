import React from 'react';
import './index.css';
import {Layout} from 'antd';
import {useSelector} from 'react-redux'
import { selectors } from '../../store/modules/account';
import {Avatar} from 'antd';

const SystemHeader: React.FC = () => {
  const userInfo = useSelector(selectors.userInfo);

  return (
    <Layout.Header className="system-header__container">
      <div className="system-header__logo">PD system</div>
      <div className="system-header__nav"></div>
      <div className="system-header__user">
        <Avatar icon="user">
        </Avatar>
        <span>{userInfo ? userInfo.name : ''}</span>
      </div>
    </Layout.Header>
  )
}

export default SystemHeader;