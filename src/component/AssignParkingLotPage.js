import React, { Component } from 'react'
import { Table, Input } from 'antd';
import ParkingClerksResource from '../resources/ParkingClerksResource';
import ParkingLotsResource from '../resources/ParkingLotsResource';
import {Transfer} from 'antd';

const Search = Input.Search;

const columns = 
  [{
    title: 'Parking Clerk Id',
    dataIndex: 'id',
    key: 'id',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: 'Account Name',
    dataIndex: 'accountName',
    key: 'accountName',
  }, {
    title: 'Full Name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'Phone Number',
    dataIndex: 'phoneNum',
    key: 'phoneNum',
  }, {
    title: 'Status',
    dataIndex: 'parking_status',
    key: 'parking_status',
  }
];

export default class AssignParkingLotPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetKeysOfParkingLots: [],
      searching: false
    };
  }

  componentDidMount() {
    ParkingClerksResource.getAll()
      .then(res => res.json())
      .then(res => {
        this.props.refreshAllParkingClerks(res);
      }); 
    ParkingLotsResource.getAll()
      .then(res => res.json())
      .then(res => {
        this.props.refeshAllParkingLots(res);
      })
  }

  handleChange = (nextTargetKeys, direction, moveKeys, employeeId) => {
    if (direction == 'right'){
      moveKeys.forEach(key => {
        let updatedParkingLot = this.props.parkingLots.find(lot => lot.id === key);
        ParkingLotsResource.assignClerk(updatedParkingLot, employeeId)
        .then(res => {
          this.setState({targetKeysOfParkingLots: nextTargetKeys});
          ParkingLotsResource.getAll()
            .then(res => res.json())
            .then(res => {
              this.props.refeshAllParkingLots(res);
            })
        })
      });
    } else {
      moveKeys.forEach(key => {
        let updatedParkingLot = this.props.parkingLots.find(lot => lot.id === key);
        ParkingLotsResource.unassignClerk({...updatedParkingLot, employeeId: null})
        .then(res => {
          this.setState({targetKeysOfParkingLots: nextTargetKeys});
          ParkingLotsResource.getAll()
            .then(res => res.json())
            .then(res => {
              this.props.refeshAllParkingLots(res);
            })
        })
      });
    }
  }

  generateTransfer = (employee) => {
    let editingEmployeeId = employee.id;
    let usableParkinglotData = this.props.parkingLots
                              .filter(lot=>((lot.employeeId === null) || lot.employeeId == employee.id))
                              .map(lot=> ({title: lot.parkingLotName, key: lot.id, description:'test', employeeId: lot.employeeId}));
    let targetKeysOfParkingLots = usableParkinglotData
                      .filter(lot => (lot.employeeId == employee.id))
                      .map(lot=>lot.key);

    this.state.targetKeysOfParkingLots = targetKeysOfParkingLots;

    return (
      <Transfer
        style={{display:"flex",justifyContent:"center"}}
        dataSource={usableParkinglotData}
        listStyle={{
            width: 250,
            height: 300,
          }}
        showSearch
        filterOption={this.filterOption}
        targetKeys={this.state.targetKeysOfParkingLots}
        render={item => item.title}
        onChange={(nextTargetKeys, direction, moveKeys)=>this.handleChange(nextTargetKeys, direction, moveKeys, editingEmployeeId)}
      />)
  }
  

  render() {
    return (
      <div>
        <span>
          <div>
            <Search
              placeholder="input search text"
              onSearch={
                (value) => {
                  let tempClerks = this.props.parkingClerks.map((clerk) => {
                    return {
                      accountName: clerk.accountName,
                      employeeId: clerk.employeeId,
                      id: clerk.id,
                      name: clerk.name,
                      parking_status: clerk.parking_status,
                      phoneNum: clerk.phoneNum,
                      searchString: clerk.accountName + "|" + clerk.employeeId + "|" + clerk.id + "|" + clerk.name + "|" + clerk.parking_status + "|" + clerk.phoneNum + "|"
                    }
                  })
                  this.setState(
                    {
                      parkingClerks: 
                        tempClerks.filter((clerk) => {
                          return (clerk.searchString.toUpperCase().indexOf(value.toUpperCase()) !== -1)
                      }),
                      searching: true
                    }
                  )
                }
              }
              style={{ width: 200 }}
            />
          </div>
        </span>
        <Table 
          columns={columns} 
          expandedRowRender={this.generateTransfer} 
          dataSource={(this.state.searching) ? this.state.parkingClerks : this.props.parkingClerks} 
        />
      </div>
    )
  }
}
