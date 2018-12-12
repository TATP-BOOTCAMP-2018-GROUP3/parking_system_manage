const initialState = {
    parkingLots: [],
    employees: [],
    onShowForm: false
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
        default:
            return state;
    }
};