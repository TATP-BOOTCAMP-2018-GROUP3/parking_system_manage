import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Icon } from 'antd';
import { Route, Link, Switch, Redirect } from "react-router-dom"
import EmployeeManagementContainer from "./containers/EmployeeManagementContainer"
import ParkingLotDashboardContainer from './containers/ParkingLotDashboardContainer';
import ParkingLotManagementContainer from './containers/ParkingLotManagementContainer';
import AssignParkingLotContainer from './containers/AssignParkingLotContainer';
import OrderManagementContainer from './containers/OrderManagementContainer';
import LoginPage from './component/login/LoginPage';


const { Header, Sider, Content } = Layout;

class App extends Component {

  componentWillMount(){
    if (localStorage.getItem('AUTH') === null && localStorage.getItem('ROLE') === null) {
      this.props.history.push('/login');
      return;
    }
  }

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
          <Menu theme="dark" mode="inline">
            {localStorage.getItem('ROLE') === "ADMIN" ? (
              <Menu.Item key="1">
              <Icon type="team" />
              <span>Empolyees</span>
              <Link to="/EmployeeManagementPage">EmployeeManagementPage</Link>
              </Menu.Item>
            ): null}  
            <Menu.Item key="2">
              <Icon type="car" />
              <span>Parking Lots</span>
              <Link to="/ParkingLotManagementPage">ParkingLotManagementPage</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="user" />
              <span>Assign Parking Lot</span>
              <Link to="/AssignParkingLotPage">AssignParkingLotPage</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="dashboard" />
              <span>Parking Dashboard</span>
              <Link to="/ParkingLotDashboard">ParkingLotDashboard</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="ordered-list" />
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
              <Route path="/EmployeeManagementPage" component={EmployeeManagementContainer}></Route>
              <Route path="/ParkingLotManagementPage" component={ParkingLotManagementContainer}></Route>
              <Route path="/AssignParkingLotPage" component={AssignParkingLotContainer}></Route>
              <Route path="/ParkingLotDashboard" component={ParkingLotDashboardContainer}></Route>
              <Route path="/OrderManagement" component={OrderManagementContainer}></Route>
              <Route path="/" component={ParkingLotDashboardContainer}></Route>            
            </Switch>

          </Content>
        </Layout>
      </Layout>
    );
  }
}


export default App;
