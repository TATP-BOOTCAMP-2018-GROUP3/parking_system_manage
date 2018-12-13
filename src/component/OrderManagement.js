import React, { Component } from 'react'
import { Table, Tag, Select, Input, Form } from 'antd';
import ParkingOrderResource from '../resources/ParkingOrderResource';
import ReturnOrderResource from '../resources/ReturnOrderResource';
import ParkingClerksResource from '../resources/ParkingClerksResource';

const Search = Input.Search;
const Option = Select.Option;

const FormItem = Form.Item;

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }
  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                    <div
                      className="editable-cell-value-wrap"
                      style={{ paddingRight: 24 }}
                      onClick={this.toggleEdit}
                    >
                      {restProps.children}
                    </div>
                  )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

export default class OrderManagementPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: this.props.orders,
      searching: false
    }
  }

  componentWillMount() {
    if (localStorage.getItem('AUTH') === null || localStorage.getItem('AUTH') === '') {
        this.props.history.push('/login');
        return;
    }
  }

  componentDidMount() {
    if (localStorage.getItem('AUTH') === null || localStorage.getItem('AUTH') === '') {
      this.props.history.push('/login');
      return;
    }
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

  resetSearch = () => {
    this.setState(
      {
        orders: this.props.orders,
        searching: false
      }
    )
  }

  searchOrder = (value) => {
    let tempOrder = this.props.orders.map((order) => {
      return {
        carId: order.carId,
        type: order.type,
        id: order.id,
        status: order.status,
        phoneNumber: order.phoneNumber,
        searchString: order.carId + "|" + order.type + "|" + order.id + "|" + order.status + "|" + order.phoneNumber + "|"
      }
    })
    this.setState({
      orders: tempOrder.filter((order) => (order.searchString.indexOf(value) !== -1)),
      searching: true
    },
    )
  }


  render() {

    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.createColumns().map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <div>
        <span>
          <div>
          <Search
            placeholder="Search order"
            onSearch={(value) => { this.searchOrder(value) }}
            style={{ width: 200 }}
          />
          </div>
        </span>
        <Table 
          title={() => 'Orders'} 
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={(this.state.searching) ? this.state.orders : this.props.orders}
          columns={columns}
        />
      </div>
    )
  }
}
