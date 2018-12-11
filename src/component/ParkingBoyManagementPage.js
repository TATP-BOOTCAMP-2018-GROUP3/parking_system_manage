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
  dataIndex: 'accountName',
  key: 'accountName',
}, {
  title: 'Phone Number',
  dataIndex: 'phoneNumb',
  key: 'phoneNumb',
}, {
  title: 'Status',
  dataIndex: 'parking_status',
  key: 'parking_status',
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

export default class ParkingBoyManagementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: []
    };
}

  render(){ 

    fetch("https://parking-system-backend.herokuapp.com/parkingclerks", { method: 'GET', mode: 'cors' })
    .then(res => res.json())
    .then(res => {
      this.setState({data: res})
    });

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
    <Table columns={columns} dataSource={this.state.data} />
    </div>
    )
  }
}
