import ParkingLotDashboard from '../component/ParkingLotDashboard'
import { connect } from "react-redux";

const mapStateToProps = state => ({
    parkingLots: state.parkingLots
})

const mapDispatchToProps = dispatch => ({
    refeshAllParkingLots: parkingLots => {
        dispatch({
            type: "REFRES_ALL_PARKING_LOTS",
            payload: parkingLots
        });
    }
});

connect(mapStateToProps, mapDispatchToProps)(ParkingLotDashboard)

export default connect(mapStateToProps, mapDispatchToProps)(ParkingLotDashboard)