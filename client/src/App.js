import React from 'react';
import Main from './components/Main';
import './App.css';
import 'antd/dist/antd.css';

import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class App extends React.Component {

  render() {
    return (
      <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
      </Menu>
    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                Presets
              </span>
            }
          >
            <Menu.Item key="1">Preset 1</Menu.Item>
            <Menu.Item key="2">Preset 2</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Main />
        </Content>
      </Layout>
    </Layout>
  </Layout>
    );
  }
}

export default App;
