import OrderManagement from '../component/OrderManagement'
import { connect } from "react-redux";

const mapStateToProps = state => ({
    orders: state.orders,
    parkingClerkNameMapping: state.parkingClerkNameMapping,
})

const mapDispatchToProps = dispatch => ({
    refreshAllOrders: orders => {
        dispatch({
            type: "REFRESH_ALL_ORDERS",
            payload: orders
        });
    },
    getParkingClerkNameMapping: parkingClerkNameMapping => {
        dispatch({
            type: "REFRESH_PARKING_CLERK_NAME_MAPPING",
            payload: parkingClerkNameMapping
        });
    },
});

connect(mapStateToProps, mapDispatchToProps)(OrderManagement)

export default connect(mapStateToProps, mapDispatchToProps)(OrderManagement)