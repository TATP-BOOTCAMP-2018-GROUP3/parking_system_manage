import React, { Component } from 'react'
import { Table, Divider, Button, Input, Popconfirm} from 'antd';
import EmployeeResource from '../resources/EmployeeResource';
import EmployeeFormContainer from '../containers/EmployeeFormContainer';

const Search = Input.Search;


 

export default class EmployeeManagementPage extends Component {

  createColumn = () => {
    return[{
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
    title: 'Status',
    dataIndex: 'workingStatus',
    key: 'workingStatus',
  },{
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Edit</a>
        <Divider type="vertical" />
        {(record.workingStatus == "On Duty") ? (<Popconfirm
                                    title="Confirm to close?"
                                    onConfirm={() => {
                                        this.forzenOrOnDuty(record)
                                    }}
                                >
                                    <a>Freeze</a>
                                </Popconfirm>)
                                : (
                                    <a onClick={() => {
                                        this.forzenOrOnDuty(record)
                                    }}>On Duty</a>
                                )
}
      </span>
    ),
  }];
  }

  forzenOrOnDuty(record) {
    let newState =""
    if (record.workingStatus =="freeze"){
      newState ="On Duty"
    }
    else{
      newState ="freeze"
    }
    
                EmployeeResource.forzenOrUnforzen(record,newState)
                .then(result => {
                    alert("Success")
                    EmployeeResource.getAll()
                      .then(result => result.json())
                      .then(result => {
                        this.props.refeshAllEmployees(result);
                      })
                  
                })
              }
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
      { this.props.onShowEmployeeForm ? <EmployeeFormContainer onClickCreate={this.createEmployee} /> : null }      
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
    <Table columns={this.createColumn()} dataSource={this.props.employees} />
    </div>
    )
  }
}
