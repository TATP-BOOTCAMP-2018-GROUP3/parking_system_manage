import EmployeeManagement from '../component/EmployeeManagementPage'
import { connect } from "react-redux";

const mapStateToProps = state => ({
    employees: state.employees,
    onShowEmployeeForm: state.onShowEmployeeForm,
    onShowPasswordModel: state.onShowPasswordModel,
    employeePassword: state.employeePassword
})

const mapDispatchToProps = dispatch => ({
    refeshAllEmployees: employees => {
        dispatch({
            type: "REFRESH_ALL_EMPLOYEES",
            payload: employees
        });
    },
    toggleOnShowEmployeeForm: () => {
        dispatch({
            type: "TOGGLE_ON_SHOW_EMPLOYEE_FORM"
        });
    },
    returnPasswordAfterCreate: employeePassword => {
        dispatch({
            type: 'GET_PASSWORD_AFTER_CREATE_ACCOUNT',
            payload: employeePassword
        })
    },
    toggleOnShowPasswordModel: () => {
        dispatch({
            type: "TOGGLE_ON_SHOW_PASSWORD_MODEL"
        });
    }
});

connect(mapStateToProps, mapDispatchToProps)(EmployeeManagement)

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeManagement)