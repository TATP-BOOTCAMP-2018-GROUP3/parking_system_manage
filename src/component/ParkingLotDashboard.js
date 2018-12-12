import React, { Component } from 'react'
import { Card, Col, Row, Progress } from 'antd';
import ParkingLotsResource from '../resources/ParkingLotsResource';
export default class ParkingLotDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { results: [] }
    }

    componentDidMount() {
        ParkingLotsResource.getAll()
        .then(result => result.json())
        .then(result => {
            console.log(result)
            this.setState({ results: result })
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
                                        ParkingBoy：{item.employee_id}
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
