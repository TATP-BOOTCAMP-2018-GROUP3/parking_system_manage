import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Form, Icon, Input, Button, Layout, Row, Col  } from 'antd';
import '../../css/LoginPage.css'
import AuthResource from '../../resources/AuthResource';

const FormItem = Form.Item;
const {
    Header, Footer, Sider, Content,
} = Layout;
  

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                AuthResource.login({accountName: values.userName, password: values.password})
                .then(res => {
                    if (!(res.status === 200)) {
                        throw new Error(res.status)
                    }
                    return res.json();
                })
                .then(res => {
                    let tokenPayload = JSON.parse(atob(res.token.split('.')[1]));
                    localStorage.setItem('AUTH', res.token);
                    localStorage.setItem('ROLE', tokenPayload.role);
                    localStorage.setItem('ID', tokenPayload.id);
                    localStorage.setItem('USERNAME', tokenPayload.username);
                    this.props.history.push('/');
                })
                .catch(error => {
                    if (error.message === '400') {
                        console.log('login fail!');
                    } else if (error.message === '500') {
                        console.log('server unavailable');
                    }
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout style={{ minHeight: '100vh' }}>
            <Content style={{paddingLeft: '2em', paddingTop: '5em'}}>
            <Form onSubmit={this.handleSubmit} className="login-form">
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
            </Form>
            </Content>
            </Layout>
        )
    }
}

LoginPage = Form.create()(LoginPage);
export default LoginPage;