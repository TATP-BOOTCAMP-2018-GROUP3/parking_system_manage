import React, { Component } from 'react'
import { Table, Divider, Button, Input} from 'antd';

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
  title: 'Phone Number',
  dataIndex: 'phoneNumb',
  key: 'phoneNumb',
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
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

const data = [{
  key: '1',
  id: "1",
  name: 'John Brown',
  phoneNumb: "11111111",
  status:'working'
 
}, {
  key: '2',
  id: '2',
  name: 'Jim Green',
  phoneNumb: "22222222",
  status:'off'

}, {
  key: '3',
  id: '3',
  name: 'Joe Black',
  phoneNumb: "3333333",
  status:'working'
}];


 

export default class ParkingBoyManagementPage extends Component {
  render(){ 
    return ( 
    <div>
      <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
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
    <Table columns={columns} dataSource={data} />
    </div>
    )
  }
}
