import React, { Component } from 'react'
import { Table, Divider, Button, Input, Popconfirm, Form} from 'antd';
import EmployeeResource from '../resources/EmployeeResource';
import EmployeeFormContainer from '../containers/EmployeeFormContainer';
import EmployeePasswordModel from './EmployeePasswordModel';
import ParkingClerksResource from '../resources/ParkingClerksResource';

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

export default class EmployeeManagementPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
        employees: this.props.employees,
        searching: false
      }
    }

  createColumn = () => {
    return[{
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
      dataIndex: 'workingStatus',
      key: 'workingStatus',
    },{
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Edit</a>
        <Divider type="vertical" />
        {(record.workingStatus == "On Duty") ? (<Popconfirm
                                    title="Confirm to close?"
                                    onConfirm={() => {
                                        this.forzenOrOnDuty(record)
                                    }}
                                >
                                    <a>Freeze</a>
                                </Popconfirm>)
                                : (
                                    <a onClick={() => {
                                        this.forzenOrOnDuty(record)
                                    }}>On Duty</a>
                                )
}
      </span>
    ),
  }];
  }

  forzenOrOnDuty(record) {
    let newState =""
    if (record.workingStatus =="freeze"){
      newState ="On Duty"
    }
    else{
      newState ="freeze"
    }
    EmployeeResource.forzenOrUnforzen(record,newState)
    .then(result => {
        alert("Success")
        EmployeeResource.getAll()
          .then(result => result.json())
          .then(result => {
            this.props.refeshAllEmployees(result);
          })
      
    })
  }
  componentDidMount() {
    EmployeeResource.getAll()
    .then(result => result.json())
    .then(result => {
      this.props.refeshAllEmployees(result);
    })
  }

  createEmployee = (accountName, email, phoneNumb) => {
    this.props.toggleOnShowEmployeeForm()
    return (
      ParkingClerksResource.addEmployee(accountName, email, phoneNumb)
      .then(result => {
        if (result.status === 201){
          return result.json()
        } else {
          return null
        }
      })
      .then(result => {
          this.props.returnPasswordAfterCreate(result);
          return result
      })
      )
  }
  
  onShowPasswordModel = () => {
    this.props.toggleOnShowPasswordModel()
  }

  returnPassword = () => {
    return this.props.employeePassword
  }

  resetSearch = () => {
    this.setState(
      {
        employees: this.props.employees,
        searching: false
      }
    )
  }

  searchEmployee = (value) => {
      this.setState({
        employees: this.props.employees.filter((employee) => (employee.accountName.indexOf(value) !== -1)),
        searching: true
      },
    )
  }

  render(){

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
      { this.props.onShowEmployeeForm ? <EmployeeFormContainer onClickCreate={this.createEmployee} showPasswordModel={this.onShowPasswordModel}/> : null }      
      { this.props.onShowPasswordModel ? <EmployeePasswordModel showPassword={this.returnPassword} showPasswordModel={this.onShowPasswordModel}/> : null }
      <Button onClick={this.props.toggleOnShowEmployeeForm} type="primary" style={{ marginRight: 16, marginTop: 40 }}>
        Add Employee
      </Button>
      <Search
        placeholder="Search employee"
        onSearch={(value) => {this.searchEmployee(value)}}
        style={{ width: 200 }}
      />
    <Table 
      components={components}
      rowClassName={() => 'editable-row'}
      bordered
      dataSource={(this.state.searching) ? this.state.employees : this.props.employees}
      columns={columns}
      style={{marginTop: 20}}/>
    </div>
    )
  }
}
