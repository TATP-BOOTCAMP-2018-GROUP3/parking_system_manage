import React, { Component } from 'react'
import { Table, Divider, Button, Input } from 'antd';

const Search = Input.Search;

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Car Number',
  dataIndex: 'carId',
  key: 'carId',
}, {
  title: 'Parking/Fetching',
  dataIndex: 'parkOrFetch',
  key: 'parkOrFetch',
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
}, {
  title: 'Operation',
  dataIndex: 'operation',
  key: 'operation',
}];

export default class OrderManagementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {

    const hostname = "https://parking-system-backend.herokuapp.com";

    let resourceName = "/parkingorders";
    fetch(hostname + resourceName,
      {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          'Authorization': 'Bearer ' + localStorage.getItem('AUTH')
        })
      })
      .then(res => res.json())
      .then(res => {
        let fetchedParkResult = res.map((element) => {
          return {
            id: element.id,
            carId: element.carId,
            parkOrFetch: 'Park',
            status: element.status
          }
        })


        let resourceName2 = "/returnorders";
        fetch(hostname + resourceName2,
          {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
              'Authorization': 'Bearer ' + localStorage.getItem('AUTH')
            })
          })
          .then(res => res.json())
          .then(res => {
            let fetchedReturnResult = res.map((element) => {
              return {
                id: element.id,
                carId: element.carId,
                parkOrFetch: 'Fetch',
                status: element.status
              }
            })

            this.setState({ data: fetchedParkResult.concat(fetchedReturnResult) })

          });

      });

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
        <Table columns={columns} dataSource={this.state.data} />
      </div>
    )
  }
}
