import EmployeeManagement from '../component/EmployeeManagementPage'
import { connect } from "react-redux";

const mapStateToProps = state => ({
    employees: state.employees,
    onShowForm: state.onShowForm
})

const mapDispatchToProps = dispatch => ({
    refeshAllEmployees: employees => {
        dispatch({
            type: "REFRESH_ALL_EMPLOYEES",
            payload: employees
        });
    },
    toggleOnShowForm: () => {
        dispatch({
            type: "TOGGLE_ON_SHOW_FORM"
        });
    }
});

connect(mapStateToProps, mapDispatchToProps)(EmployeeManagement)

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeManagement)