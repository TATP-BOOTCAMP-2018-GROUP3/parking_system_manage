import React, { Component } from 'react'
import { Table, Tag, Select, Input } from 'antd';
import ParkingOrderResource from '../resources/ParkingOrderResource';
import ReturnOrderResource from '../resources/ReturnOrderResource';
import ParkingClerksResource from '../resources/ParkingClerksResource';

const Search = Input.Search;
const Option = Select.Option;

export default class OrderManagementPage extends Component {

  componentDidMount() {
    this.initailAllData();
  }

  initailAllData = () => {
    let orders = [];
    ParkingClerksResource.getAll()
    .then(result => result.json())
    .then(result => {
        let map = {};
        result.forEach(parkingClerks => {
            map[parkingClerks.employeeId] = parkingClerks.accountName;
        });
        this.props.getParkingClerkNameMapping(map);
        ParkingOrderResource.getAll()
        .then(res => res.json())
        .then(res => {
          orders = orders.concat(res.map((element) => ({
              id: element.id,
              carId: element.carId,
              type: 'Park',
              phoneNumber: element.phoneNumber,
              status: element.status,
              parkingLot: element.parkingLot,
              ownedByEmployeeId: element.ownedByEmployeeId
          })))
          ReturnOrderResource.getAll()
          .then(res => res.json())
          .then(res => {
            orders = orders.concat(res.map((element) => ({
                id: element.id,
                carId: element.carId,
                phoneNumber: element.phoneNumber,
                type: 'Return',
                status: element.status
            })))
            this.props.refreshAllOrders(orders);
          })
      })
    })
  }

  createColumns = () => {
    return [
            {
              title: 'Type',
              dataIndex: 'type',
              key: 'type',
            },
            {
              title: 'Id',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: 'Car ID',
              dataIndex: 'carId',
              key: 'carId',
            },
            {
              title: 'Phone Number',
              dataIndex: 'phoneNumber',
              key: 'phoneNumber',
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
              render: (text) => {
                switch(text){
                  case("Pending"):
                    return <Tag color="#f50">{text}</Tag>;
                  case("In Progress"):
                  return <Tag color="#2db7f5">{text}</Tag>;
                  case("Completed"):
                    return <Tag color="#87d068">{text}</Tag>;
                  default:
                    return <Tag color="geekblue">{text}</Tag>;
                }
              }
            },
            {
              title: 'Assigned To Employee',
              dataIndex: 'ownedByEmployeeId',
              key: 'ownedByEmployeeId',
              render: (text, record) => {
                let parkingClerkNameMapping = this.props.parkingClerkNameMapping;
                let optionArray = [];
                for(let key in parkingClerkNameMapping){
                  optionArray.push(<Option key={key} value={key}>{parkingClerkNameMapping[key]}</Option>);
                }

                if (record.type === 'Return') {
                  return <div>N / A</div>;
                } else if (text == '') {
                  return <div>N / A</div>;
                } else if (record.status === 'Completed' || record.status === 'In Progress') {
                  return <Select defaultValue={parkingClerkNameMapping[text]} style={{ width: 250 }} disabled >
                          {optionArray}
                          </Select>
                } 
                return <Select 
                        showSearch
                        style={{ width: 250 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        onChange={(value) => {this.assignClerks(value, record)}}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        {optionArray}
                      </Select>
              },
            }
          ]
  }

  assignClerks = (value, order) => {
    ParkingOrderResource.grab({id: order.id, carId: order.carId, phoneNumber: order.phoneNumber}, value)
    .then(res => this.initailAllData())
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
        <Table title={() => 'Orders'} columns={this.createColumns()} dataSource={this.props.orders} />
      </div>
    )
  }
}
