import ParkingBoyManagementPage from '../component/ParkingBoyManagementPage'
import { connect } from "react-redux";

const mapStateToProps = state => ({
  parkingLots: state.parkingLots,
  parkingClerks: state.parkingClerks
})

const mapDispatchToProps = dispatch => ({
  refeshAllParkingLots: parkingLots => {
    dispatch({
      type: "REFRESH_ALL_PARKING_LOTS",
      payload: parkingLots
    });
  },
  refreshAllParkingClerks: parkingClerks => {
    dispatch({
      type: "REFRESH_ALL_PARKING_CLERKS",
      payload: parkingClerks
    })
  }
});

connect(mapStateToProps, mapDispatchToProps)(ParkingBoyManagementPage)

export default connect(mapStateToProps, mapDispatchToProps)(ParkingBoyManagementPage)