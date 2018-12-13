import React, { Component } from 'react';
import { Button, Form, Input, message } from 'antd';
import ParkingLotsResource from '../resources/ParkingLotsResource';

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

class ParkingLotForm extends Component {

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
    ParkingLotsResource.getAll()
    .then(result => result.json())
    .then(result => {
      this.props.refeshAllParkingLots(result);
    })
  }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) { 
            this.props.onClickCreate(values.parkingLotName, values.capacity)
            .then(result =>{
              if(result.status === 201){
                this.responseMessage('Parking lot created successfully.', 'info')
                this.refresh()
              }else {         
              this.responseMessage('Parking lot already exist. Create failed.', 'error')
              }
            })
            this.props.afterCreate()
          }
        });
    }

  render() {

    const {getFieldDecorator} = this.props.form;

    return (
    
        <Form onSubmit={this.handleSubmit}>
        Add Parking Lot
        <FormItem
          {...formItemLayout}
          label="Parking Lot Name"
          hasFeedback
          required
        >
        {getFieldDecorator('parkingLotName', {
            rules: [{ required: true, message: 'Please input parking lot name!' }],
          })(
            <Input placeholder="maximum 64 characters" id="error" />
          )}

        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Parking Lot Capacity"
          hasFeedback
          required
        >
        {getFieldDecorator('capacity', {
            rules: [{ required: true, message: 'Please input parking lot capacity!' }],
          })(
            <Input placeholder="integer" id="error" />
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

const AddParkingLotForm = Form.create()(ParkingLotForm);
export default AddParkingLotForm