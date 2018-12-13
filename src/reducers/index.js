const initialState = {
    parkingLots: [],
    employees: [],
    employeePassword: '',
    onShowEmployeeForm: false,
    onShowParkingLotForm: false,
    onShowPasswordModel: false,
    parkingOrders: [],
    parkingClerks: [],
};
  
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "REFRESH_ALL_PARKING_LOTS":
            return {
                ...state,
                parkingLots: payload
            }
        case "TOGGLE_ON_SHOW_PARKING_LOT_FORM":
            return {
                ...state,
                onShowParkingLotForm: !state.onShowParkingLotForm
            }
        case "REFRESH_ALL_EMPLOYEES":
            return {
                ...state,
                employees: payload
                }
        case "GET_ALL_PARKING_ORDER":
            return {
                ...state,
                parkingOrders: payload
            }
        case "REFRESH_ALL_PARKING_CLERKS":
            return {
                ...state,
                parkingClerks: payload
            }
        case "REFRESH_ALL_PARKING_CLERKS":
            return {
                ...state,
                parkingClerks: payload
            }
        case "TOGGLE_ON_SHOW_EMPLOYEE_FORM":
            return {
                ...state,
                onShowEmployeeForm: !state.onShowEmployeeForm
            }
        case "GET_PASSWORD_AFTER_CREATE_ACCOUNT":
            return {
                ...state,
                employeePassword: payload
            }
        case "TOGGLE_ON_SHOW_PASSWORD_MODEL":
            return {
                ...state,
                onShowPasswordModel: !state.onShowPasswordModel
            }
        default:
            return state;
    }
};