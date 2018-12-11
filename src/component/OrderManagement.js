import React, { Component } from 'react'
import { Table, Divider, Button, Input} from 'antd';

const Search = Input.Search;

const columns = [{
  title: 'Id',
  dataIndex: 'id',
  key: 'id',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Car Number',
  dataIndex: 'carNumber',
  key: 'carNumber',
}, {
  title: 'Parking/Fetching',
  dataIndex: 'ParkOrFetch',
  key: 'ParkOrFetch',
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
}, {
  title: 'Operation',
  dataIndex: 'operation',
  key: 'operation',
}];

const data = [{
  key: '1',
  id: "1",
  carNumber: '1',
  ParkOrFetch: 'Park',
  status: '',
  Operation: ''
 
}, {
  key: '2',
  id: "2",
  carNumber: '2',
  ParkOrFetch: 'Park',
  status: '',
  Operation: ''

}, {
  key: '3',
  id: "3",
  carNumber: '3',
  ParkOrFetch: 'Fetch',
  status: '',
  Operation: ''

}];


 

export default class OrderManagementPage extends Component {
  render(){ 
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
    <Table columns={columns} dataSource={data} />
    </div>
    )
  }
}
