import React, { Component } from 'react'
import { Table, Divider, Button, Input, Popconfirm } from 'antd';
import ParkingLotsResource from '../resources/ParkingLotsResource';
import ParkingLotFormContainer from '../containers/ParkingLotFormContainer';

const Search = Input.Search;


export default class ParkingLotManagementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parkingLots: this.props.parkingLots
    }
  }

  componentDidMount() {
    ParkingLotsResource.getAll()
      .then(result => result.json())
      .then(result => {
        this.props.refeshAllParkingLots(result);
      })
  }

  createColumn = () => {
    return [
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
                  <Popconfirm title="Confirm to close?" onConfirm={() => {
                    ParkingLotsResource.closeLot(record.id)
                    .then(result => {
                      if (result.status === 200){
                        alert("Deleted")
                        ParkingLotsResource.getAll()
                          .then(result => result.json())
                          .then(result => {
                            this.props.refeshAllParkingLots(result);
                          })
                      }
                    })
                  }}>
                    <a href="javascript:;">Close</a>
                  </Popconfirm>
                </span>
              ),
            }
          ];
        }
  
  createParkingLot = (name, capacity) => {
    return (ParkingLotsResource.addLot(name, capacity))
  }

  render() {
    return (
      <div>
        {this.props.onShowForm ? <ParkingLotFormContainer onClickCreate={this.createParkingLot} /> : null}

        <Button onClick={this.props.toggleOnShowForm} type="primary" style={{ marginRight: 16, marginTop: 40 }}>
          Add Parking Lot
          </Button>
        <Search
          placeholder="Search parking lot"
          onSearch={
            (value) => {
              this.setState({
                parkingLots: this.props.parkingLots.filter((lot) => {
                  return (lot.parkingLotName.indexOf(value) != -1)
                })
              })
            }
          }
          style={{ width: 200 }}
        />
        <Table columns={this.createColumn()} dataSource={this.state.parkingLots} />
      </div>
    )
  }
}
