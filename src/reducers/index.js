const initialState = {
    parkingLots: [],
    parkingOrders: []
  };
  
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "REFRES_ALL_PARKING_LOTS":
            return {
                ...state,
                parkingLots: payload
            }
        case "GET_ALL_PARKING_ORDER":
            return {
                ...state,
                parkingOrders: payload
            }    
        default:
            return state;
    }
};