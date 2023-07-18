import { Outlet, useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';

import { Layout, Menu, Button, theme, MenuProps } from 'antd';
import { LOGIN_KEY } from 'helpers/settings';
import LocalStorageService from 'services/localStorage';
import { useQuery } from '@tanstack/react-query';
import { configInit } from 'services/config';
import Util from 'helpers/Util';

const { Header, Sider, Content } = Layout;

const menuToTree = (items: any[]) => {
  return Util.arrayToTree(items, 'null', 'parent_id', (item) => ({ key: item.id, label: item.description }))
}

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const {
    token: { colorBgLayout, colorBgContainer },
  } = theme.useToken();

  const localStorageData = LocalStorageService.getItem(LOGIN_KEY);

  const { isLoading, data } = useQuery({
    queryKey: ['app', localStorageData.user.id],
    queryFn: () => configInit(localStorageData.user.id)
  });

  const onMenuClick: MenuProps['onClick'] = (e) => {
    const menu = data.menus.find((item: any) => String(item.id) === String(e.key));
    if (menu) {
      // navigate(menu.url_path);
      navigate('screen/' + String(menu.screen_id));
    }
  };

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <Layout hasSider style={{ height: '100vh' }}>
      <Sider trigger={null} collapsedWidth={48} collapsible collapsed={collapsed} style={{ background: colorBgLayout }}>
        <div className="demo-logo-vertical" />
        <Menu
          // theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ background: colorBgLayout }}
          onClick={onMenuClick}
          items={menuToTree(data.menus)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgLayout, lineHeight: '48px', height: '48px' }} >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 50,
              height: 50,
            }}
          />
        </Header>
        <Content style={{ background: colorBgContainer }} >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;