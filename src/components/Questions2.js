import React, { Component } from "react";
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Collapse } from 'antd';
const { Panel } = Collapse;
//import '../UnansweredQuestions.css'

class Questions2 extends Component {
  //3 faze:mounting, updating, unmounting
  /*1)mounting:1.constructor,2.getderivatedstatefromprops,3.render,4.componentdidmount
    2)updating:1.getderivatedstatefromprops,2.shouldComponentUpdate(),3.render(),4.getSnapshotBeforeUpdate(),5.componentDidUpdate()
    3)unmounting:1.componentWillUnmount()
  */


  async componentDidMount() {
    const response = await fetch('https://main-server-si.herokuapp.com/api/questions');
    const json = await response.json();
    const filteredJson = json.filter(json => json.answer.text!=null);
    const nizGeneral=[],nizReturns=[],nizReservations=[];

    let dataGeneral=<div><Collapse accordion style={collapseStyle_ek1}>{nizGeneral}</Collapse></div>;
    let dataReturns=<div><Collapse accordion style={collapseStyle_ek1}>{nizReturns}</Collapse></div>;
    let dataReservations=<div><Collapse accordion style={collapseStyle_ek1}>{nizReservations}</Collapse></div>;

    let formirajPanel=(q,a,i)=>{
      return (<Panel key={i} header={q}><p key='1'>{a}</p></Panel>);
    }
    let i;
    for(i=0;i<filteredJson.length;i++){
      //bezveze podijeliti
      if(i<3) nizGeneral.push(formirajPanel(filteredJson[i].text,filteredJson[i].answer.text,i));
      else if(i<7) nizReturns.push(formirajPanel(filteredJson[i].text,filteredJson[i].answer.text,i));
      else nizReservations.push(formirajPanel(filteredJson[i].text,filteredJson[i].answer.text,i));
    }
    let ref1=this.refs.Q1_ek1;
    let ref2=this.refs.Q2_ek1;
    let ref3=this.refs.Q3_ek1;

    ReactDOM.render(<div>{dataGeneral}</div>, ref1);
    ReactDOM.render(<div>{dataReturns}</div>, ref2);
    ReactDOM.render(<div>{dataReservations}</div>, ref3);
  }

  render() {
    return(
      <div style={divStyleQ_ek1}>
      <h1>Frequently Asked Questions</h1>
      <h2 style={h2Style_ek1}>General questions</h2>
      <div ref="Q1_ek1"></div>
      <h2 style={h2Style_ek1}>Returns</h2>
      <div ref="Q2_ek1"></div>
      <h2 style={h2Style_ek1}>Reservations</h2>
      <div ref="Q3_ek1"></div>
      </div>
    );
  }
}
/*
function formirajPanel(q,a,i){
  return (<Panel key={i} header={q}><p key='1'>{a}</p></Panel>);
}
*/
const divStyleQ_ek1 = {
  textAlign:'left',
  width:'75vw',
  margin:'30px auto 60px'
}
const collapseStyle_ek1 = {
  marginLeft:'20px'
}
const h2Style_ek1 = {
  marginLeft:'5px'
}
export default Questions2;
