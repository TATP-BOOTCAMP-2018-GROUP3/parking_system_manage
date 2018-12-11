import React, { Component } from 'react'
import { Card, Col, Row,Progress } from 'antd';
export default class ParkingLotDashboard extends Component {
  render(){


    // function handleChange(value) {
    //     console.log(`selected ${value}`);
    // }
    return(
        <div>
            <Row gutter={16}>               
                    <Col span={8} style={{marginBottom:20}}>
                        <Card title="New ParkingLot">
                            <Row>
                                <Col span={12}>
                                    <Progress
                                        type="dashboard"
                                        format={() => `1/10`}
                                        percent={(1 / 10) * 100}/>
                                </Col>
                                <Col span={12}>
                                    ParkingBoy：New ParkingBoy
                                </Col>
                            </Row>
                            <Col span={12}><b><br/>Status</b></Col>
                        </Card>
                    </Col>
            </Row>
        </div>
    );
}
}
