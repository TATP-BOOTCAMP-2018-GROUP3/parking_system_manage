const initialState = {
    parkingLots: [],
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
        default:
            return state;
    }
};