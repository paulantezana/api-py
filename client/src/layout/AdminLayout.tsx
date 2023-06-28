import { Outlet } from 'react-router-dom';

import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { LOGIN_KEY } from 'helpers/settings';
import LocalStorageService from 'services/localStorage';
import { useQuery } from '@tanstack/react-query';
import { configInit } from 'services/config';

const { Header, Sider, Content } = Layout;

const getToken = ()=> {
  const data = localStorage.getItem(LOGIN_KEY);
  if (data) {
    const parsedData = JSON.parse(data);
    return parsedData;
  }
  return null;
}

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgLayout, colorBgContainer },
  } = theme.useToken();

  const localStorageData = LocalStorageService.getItem(LOGIN_KEY);

  const appQuery = useQuery({
    queryKey: ['app', localStorageData.user.id],
    queryFn: ()=> configInit(localStorageData.user.id)
  });

  return (
    <Layout hasSider>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ background: colorBgLayout }}>
        <div className="demo-logo-vertical" />
        <Menu
          // theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ background: colorBgLayout }}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgLayout, lineHeight: '50px', height: '50px' }} >
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