import React, { Component } from 'react'
import { Table, Button, Input, Popconfirm, Form } from 'antd';
import ParkingLotsResource from '../resources/ParkingLotsResource';
import ParkingLotFormContainer from '../containers/ParkingLotFormContainer';

const FormItem = Form.Item;
const Search = Input.Search;

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

export default class ParkingLotManagementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parkingLots: this.props.parkingLots,
      searching: false
    }
  }

  refreshAllParkingLots = () => {
    ParkingLotsResource.getAll()
      .then(result => result.json())
      .then(result => {
        this.props.refeshAllParkingLots(result);
      })
  }

  componentDidMount() {
    this.refreshAllParkingLots();
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
        editable: true,
      },
      {
        title: 'Capacity',
        dataIndex: 'capacity',
        key: 'capacity',
        editable: true,
      },
      {
        title: 'Available Position',
        dataIndex: 'availablePositionCount',
        key: 'availablePositionCount',
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) => {
          return (
            (record.status === 'open') ?  
          <Popconfirm title="Confirm to close?" onConfirm={() => {
                ParkingLotsResource.closeLot(record.id)
                  .then(result => {
                    if (result.status === 200) {
                      alert("Closed");
                      this.refreshAllParkingLots();
                    }
                  })
              }}>
              <a href="javascript:;">Close</a>
            </Popconfirm>
            :
            <Popconfirm title="Confirm to open?" onConfirm={() => {
              ParkingLotsResource.openLot(record.id)
                .then(result => {
                  if (result.status === 200) {
                    alert("Opened");
                    this.refreshAllParkingLots();
                  }
                })
            }}>
            <a href="javascript:;">Open</a>
          </Popconfirm>
        )},
      }
    ];
  }

  handleSave = (row) => {
    let updatedParkingLot = {id: row.id, parkingLotName: row.parkingLotName, capacity: Number(row.capacity)};
    if (Number(row.capacity) <= 0){
      alert("Invalid Capacity")
      return;
    }
    let allParkingLots = (this.state.searching) ? this.state.parkingLots : this.props.parkingLots
    let updatedParkingLots = allParkingLots.map(parkingLot => {
      if (parkingLot.id === updatedParkingLot.id) {
        return {...parkingLot, parkingLotName: updatedParkingLot.parkingLotName, capacity: updatedParkingLot.capacity};
      } else {
        return parkingLot;
      }
    })
    this.props.refeshAllParkingLots(updatedParkingLots);
    ParkingLotsResource.updateParkingLot(updatedParkingLot)
    .then(res => {
      this.refreshAllParkingLots();
    })
  }


  createParkingLot = (name, capacity) => {
    this.props.toggleOnShowParkingLotForm()
    return (ParkingLotsResource.addLot(name, capacity))
  }

  resetSearch = () => {
    this.setState(
      {
        parkingLots: this.props.parkingLots,
        searching: false
      }
    )
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.createColumn().map((col) => {
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
        {this.props.onShowParkingLotForm ? <ParkingLotFormContainer onClickCreate={this.createParkingLot} afterCreate={this.resetSearch} /> : null}

        <Button onClick={this.props.toggleOnShowParkingLotForm} type="primary" style={{ marginRight: 16, marginTop: 40 }}>
          Add Parking Lot
          </Button>
        <Search
          placeholder="Search parking lot"
          onSearch={
            (value) => {
              this.setState({
                parkingLots: this.props.parkingLots.filter((lot) => {
                  return (lot.parkingLotName.toUpperCase().indexOf(value.toUpperCase()) !== -1)
                }),
                searching: true
              },
              )
            }
          }
          style={{ width: 200 }}
        />
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={(this.state.searching) ? this.state.parkingLots : this.props.parkingLots} 
          columns={columns}
          style={{marginTop: 20}}
        />
      </div>
    )
  }
}
