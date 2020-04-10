import React, { Component } from 'react';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, HourglassOutlined } from '@ant-design/icons';
import { Card, Modal, BackTop, Button, Empty } from 'antd'
import { Row, Col, Statistic, Spin, Drawer } from 'antd';
import Modalni from "./Modal.js";
import Forma from "./Form.js";
import Proba from "./SeeReview.js";
/*
const Komentari = ({onClose, visibleDrawer}) => (
    <Drawer placement="right" title="Comment section for selected Office"
          closable={true}
          onClose={onClose}
          visible={!visibleDrawer}
          getContainer={false}
          style={{ position: 'absolute' }}
          width={640}
        >
         
      <Proba></Proba>
    </Drawer>
);
*/

class Contact extends Component {
  state = {
    show: false
  };

  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

    constructor() {
        super();
        this.state = {
            data: [],
            brojReviewa:0,
            visibleRate: false,
            //visibleDrawer: false,
            ucitavanje: false,
            clickedElement: []
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

  
    
    showModal = e => {
      this.setState({
        show: !this.state.show
      });
    };

    /*
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
    */

    render() { 
        const items = []

        this.state.data.forEach(element => {
            items.push(
                <Col className="gutter-row" span={6}>
                    <Card title={element.businessName + " " + element.id} style={{ width: 300 }} hoverable="true" 
                    actions={[  <Button type = "link"
                      onClick={e => {
                        this.showModal(e);
                        this.state.clickedElement = element;
                        console.log(this.state.clickedElement);
                      }}
                    >
                      Rate
                    </Button>,
                    <Button type="link" onClick={e => {
                      this.state.clickedElement = element;
                      this.showDrawer(e);
                    }}
                    >Reviews</Button> ]}>
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

                <Drawer placement="right" 
                      closable={true}
                      onClose={this.onClose}
                      visible={this.state.visible}
                      getContainer={false}
                      style={{ position: 'absolute' }}
                      width={640}
                      title={this.state.clickedElement.businessName + ", " +this.state.clickedElement.address}
                      
                    >
                  <Proba valueFromParent={this.state.clickedElement} ></Proba>
                </Drawer>



                <Statistic title = "Active Offices" value = {this.state.brojPoslovnica}/> <br/>
                {
                    (!this.state.ucitavanje) ? <div><Spin size="large" /></div>: null
                }

                <Row gutter={[16, 24]}>
                    { items }
                </Row>

                <Modalni onClose={this.showModal} show={this.state.show} valueFromParent={this.state.clickedElement}>
                  <Forma valueFromParent={this.state.clickedElement} ></Forma>
                </Modalni>

                <BackTop />
            </div>
        );
    }
}
 
export default Contact;