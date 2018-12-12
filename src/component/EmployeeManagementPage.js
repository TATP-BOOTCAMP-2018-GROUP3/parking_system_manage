import React, { Component } from 'react'
import { Table, Divider, Button, Input} from 'antd';
import EmployeeResource from '../resources/EmployeeResource';
import EmployeeFormContainer from '../containers/EmployeeFormContainer';

const Search = Input.Search;

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Email',
  dataIndex: 'email',
  key: 'email',
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
      <a href="javascript:;">Delete</a>
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
    return (EmployeeResource.addEmployee(accountName, email, phoneNumb))
  }

  render(){ 
    return ( 
    <div>
      { this.props.onShowForm ? <EmployeeFormContainer onClickCreate={this.createEmployee} /> : null }      
      <Button onClick={this.props.toggleOnShowForm} type="primary" style={{ marginRight: 16, marginTop: 40 }}>
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
