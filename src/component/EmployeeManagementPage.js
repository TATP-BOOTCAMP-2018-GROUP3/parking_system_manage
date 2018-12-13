import React, { Component } from 'react'
import { Table, Divider, Button, Input, Popconfirm, Form } from 'antd';
import EmployeeResource from '../resources/EmployeeResource';
import EmployeeFormContainer from '../containers/EmployeeFormContainer';
import EmployeePasswordModel from './EmployeePasswordModel';
import ParkingClerksResource from '../resources/ParkingClerksResource';
import { NotificationContainer, NotificationManager } from 'react-notifications';

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

  refeshAllEmployees = () => {
    EmployeeResource.getAll()
      .then(result => result.json())
      .then(result => {
        this.props.refeshAllEmployees(result);
      })
  }

  createNotification = (popupMsg) => {
    let type = popupMsg.type
    switch (type) {
        case 'info':
            NotificationManager.info('Info message');
            break;
        case 'success':
            NotificationManager.success(popupMsg.body, popupMsg.title);
            break;
        case 'warning':
            NotificationManager.warning(popupMsg.body, popupMsg.title, 3000);
            break;
        case 'error':
            NotificationManager.error(popupMsg.body, popupMsg.title, 5000, () => {
                // alert('callback');
            });
            break;
    };
    popupMsg = null;
}

  createColumn = () => {
    return [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: 'Name',
        dataIndex: 'accountName',
        key: 'accountName',
        editable: true,
      }, {
        title: 'Full Name',
        dataIndex: 'name',
        key: 'name',
        editable: true,
      }, {
        title: 'Phone Number',
        dataIndex: 'phoneNum',
        key: 'phoneNum',
        editable: true,
      }, {
        title: 'Email Address',
        dataIndex: 'email',
        key: 'email',
        editable: true,
      }, {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        editable: true,
      }, {
        title: 'Status',
        dataIndex: 'workingStatus',
        key: 'workingStatus',
      }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <div>
            {
              (record.workingStatus === "On Duty") ?
                (<Popconfirm
                  title="Confirm to freeze?"
                  onConfirm={
                    () => {
                      this.forzenOrOnDuty(record)
                    }
                  }
                >
                  <a>Freeze</a>
                </Popconfirm>)
                :
                (<a onClick={
                  () => {
                    this.forzenOrOnDuty(record)
                  }
                }>Change to On Duty</a>
                )
            }
          </div>
        )
      }
    ]
  }

  handleSave = (row) => {
    let updatedEmployee = {
      accountName: row.accountName,
      name: row.name,
      phoneNum: row.phoneNum,
      email: row.email,
      role: row.role,
      id: row.id
    };
    
    let allEmployees = (this.state.searching) ? this.state.employees : this.props.employees
   
    let updatedEmployees = allEmployees.map(employee => {
      if (employee.id === updatedEmployee.id) {
        return { ...employee, accountName: updatedEmployee.accountName, name: updatedEmployee.name, phoneNum: updatedEmployee.phoneNum, email: updatedEmployee.email, role: updatedEmployee.role};
      } else {
        return employee;
      }
    })
    this.props.refeshAllEmployees(updatedEmployees);
    EmployeeResource.updateEmployee(updatedEmployee)
      .then(res => {
        this.refeshAllEmployees();
        this.createNotification({
          "type": "success",
          "title": "Updated",
          "body": "The employee " + updatedEmployee.accountName + "'s record is updated"
        })
      })
  }

  forzenOrOnDuty(record) {
    let newState = ""
    if (record.workingStatus === "freeze") {
      newState = "On Duty"
    }
    else {
      newState = "freeze"
    }
    EmployeeResource.forzenOrUnforzen(record, newState)
      .then(result => {
        EmployeeResource.getAll()
          .then(result => result.json())
          .then(result => {
            this.props.refeshAllEmployees(result);
          })
          this.createNotification({
            "type": "success",
            "title": "Updated",
            "body": "The employee " + record.accountName + "'s record is updated"
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
          if (result.status === 201) {
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
    let tempEmployee = this.props.employees.map((clerk) => {
      return {
        accountName: clerk.accountName,
        email: clerk.email,
        id: clerk.id,
        name: clerk.name,
        phoneNum: clerk.phoneNum,
        role: clerk.role,
        workingStatus: clerk.workingStatus,
        searchString: clerk.accountName + "|" + clerk.email + "|" + clerk.id + "|" + clerk.name + "|" + clerk.phoneNum + "|" + clerk.role + "|" + clerk.workingStatus + "|"
      }
    })
    this.setState({
      employees: tempEmployee.filter((employee) => (employee.searchString.indexOf(value) !== -1)),
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
        <NotificationContainer />

        {this.props.onShowEmployeeForm ? <EmployeeFormContainer onClickCreate={this.createEmployee} showPasswordModel={this.onShowPasswordModel} /> : null}
        {this.props.onShowPasswordModel ? <EmployeePasswordModel showPassword={this.returnPassword} showPasswordModel={this.onShowPasswordModel} /> : null}
        <Button onClick={this.props.toggleOnShowEmployeeForm} type="primary" style={{ marginRight: 16, marginTop: 40 }}>
          Add Employee
      </Button>
        <Search
          placeholder="Search employee"
          onSearch={(value) => { this.searchEmployee(value) }}
          style={{ width: 200 }}
        />
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={(this.state.searching) ? this.state.employees : this.props.employees}
          columns={columns}
          style={{ marginTop: 20 }} />
      </div>
    )
  }
}
