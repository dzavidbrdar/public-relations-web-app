import React, { Component } from 'react';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, HourglassOutlined, StarTwoTone } from '@ant-design/icons';
import { Card, Modal, BackTop, Button, Empty } from 'antd'
import { Row, Col, Statistic, Spin, Drawer, Badge } from 'antd';
import Modalni from "./Modal.js";
import Forma from "./Form.js";
import { Input, Tooltip, message } from 'antd';
import Proba from "./SeeReview.js";
const { Search } = Input;

class Contact extends Component {
  state = {
    visibleDrawer: false,
    show: false,
  
  };

  //state = { visible: false };

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

  constructor() {
    super();
    this.state = {
      allData: [],
      data: [],
      brojPoslovnica: 0,
      visibleRate: false,
      //visible: false, 
      visibleDrawer: false,
      ucitavanje: false,
      clickedElement: [],
      ocjena: [],
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
        if (element1.id == element2.office.id) {
          brojac++;
          zbir += element2.starReview;
        }
      });

      let finalRate = 3; ///UKOLIKO NEMA OCJENA JOS UVIJEK ZA OVU POSLOVNICU DEFAULTNA VRIJEDNOST PRIKAZA JE 3
      ///ONA NE UTICE NA RATE KORISNIKA PRILIKOM BUDUCEG UNOSENJA ISTIH

      if (brojac != 0) finalRate = zbir / brojac;
      if ((finalRate - Math.floor(finalRate)) != 0) finalRate = finalRate.toFixed(1);

      tmp.push({ id: element1.id, prosjecnaOcjena: finalRate });
    });

    this.setState({
      allData: json,
      data: json,
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

  
  render() {
    const items = []
    const { ocjena } = this.state

    this.state.data.forEach(element => {
      let index = ocjena.findIndex(x => x.id === element.id);
      let colorBadge;
      if(ocjena[index].prosjecnaOcjena <= 2.5) colorBadge = '2px solid #ffe58f'
      if(ocjena[index].prosjecnaOcjena > 2.5 && ocjena[index].prosjecnaOcjena < 4) colorBadge = '2px solid #95de64'
      if(ocjena[index].prosjecnaOcjena >=4 ) colorBadge = '2px solid #52c41a'

      items.push(
        <Col className="gutter-row" span={6}>
          <Badge count={<Statistic value={ocjena[index].prosjecnaOcjena} prefix={<StarTwoTone twoToneColor="gold" />} suffix="/ 5"
            valueStyle={{
              border: colorBadge,
              borderRadius: '15px 15px 15px 2px', width: '115px', height: '45px', boxShadow: '1px 5px 7px #888888'
            }} />}>

            <Card title={element.businessName + " " + element.id} style={{ width: 300 }} hoverable="true"
              actions={[<Button type="link"
                onClick={e => {
                  this.showModal(e);
                  this.state.clickedElement = element;
                  console.log(this.state.clickedElement);
                }}
              >
                Rate
                    </Button>,  <Button type="link" onClick={e => {
                      this.state.clickedElement = element;
                      this.showDrawer(e);
                    }}
                    >Reviews</Button> ]}>
              <p style={{ fontWeight: "bold", height: '45px' }}><EnvironmentOutlined /> {element.country + "-" + element.city + ", " + element.address} </p>
              <p><PhoneOutlined /> {element.phoneNumber}</p>
              <p><MailOutlined /> {element.email}</p>
              <p><HourglassOutlined /> {element.workDayStart + "h -" + element.workDayEnd + "h"}</p>
            </Card>

          </Badge>
        </Col>
      )
    });
    return (
      <div class="mainDiv" style={{ padding: '30px' }}>
<Drawer placement="right" 
                      closable={true}
                      onClose={this.onClose}
                      visible={this.state.visibleDrawer}
                      getContainer={false}
                      style={{ position: 'absolute' }}
                      width={640}
                      title={this.state.clickedElement.businessName + ", " +this.state.clickedElement.address}
                      
                    >
                  <Proba valueFromParent={this.state.clickedElement} ></Proba>
                </Drawer>
        <Statistic title="Active Offices" value={this.state.brojPoslovnica}/> <br />
        <Tooltip title="If you search with no value, all active offices will be shown.">
          <Search
            placeholder="Input location"
            onSearch={value => this.onLocationSearch(value)}
            style={{ width: 200 }}
          />   </Tooltip>
        <br /><br /><br /><br />
        {
          (!this.state.ucitavanje) ? <div><Spin size="large" /></div> : null
        }

        <Row gutter={[16, 32]}>
          {items}
      
        </Row>

        <Modalni onClose={this.showModal} show={this.state.show} valueFromParent={this.state.clickedElement}>
          <Forma valueFromParent={this.state.clickedElement} ></Forma>
        </Modalni>

      

        <BackTop />
      </div>
    );
  }
  onLocationSearch(value) {
    console.log(value);
    if (value === '') this.setState({ data: this.state.allData });
    else {
      let tempOffices = [];
      this.state.allData.forEach(element => {
        let location = element.country + ' ' + element.city + ' ' + element.address;
        location = location.toLocaleLowerCase();
        if (location.includes(value.toLocaleLowerCase())) tempOffices.push(element);
      });
      if (tempOffices.length === 0) { message.info("No results for " + value + '.'); }
      else this.setState({ data: tempOffices });

    }
  }
}

export default Contact;