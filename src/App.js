import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import EmployeeManagementPage from "./component/EmployeeManagementPage"
import ParkingLotManagementPage from "./component/ParkingLotManagementPage"
import ParkingBoyManagementPage from "./component/ParkingBoyManagementPage"
import ParkingLotDashboard from "./component/ParkingLotDashboard"
import OrderManagement from "./component/OrderManagement"
const { Header, Sider, Content } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <Layout id="components-layout-demo-custom-trigger" style={{ minHeight: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>Empolyees</span>
              <Link to="/EmployeeManagementPage">EmployeeManagementPage</Link>
            </Menu.Item>   
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>Parking Lots</span>
              <Link to="/ParkingLotManagementPage">ParkingLotManagementPage</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>Parking Clerks</span>
              <Link to="/ParkingBoyManagementPage">ParkingBoyManagementPage</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="video-camera" />
              <span>Parking Dashboard</span>
              <Link to="/ParkingLotDashboard">ParkingLotDashboard</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="video-camera" />
              <span>Order Management</span>
              <Link to="/OrderManagement">OrderManagement</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
          >
            <Switch>
            <Route path="/EmployeeManagementPage" component={EmployeeManagementPage}></Route>
            <Route path="/ParkingLotManagementPage" component={ParkingLotManagementPage}></Route>
            <Route path="/ParkingBoyManagementPage" component={ParkingBoyManagementPage}></Route>
            <Route path="/ParkingLotDashboard" component={ParkingLotDashboard}></Route>
            <Route path="/OrderManagement" component={OrderManagement}></Route>

            </Switch>

          </Content>
        </Layout>
      </Layout>
    );
  }
}


export default App;
