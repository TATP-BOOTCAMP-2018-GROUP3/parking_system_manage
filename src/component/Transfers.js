import React from 'react';
import {Transfer} from 'antd';
import store from "../index"
//import ParkingBoysApi from "../API/ParkingBoysApi"

export default class Transfers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: [...this.props.left, ...this.props.right],
            keys: this.props.right.map(lot => lot.employee_id)
        }
    }



    filterOption = (inputValue, option) => {
        return option.description.indexOf(inputValue) > -1;
    }

    handleChange = (direction, moveId,userId) => {
        console.log("store----------------------------")
        console.log(store)
        let dispatch = store.dispatch;
        //ParkingBoysApi.changeParkingLotsOwner(dispatch,direction,moveId,userId);
    }
    showsome = () => {
        this.props.showsomeC();
    }

    render() {
        let parkingLotLeftData = this.props.left;
        let parkingLotRightData = this.props.right;
        let total = [...parkingLotLeftData, ...parkingLotRightData];
        let datas = total.map(x => {
            return {
                key: x.parkingLotId,
                title: x.parkingLotName
            }
        });
        let userId = this.props.id;
        let keys = parkingLotRightData.map(lot => lot.parkingLotId);

        console.log("-----------------------" + datas);
        console.log("-----------------------" + keys);
        return (
            <Transfer
                dataSource={datas}
                titles={['暂未分配', '已分配']}
                filterOption={this.filterOption}
                targetKeys={keys}
                onChange={(a, direction, moveId) => this.handleChange(direction, moveId, userId)}//{this.showsome()}
                render={item => item.title}
                listStyle={{textAlign: "left", backgroundColor: "#fff"}}
            />
        );
    }
}

// const mapStateToProps = (state, ownProps) =>{
//     return
// };
//
// export default connect(mapStateToProps)(Transfer)
