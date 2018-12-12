const initialState = {
    parkingLots: [],
    employees: [],
    onShowForm: false,
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
        case "TOGGLE_ON_SHOW_FORM":
            return {
                ...state,
                onShowForm: !state.onShowForm
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

                ...state,
            }
        case "REFRESH_ALL_PARKING_CLERKS":
            return {
                ...state,
                parkingClerks: payload
            }
        default:
            return state;
    }
};