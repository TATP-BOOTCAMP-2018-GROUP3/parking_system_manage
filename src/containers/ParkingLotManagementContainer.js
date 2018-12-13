import ParkingLotManagement from '../component/ParkingLotManagementPage'
import { connect } from "react-redux";

const mapStateToProps = state => ({
    parkingLots: state.parkingLots,
    onShowParkingLotForm: state.onShowParkingLotForm
})

const mapDispatchToProps = dispatch => ({
    refeshAllParkingLots: parkingLots => {
        dispatch({
            type: "REFRESH_ALL_PARKING_LOTS",
            payload: parkingLots
        });
    },
    toggleOnShowParkingLotForm: () => {
        dispatch({
            type: "TOGGLE_ON_SHOW_PARKING_LOT_FORM"
        });
    }
});

connect(mapStateToProps, mapDispatchToProps)(ParkingLotManagement)

export default connect(mapStateToProps, mapDispatchToProps)(ParkingLotManagement)