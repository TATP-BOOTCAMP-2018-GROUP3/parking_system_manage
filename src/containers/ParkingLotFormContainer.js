import ParkingLotForm from '../component/ParkingLotForm'
import { connect } from "react-redux";

const mapStateToProps = state => ({
    parkingLots: state.parkingLots
})

const mapDispatchToProps = dispatch => ({
    refeshAllParkingLots: parkingLots => {
        dispatch({
            type: "REFRESH_ALL_PARKING_LOTS",
            payload: parkingLots
        });
    }
});

connect(mapStateToProps, mapDispatchToProps)(ParkingLotForm)

export default connect(mapStateToProps, mapDispatchToProps)(ParkingLotForm)