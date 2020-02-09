import React, {useMemo} from 'react';
import SystemHeader from '../components/SystemHader';
import { Layout, Menu, Icon } from 'antd';
import { useLocation } from 'react-router';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link } from 'react-router-dom';

const Conatiner: React.FC = ({children}) => {
  const location = useLocation();
  const openKey = useMemo(() => location.pathname.split('/')[1], [location]);
  return (
    <Layout style={{height: '100%'}}>
      <Layout.Sider>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={[openKey]}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu
            key="user"
            title={
              <span>
                <Icon type="user" />
                用户
              </span>
            }
          >
            <Menu.Item key="/user/list"><Link to="/user/list">列表</Link></Menu.Item>
          </SubMenu>
          <SubMenu
            key="material"
            title={
              <span>
                <Icon type="user" />
                素材
              </span>
            }
          >
            <Menu.Item key="/material/list"><Link to="/material/list">列表</Link></Menu.Item>
            <Menu.Item key="/material/hot"><Link to="/material/hot">热门</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </Layout.Sider>
      <Layout>
        <SystemHeader />
        <Layout.Content style={{overflow: 'auto'}}>{children}</Layout.Content>
      </Layout>
    </Layout>
  )
}

export default Conatiner;