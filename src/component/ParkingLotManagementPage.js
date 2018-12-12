import React, { Component } from 'react'
import { Table, Divider, Button, Input, Popconfirm } from 'antd';
import ParkingLotsResource from '../resources/ParkingLotsResource';

const Search = Input.Search;

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Name',
  dataIndex: 'parkingLotName',
  key: 'parkingLotName',
}, {
  title: 'Capacity',
  dataIndex: 'capacity',
  key: 'capacity',
}, {
  title: 'Available Position',
  dataIndex: 'availablePositionCount',
  key: 'availablePositionCount',
},{
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Edit</a>
      <Divider type="vertical" />
      <Popconfirm title="Confirm to delete?" onConfirm={() => {
        const data = this.state.data
        this.setState({
          data: data.filter(item => item.key !== record.key)
        })
      }}>
        <a href="javascript:;">Delete</a>
      </Popconfirm>
</span>
  ),
}];

export default class ParkingLotManagementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
}

componentDidMount() {
  ParkingLotsResource.getAll()
  .then(result => result.json())
  .then(result => {
      console.log(result)
      this.setState({ data: result })
  })      
}
  
  render() {
    return (
      <div>
        <Button onClick={this.handleAdd} type="primary" style={{ marginRight: 16 }}>
          Add Parking Lot
        </Button>
        <Search
            placeholder="Search parking lot"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        <Table columns={columns} dataSource={this.state.data}/>
      </div>
    )
  }
}
