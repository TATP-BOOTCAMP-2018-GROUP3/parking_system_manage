import React, { Component } from 'react';
import { Modal, Button } from 'antd';

export default class EmployeePasswordModel extends Component {
  state = { visible: true }

  handleOk = (e) => {
    this.props.showPasswordModel()
  }

  render() {
      const password = this.props.showPassword().initialPassword;

    return (
        <Modal
          title="Employee Created"
          visible={this.state.visible}
          onOk={this.handleOk}
       
         footer={[
            <Button key="ok" type="primary" onClick={this.handleOk}>
              Ok
            </Button>,
          ]}
          >
        <p>The account password is :{password}</p>
        <p>Please keep it properly.</p>
        </Modal>
    );
  }
}
