import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Layout, Alert } from 'antd';
import '../../css/LoginPage.css'
import AuthResource from '../../resources/AuthResource';

const FormItem = Form.Item;
const {
    Header,
    Content,
} = Layout;
  

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {error: undefined}
    }

    componentWillMount() {
        if (localStorage.getItem['AUTH'] !== undefined && 
            localStorage.getItem['ROLE'] !== 'CLERK') {
            this.props.history.push('/ParkingLotDashboard');
        } else {
            localStorage.clear();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                AuthResource.login({accountName: values.userName, password: values.password})
                .then(res => {
                    if (res.status === 400) {
                        throw new Error("Login fail! Please check your login information!");
                    } else if (res.status === 500) {
                        throw new Error("Service is currently unavailable.");
                    }
                    return res.json();
                })
                .then(res => {
                    let tokenPayload = JSON.parse(atob(res.token.split('.')[1]));
                    if (tokenPayload.role !== 'MANAGER' && tokenPayload !== 'ADMIN') {
                        throw new Error("Login fail! Please check your login information!");
                    }
                    localStorage.setItem('AUTH', res.token);
                    localStorage.setItem('ROLE', tokenPayload.role);
                    localStorage.setItem('ID', tokenPayload.id);
                    localStorage.setItem('USERNAME', tokenPayload.username);
                    this.props.history.push('/ParkingLotDashboard');
                })
                .catch(error => {
                    this.setState({error: error.message})
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout style={{ minHeight: '100vh' }}>
            <Header></Header>
            <Content style={{paddingLeft: '2em'}}>
            <img src="/images/parking_smart_logo.png" style={{paddingLeft: '1.5em', paddingBottom: '1em', width: '15%'}}/>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <h2 style={{textAlign: 'center'}}>Admin Console</h2>
                <FormItem>
                {getFieldDecorator('userName', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
                </FormItem>
                <FormItem>
                {/* <a className="login-form-forgot" href="">Forgot password</a> */}
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                </FormItem>
                {this.state.error === undefined ? null : 
                    <Alert
                        message="Error"
                        description={this.state.error}
                        type="error"
                        showIcon
                    />
                }
            </Form>
            </Content>
            </Layout>
        )
    }
}

LoginPage = Form.create()(LoginPage);
export default LoginPage;