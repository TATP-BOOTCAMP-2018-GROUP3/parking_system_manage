const initialState = {
    parkingLots: [],
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
        default:
            return state;
    }
};