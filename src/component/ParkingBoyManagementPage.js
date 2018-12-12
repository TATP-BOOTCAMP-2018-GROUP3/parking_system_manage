import React, { Component } from 'react'
import { Table, Divider, Button, Input, Popconfirm } from 'antd';
import ParkingClerksResource from '../resources/ParkingClerksResource';
import ParkingLotsResource from '../resources/ParkingLotsResource';
import Transfers from "./Transfers";
import {Transfer} from 'antd';

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
      <Popconfirm title="Sure to delete?" onConfirm={() => {
        const data = this.state.data
        this.setState({
          data: data.filter(item => item.key !== record.key)
        })
      }}>
        <a onClick={() => {
                            this.generateTransfer(record)
                          }}>Delete</a>
      </Popconfirm>
    </span>
  ),
}];



export default class ParkingBoyManagementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parkingClerks: [],
      parkingLots: [],
      parkinglotData: [],
      targetKeys: []
    };
  }

  componentDidMount() {
    ParkingClerksResource.getAll()
      .then(res => res.json())
      .then(res => {
        this.setState({ ...this.state, parkingClerks: res })
      }); 
    ParkingLotsResource.getAll()
    .then(res => res.json())
    .then(res => {
      this.setState({ ...this.state, parkingLots: res })
    })
  }

  handleChange = (nextTargetKeys, direction, moveKeys, id) => {
    if (direction == 'right'){
      moveKeys.forEach(key => {
        let updatedParkingLot = this.state.parkingLots.find(lot => lot.id === key);
        ParkingLotsResource.assignClerk(updatedParkingLot, this.state.editingEmployeeId)
        .then(res => res.json())
        .then(res => {
          ParkingClerksResource.getAll()
            .then(res => res.json())
            .then(res => {
              this.setState({ ...this.state, parkingClerks: res, targetKeys: nextTargetKeys})
            }); 
        })
      });
    } else {
      moveKeys.forEach(key => {
        let updatedParkingLot = this.state.parkingLots.find(lot => lot.id === key);
        ParkingLotsResource.unassignClerk({...updatedParkingLot, employeeId: null})
        .then(res => res.json())
        .then(res => {
          ParkingClerksResource.getAll()
            .then(res => res.json())
            .then(res => {
              this.setState({ ...this.state, parkingClerks: res, targetKeys: nextTargetKeys})
            }); 
        })
      });
    }
  }

  generateTransfer = (employee) => {
    this.state.editingEmployeeId = employee.id;

    this.state.ownedParkinglotData = this.state.parkingLots
                          .filter(lot=>((lot.employeeId === null) || lot.employeeId == employee.id))
                          .map(lot=> ({title: lot.parkingLotName, key: lot.id, description:'test', employeeId: lot.employeeId}));

    this.state.targetKeys = this.state.ownedParkinglotData
                      .filter(lot => (lot.employeeId == employee.id))
                      .map(lot=>lot.key);

    return (
        <Transfer
          style={{display:"flex",justifyContent:"center"}}
          dataSource={this.state.ownedParkinglotData}
          listStyle={{
              width: 250,
              height: 300,
            }}
          filterOption={this.filterOption}
          targetKeys={this.state.targetKeys}
          render={item => item.title}
          onChange={(nextTargetKeys, direction, moveKeys)=>this.handleChange(nextTargetKeys, direction, moveKeys, employee.id)}
        />)
  }
  

  render() {
    return (
      <div>
        <span>
          <div>
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </div>
        </span>
        <Table columns={columns} expandedRowRender={this.generateTransfer} dataSource={this.state.parkingClerks} />
      </div>
    )
  }
}
