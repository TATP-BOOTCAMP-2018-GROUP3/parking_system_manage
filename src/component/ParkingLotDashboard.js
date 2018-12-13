import React, { Component } from 'react'
import { Card, Col, Row, Progress } from 'antd';
import ParkingLotsResource from '../resources/ParkingLotsResource';
import ParkingClerksResource from '../resources/ParkingClerksResource';
export default class ParkingLotDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { results: [], parkingClerkNameMapping: {} }
    }

    componentDidMount() {
        ParkingLotsResource.getAll()
        .then(result => result.json())
        .then(result => {
            this.setState({ ...this.state, results: result })
        })
        ParkingClerksResource.getAll()
        .then(result => result.json())
        .then(result => {
            let map = {};
            result.forEach(parkingClerks => {
                map[parkingClerks.employeeId] = parkingClerks.accountName;
            });
            this.setState({ ...this.state, parkingClerkNameMapping: map });
        })
    }

    render() {
        
        let items = this.state.results;
        return (

            <div>
                <Row gutter={16}>
                    {items.map(item =>
                        <Col span={8} style={{ marginBottom: 20 }}>
                            <Card title={item.parkingLotName}>
                                <Row>
                                    <Col span={12}>
                                        <Progress
                                            type="dashboard"
                                            format={() => `${item.availablePositionCount}/${item.capacity}`}
                                            percent={(( item.availablePositionCount) / item.capacity) * 100} />
                                    </Col>
                                    <Col span={12}>
                                        ParkingBoy：{this.state.parkingClerkNameMapping[item.employeeId]}
                                    </Col>
                                </Row>
                                <Col span={12}><b><br />Status</b></Col>
                            </Card>
                        </Col>)}
                </Row>
            </div>
        );
    }
}
