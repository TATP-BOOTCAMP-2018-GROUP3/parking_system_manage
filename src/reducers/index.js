const initialState = {
    parkingLots: [],
    employees: [],
    employeePassword: '',
    onShowEmployeeForm: false,
    onShowParkingLotForm: false,
    onShowPasswordModel: false,
    orders: [],
    parkingClerks: [],
    parkingClerkNameMapping: {},
    handlingOrder: {}
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
        case "REFRESH_ALL_ORDERS":
            return {
                ...state,
                orders: payload
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
        case "REFRESH_PARKING_CLERK_NAME_MAPPING":
            return {
                ...state,
                parkingClerkNameMapping: payload
            }
        case "HANDLING_ORDER":
            return {
                ...state,
                parkingClerkNameMapping: payload
            }
        default:
            return state;
    }
};