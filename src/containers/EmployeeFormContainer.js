import EmployeeForm from '../component/EmployeeForm'
import { connect } from "react-redux";

const mapStateToProps = state => ({
    employees: state.employees
})

const mapDispatchToProps = dispatch => ({
    refeshAllEmployees: employees => {
        dispatch({
            type: "REFRESH_ALL_EMPLOYEES",
            payload: employees
        });
    }
});

connect(mapStateToProps, mapDispatchToProps)(EmployeeForm)

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm)