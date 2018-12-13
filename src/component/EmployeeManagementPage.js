import React, { Component } from 'react'
import { Table, Divider, Button, Input, Popconfirm} from 'antd';
import EmployeeResource from '../resources/EmployeeResource';
import EmployeeFormContainer from '../containers/EmployeeFormContainer';
import EmployeePasswordModel from './EmployeePasswordModel';

const Search = Input.Search;

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Name',
  dataIndex: 'accountName',
  key: 'accountName',
}, {
  title: 'Phone Number',
  dataIndex: 'phoneNum',
  key: 'phoneNum',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Edit</a>
      <Divider type="vertical" />
      <Popconfirm title="Sure to delete?" onConfirm={() => {
        const data = this.state.data
        this.setState({
          data: data.filter(item => item.key !== record.key)
        })
      }}>
        <a href="javascript:;">Freeze</a>
      </Popconfirm>
    </span>
  ),
}];
 

export default class EmployeeManagementPage extends Component {

  componentDidMount() {
    EmployeeResource.getAll()
    .then(result => result.json())
    .then(result => {
      this.props.refeshAllEmployees(result);
    })
  }

  createEmployee = (accountName, email, phoneNumb) => {
    this.props.toggleOnShowEmployeeForm()
    return (
      EmployeeResource.addEmployee(accountName, email, phoneNumb)
      .then(result => {
        if (result.status === 201){
          return result.json()
        } else {
          return null
        }
      })
      .then(result => {
          this.props.returnPasswordAfterCreate(result);
          return result
      })
      )
  }
  
  onShowPasswordModel = () => {
    this.props.toggleOnShowPasswordModel()
  }

  returnPassword = () => {
    return this.props.employeePassword
  }

  render(){ 
    return ( 
    <div>
      { this.props.onShowEmployeeForm ? <EmployeeFormContainer onClickCreate={this.createEmployee} showPasswordModel={this.onShowPasswordModel}/> : null }      
      { this.props.onShowPasswordModel ? <EmployeePasswordModel showPassword={this.returnPassword} showPasswordModel={this.onShowPasswordModel}/> : null }
      <Button onClick={this.props.toggleOnShowEmployeeForm} type="primary" style={{ marginRight: 16, marginTop: 40 }}>
        Add Employee
      </Button>
      <span>
        <div>
          <Search
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        </div>
      </span>
    <Table columns={columns} dataSource={this.props.employees} />
    </div>
    )
  }
}
