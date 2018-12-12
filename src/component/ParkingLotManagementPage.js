import React, { Component } from 'react'
import { Table, Divider, Button, Input, Popconfirm } from 'antd';
import ParkingLotsResource from '../resources/ParkingLotsResource';
import ParkingLotFormContainer from '../containers/ParkingLotFormContainer';

const Search = Input.Search;

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'parkingLotName',
    key: 'parkingLotName',
  },
  {
    title: 'Capacity',
    dataIndex: 'capacity',
    key: 'capacity',
  },
  {
    title: 'Available Position',
    dataIndex: 'availablePositionCount',
    key: 'availablePositionCount',
  },
  {
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
  }
];

export default class ParkingLotManagementPage extends Component {

  componentDidMount() {
    ParkingLotsResource.getAll()
    .then(result => result.json())
    .then(result => {
      this.props.refeshAllParkingLots(result);
    })
  }

  createParkingLot = (name, capacity) => {
    return (ParkingLotsResource.addLot(name, capacity))
  }
    
    render() {
      return (
        <div>
          { this.props.onShowForm ? <ParkingLotFormContainer onClickCreate={this.createParkingLot} /> : null }
          
          <Button onClick={this.props.toggleOnShowForm} type="primary" style={{ marginRight: 16, marginTop: 40 }}>
            Add Parking Lot
          </Button>
          <Search
              placeholder="Search parking lot"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          <Table columns={columns} dataSource={this.props.parkingLots}/>
        </div>
      )
    }
}
