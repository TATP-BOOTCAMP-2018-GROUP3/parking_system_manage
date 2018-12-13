import React, { Component } from 'react';
import { Button, Form, Input, message } from 'antd';
import EmployeeResource from '../resources/EmployeeResource';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};

class EmployeeForm extends Component {

  componentDidMount() {
    this.props.form.validateFields();
  }

  responseMessage = (text,type) => {
    if (type === 'info'){
      message.info(text);
    }else if (type === 'error'){
      message.error(text);
    }
  };

  refresh = () => {
    EmployeeResource.getAll()
    .then(result => result.json())
    .then(result => {
      this.props.refeshAllEmployees(result);
    })
  }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) { 
            this.props.onClickCreate(values.account_name, values.email, values.phoneNumb)
            .then(result =>{
              if(result.status === 201){
                this.responseMessage('Employee created successfully.', 'info')
                this.refresh()
              }else {         
              this.responseMessage('Employee account already exist. Create failed.', 'error')
              }
            })
          }
        });
    }

  render() {

    const {getFieldDecorator} = this.props.form;

    return (
    
        <Form onSubmit={this.handleSubmit}>
        Add Employee
        
        <FormItem
          {...formItemLayout}
          label="Employee Account Name"
          hasFeedback
          required
        >
        {getFieldDecorator('account_name', {
            rules: [{ required: true, message: 'Please input account name!' }],
          })(
            <Input placeholder="Maximum 64 characters" id="error" />
            )}
        </FormItem>
    
        <FormItem
          {...formItemLayout}
          label="Employee Email"
          hasFeedback
          required
        >
        {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input employee email!' }],
          })(
            <Input placeholder="Maximum 64 characters" id="error" />
            )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Employee Phone Number"
          hasFeedback
          required
        >
        {getFieldDecorator('phoneNumb', {
            rules: [{ required: true, message: 'Please input phone number!' }],
          })(
            <Input placeholder="" id="error" />
            )}
        </FormItem>

        <Button htmlType="submit" type="primary" style={{ marginBottom: 50 }}>
            Create
        </Button>
        <hr style={{
          height: '12px',
          border: '0',
          'box-shadow': 'inset 0 12px 12px -12px rgba(0, 0, 0, 0.5)'
        }}/>
      </Form>
    )
  }
}

const AddEmployeeForm = Form.create()(EmployeeForm);
export default AddEmployeeForm