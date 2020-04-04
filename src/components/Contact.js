import React, { Component } from 'react';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, HourglassOutlined } from '@ant-design/icons';
import { Card, Modal, BackTop, Button, Empty } from 'antd'
import { Row, Col, Statistic, Spin, Drawer } from 'antd';

const Komentari = ({ onClose, visibleDrawer }) => (
    <Drawer placement="right" title="Comment section for selected Office"
          closable={true}
          onClose={onClose}
          visible={!visibleDrawer}
          getContainer={false}
          style={{ position: 'absolute' }}
          width={640}
        >
        <Empty />
    </Drawer>
);

class Contact extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            brojPoslovnica: 0,
            visibleRate: false,
            visibleDrawer: false,
            ucitavanje: false
        };
    }

    //ucitavanje api podataka
    async componentDidMount() {
        const response = await fetch('https://main-server-si.herokuapp.com/api/business/allOffices'); 
        const json = await response.json();
        this.setState({
          data:  json,
          brojPoslovnica: json.length,
          ucitavanje: true
        });
    }

    //prikazivanje rate boxa
    showModal = () => {
        this.setState({
          visibleRate: true,
        });
    };
    
    //submittanje ratea 
    handleOk = e => {
        //ovdje treba pokupiti podatke s forme ratea i poslati APIju
        this.setState({
          visibleRate: false,
        });
    };
    
    //cancel rate box
    handleCancel = e => {
        this.setState({
          visibleRate: false,
        });
    };

    showDrawer = () => {
        this.setState({
          visibleDrawer: true,
        });
    };
    
    onClose = () => {
        this.setState({
          visibleDrawer: false,
        });
    };

    render() { 
        const items = []

        this.state.data.forEach(element => {
            items.push(
                <Col className="gutter-row" span={6}>
                    <Card title={element.businessName + " " + element.id} style={{ width: 300 }} hoverable="true" 
                    actions={[ <Button type="link" onClick={this.showModal} >Rate</Button>, <Button type="link" onClick={this.showDrawer}>See comments</Button> ]}>
                        <p style = {{fontWeight: "bold"}}><EnvironmentOutlined /> {element.country + "-"+ element.city + ", " +element.address} </p>
                        <p><PhoneOutlined /> {element.phoneNumber}</p>
                        <p><MailOutlined /> {element.email}</p>
                        <p><HourglassOutlined /> {element.workDayStart + "h -" + element.workDayEnd + "h"}</p>
                    </Card>
                </Col>
            )
        });
        return (  
            <div class = "mainDiv" style={{ padding: '30px', paddingLeft: '70px' }}>
                <Statistic title = "Active Offices" value = {this.state.brojPoslovnica}/> <br/>
                {
                    (!this.state.ucitavanje) ? <div><Spin size="large" /></div>: null
                }

                <Row gutter={[16, 24]}>
                    { items }
                </Row>

                <Modal title="Rate this office" visible={this.state.visibleRate} onOk={this.handleOk} onCancel={this.handleCancel} >
                
                </Modal>

                {
                    this.state.visibleDrawer ? <Komentari onClose={this.onClose} visible={this.state.visibleDrawer} ></Komentari> : null
                }

                <BackTop />
            </div>
        );
    }
}
 
export default Contact;