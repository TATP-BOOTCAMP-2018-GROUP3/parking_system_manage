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
        if (localStorage.getItem('AUTH') === null || localStorage.getItem('AUTH') === '') {
            this.props.history.push('/login');
            return;
        }
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
                <Row gutter={20}>
                    {items.map(item =>
                        <Col span={8} style={{ marginBottom: 20 }}>
                            <Card title={item.parkingLotName}>
                                <Row>
                                    <Col span={8}>
                                        <Progress
                                            type="dashboard"
                                            format={() => `${item.availablePositionCount}/${item.capacity}`}
                                            percent={((item.availablePositionCount) / item.capacity) * 100} />
                                    </Col>
                                    <br></br>
                                    <br></br>
                                    <Col span={10}>
                                        <b>ParkingBoy：</b> <u>{this.state.parkingClerkNameMapping[item.employeeId]}</u>
                                    </Col>
                                    <Col span={10}>
                                        <b>Status: </b> {(item.status === "close")? <font color="red">Closed</font> : <font color="blue">Opened</font>}
                                    </Col>
                                </Row>

                            </Card>
                        </Col>)}
                </Row>
            </div>
        );
    }
}
