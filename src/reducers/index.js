const initialState = {
    parkingLots: []
  };
  
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "REFRES_ALL_PARKING_LOTS":
            return {
                ...state,
                parkingLots: payload
            }
        default:
            return state;
    }
};