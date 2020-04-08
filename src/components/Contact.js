import React, { Component } from 'react';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, HourglassOutlined, StarTwoTone } from '@ant-design/icons';
import { Card, Modal, BackTop, Button, Empty } from 'antd'
import { Row, Col, Statistic, Spin, Drawer, Badge } from 'antd';
import Modalni from "./Modal.js";
import Forma from "./Form.js";

const Komentari = ({onClose, visibleDrawer}) => (
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
  state = {
    show: false
  };
    constructor() {
        super();
        this.state = {
            data: [],
            brojPoslovnica: 0,
            visibleRate: false,
            visibleDrawer: false,
            ucitavanje: false,
            clickedElement: [],
            ocjena: []            
        };
    }

    //ucitavanje api podataka
    async componentDidMount() {
        const response = await fetch('https://main-server-si.herokuapp.com/api/business/allOffices'); 
        const response2 = await fetch('https://main-server-si.herokuapp.com/api/reviews');
        const json = await response.json();
        const json2 = await response2.json();
        let tmp = [];

        json.forEach(element1 => {
          let brojac = 0;
          let zbir = 0;
          json2.forEach(element2 => {
            if(element1.id == element2.office.id){
              brojac++;
              zbir += element2.starReview;
            }
          });

          let finalRate = 3; ///UKOLIKO NEMA OCJENA JOS UVIJEK ZA OVU POSLOVNICU DEFAULTNA VRIJEDNOST PRIKAZA JE 3
                             ///ONA NE UTICE NA RATE KORISNIKA PRILIKOM BUDUCEG UNOSENJA ISTIH

          if(brojac != 0) finalRate = zbir/brojac;
          if((finalRate - Math.floor(finalRate)) != 0) finalRate = finalRate.toFixed(1);

          tmp.push({id: element1.id, prosjecnaOcjena: finalRate});
        });

        this.setState({
          data:  json,
          brojPoslovnica: json.length,
          ucitavanje: true,
          ocjena: tmp
        });
    }

    showModal = e => {
      this.setState({
        show: !this.state.show
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
        const { ocjena } = this.state

        this.state.data.forEach(element => {
          let index = ocjena.findIndex(x => x.id === element.id);

            items.push(
                <Col className="gutter-row" span={6}>
                  <Badge count = {<Statistic value={ ocjena[index].prosjecnaOcjena} prefix = {<StarTwoTone twoToneColor="gold"/>} suffix="/ 5" 
                                             valueStyle={{ border: ocjena[index].prosjecnaOcjena<3?'2px solid #ffe58f':'2px solid #95de64',
                                                           borderRadius: '15px 15px 15px 2px', width:'115px', height: '45px', boxShadow: '1px 5px 7px #888888'}}/> }>
                    <Card title={element.businessName + " " + element.id} style={{ width: 300 }} hoverable="true" 
                    actions={[  <Button type = "link"
                      onClick={e => {
                        this.showModal(e);
                        this.state.clickedElement = element;
                        console.log(this.state.clickedElement);
                      }}
                    >
                      Rate
                    </Button>, <Button type="link" onClick={this.showDrawer}>See comments</Button> ]}>
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

                <Modalni onClose={this.showModal} show={this.state.show} valueFromParent={this.state.clickedElement}>
                  <Forma valueFromParent={this.state.clickedElement} ></Forma>
                </Modalni>

                {
                    this.state.visibleDrawer ? <Komentari onClose={this.onClose} visible={this.state.visibleDrawer} ></Komentari> : null
                }

                <BackTop />
            </div>
        );
    }
}
 
export default Contact;