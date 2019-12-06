import React from 'react';
import SystemHeader from '../components/SystemHader';
import { Layout } from 'antd';
import { useLocation } from 'react-router';

const Conatiner: React.FC = ({children}) => {
  const location = useLocation();
  console.log(location);
  return (
    <Layout>
      <SystemHeader />
      <Layout>
        <Layout.Sider>link</Layout.Sider>
        <Layout>
          <div className="title">{location.pathname}</div>
          <Layout.Content>{children}</Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Conatiner;