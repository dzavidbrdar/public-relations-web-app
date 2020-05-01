import React, { Component } from "react";
import "../Reservations.css";
import { Row, Col, Empty, Select} from 'antd';

class Reservations extends Component {
    gutters = {};

    vgutters = {};
  
    colCounts = {};
    
    constructor() {
      super();
      this.state = {
        data: [],
        gutterKey: 1,
        vgutterKey: 1,
        colCountKey: 2,
        tables:[],
        selectedOffice: 0,
        defaultOffice:[]
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

      const url = 'https://main-server-si.herokuapp.com/api/business/1/offices/'+officeId+'/tables';
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
    handleReservation(event){
      alert("office id: " + this.state.selectedOffice + ", id sa rute koja prikazuje stolove: " + event.id + ", redni broj stola: " + event.tableNumber);
    }
  
    render(){
      //puni drop listu
    const options=[];
    this.state.data.forEach(element=>{
       options.push(
        <option value={element.id}> {element.businessName}</option>
       );
     })
     //za grid dio sa antd preuzet
        const { gutterKey, vgutterKey, colCountKey } = this.state;
        const cols = [];
        const colCount = this.colCounts[colCountKey];
        let colCode = '';
        let noData = [];
        
        // ako je odgovor prazan ne treba se uci u for each, tj ako ima stolova prikazuj
        if ( this.state.tables.length > 0 ) {
          this.state.tables.forEach(element =>{
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
        } else {
          noData.push(
            <Empty />
          );
        
        }
      
        return (
          <div className='tablesContainer'>
           <Select size="large" bordered="true" placeholder="Select the office" style={{ width: "40%" }} onChange={this.handleChange} >
             {options}
           </Select>
              <Row style={{marginTop: '30px'}} gutter={[this.gutters[gutterKey], this.vgutters[vgutterKey]]}>{cols}</Row>
              <Row style={{ marginTop: '80px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>{noData}</Row>
            </div>
            );
          }

}
export default Reservations;