import React, { Component } from "react";
import "../Reservations.css";
import { Row, Col, Empty, Select, Modal, Button, Slider} from 'antd';
import Modalni from "./ModalRezervacija.js";
import Forma from "./FormaRezervacija.js";
import DeleteForm from "./FormaBrisanjeRezervacije.js";
import { CloseCircleTwoTone } from '@ant-design/icons';
import ModalniDel from "./ModalBrisanjeRezervacija.js";



class Reservations extends Component {
  gutters = {};

  vgutters = {};

  colCounts = {};
  //dodala ovo
  state = {
    show: false,
    modal2Visible: false
  };

  constructor() {
    super();
    this.state = {
      data: [],
      gutterKey: 1,
      vgutterKey: 1,
      colCountKey: 2,
      tables: [],
      selectedOffice: 0,
      defaultOffice: [],
      tableId: 0
    };
    // popraviti selected poslije da ne bude fiksirano
    [8, 16, 24, 32, 40, 48].forEach((value, i) => {
      this.gutters[i] = value;
    });
    [8, 16, 24, 32, 40, 48].forEach((value, i) => {
      this.vgutters[i] = value;
    });
    [2, 3, 4, 6, 8, 12].forEach((value, i) => {
      this.colCounts[i] = value;
    });
    this.handleChange = this.handleChange.bind(this);
  }
  //dodala ovo
  showModal = e => {
    this.setState({
      show: !this.state.show
    });
  };
  //dobavi sve poslovnice jer njima punimo drop listu
  async componentDidMount() {
    const response = await fetch('https://main-server-si.herokuapp.com/api/business/allOffices');
    const json = await response.json();
    this.setState({
      data: json
    });
  }

  //kada se odabere neka poslovnica iz liste, moraju se ucitati stolovi za tu poslovnicu
  async handleChange(value) {
    const officeId = value;

    const url = 'https://main-server-si.herokuapp.com/api/business/1/offices/' + officeId + '/tables';
    //console.log("url: " + url);
    //const url='https://main-server-si.herokuapp.com/api/reviews/';
    const response = await fetch(url);
    const json = await response.json();

    this.setState({
      tables: json,
      selectedOffice: officeId
    });

  }
  //proslijedi potrebne podatke za rezervaciju ako kome zatreba
  handleReservation(event) {
    //alert("office id: " + this.state.selectedOffice + ", id sa rute koja prikazuje stolove: " + event.id + ", redni broj stola: " + event.tableNumber);
    //dodala ovo
    this.setState({
      tableId: event.id
    });
    this.showModal(event);
  }

  modal2Visible = e => {
    this.setState({
      modal2Visible: !this.state.modal2Visible
    });
  };

  setModal2Visible(value){
    this.setState({modal2Visible:value});
  }
  onColCountChange = colCountKey => {
    this.setState({ colCountKey });
  };
  render() {
    //puni drop listu
    const options = [];
    this.state.data.forEach(element => {
      if (element.businessId == 1)
        options.push(
          <option value={element.id}> {element.businessName + ', ' + element.address}</option>
        );
    })
    //za grid dio sa antd preuzet
    const { gutterKey, vgutterKey, colCountKey } = this.state;
    const cols = [];
    const colCount = this.colCounts[colCountKey];
    let colCode = '';
    let noData = [];

    // ako je odgovor prazan ne treba se uci u for each, tj ako ima stolova prikazuj
    if (this.state.tables.length > 0) {
      cols.push(
        <div style={{ width: '100%', marginBottom: '20px' }}>
          <div style={{ width: '40%', margin: '0 auto'}}>
          <Slider
            min={0}
            max={Object.keys(this.colCounts).length - 1}
            value={colCountKey}
            onChange={this.onColCountChange}
            marks={this.colCounts}
            step={null}
          /> 
          </div>
        </div>
      )
      this.state.tables.forEach(element => {
        cols.push(
          <Col span={24 / colCount}>
            <div className="components-grid-demo-playground" onClick={this.handleReservation.bind(this, element)} >{"Table " + element.tableNumber}</div>
          </Col>,
        );
        colCode += `  <Col span={${24 / colCount}} />\n`;
      }
      )
      noData = [];
      //ako nema stolova prikazi Empty komponentu
    } 
    else {
          
      let opis = "No tables found in the office"
      let slika="/noData.png";
      if(this.state.selectedOffice==0) {
        opis = "The office is not selected";
        slika=Empty.PRESENTED_IMAGE_DEFAULT;
      }

      noData.push(
        <Empty description={opis} image={slika}   imageStyle={{
          height: 150,
        }}/>
      );
    
    }

    return (
      <div className='tablesContainer'>
        <h2>Cancel Reservation</h2>
        <div>
          <Button type="" onClick={() => this.setModal2Visible(true)}>
            <CloseCircleTwoTone size='large' twoToneColor="#eb2f96" /> Cancel existing reservation
        </Button>
          <ModalniDel onClose={this.modal2Visible} show={this.state.modal2Visible}>
            <DeleteForm></DeleteForm>
          </ModalniDel>
        </div>
        <br/>
        <h2>Make Reservation</h2>
        <Select size="large" bordered="true" placeholder="Select the office" style={{ width: "40%" }} onChange={this.handleChange} >
          {options}
        </Select>
        <Row style={{ marginTop: '30px' }} gutter={[this.gutters[gutterKey], this.vgutters[vgutterKey]]}>{cols}</Row>
        <Row style={{ marginTop: '30px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>{noData}</Row>




        <Modalni onClose={this.showModal} show={this.state.show}>
          <Forma tableIdParent={this.state.tableId} officeIdParent={this.state.selectedOffice}></Forma>
        </Modalni>
      </div>
    );
  }

}
export default Reservations;