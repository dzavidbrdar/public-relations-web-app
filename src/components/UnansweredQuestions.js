import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Avatar, Form, Button, Input, Layout, Table, message, Badge } from 'antd';
import '../UnansweredQuestions.css'
import Logout from './Logout.js';

const { TextArea } = Input;
const { Column } = Table;
const { Content } = Layout;
const Editor = ({ onChange, onChange1, onSubmit, value, Qnumber}) => (
    <div class="editor" >
      <Badge count={Qnumber}>
        <Avatar  size="large" style={{ fontSize: '17px', color: 'white', backgroundColor: '#4272f5'}}>Employee</Avatar> <br/><br/>
      </Badge>
      <Form.Item>
        <TextArea rows={10} cols={100} placeholder="Answer the question!" onChange={onChange1} value={value}/>
      </Form.Item>
      <Form.Item>
        <Button id = "answer" htmlType="submit" onClick={onSubmit} type="primary">
          Add Answer
        </Button>
        <Button id = "cancel" onClick={onChange}>
          Cancel
        </Button>
      </Form.Item>
    </div>
);

class UnansweredQuestions extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      showMe: true,
      id: null,
      tekst: null,
      value: '',
      Qnumber: 0,
      prikazati:false
    };
  }
  static getDerivedStateFromProps(props, state) {
    console.log(document.cookie);
    if(getCookie("token")!="") return {prikazati:true};
    else return {prikazati:false};
  }

  async componentDidMount() {
    const response = await fetch('https://main-server-si.herokuapp.com/api/questions');
    const json = await response.json();
    const filteredJson = json.filter(json => json.answer.text===null);
    this.setState({
      data:  filteredJson,
      Qnumber: filteredJson.length
    });
  }

  prikazi(id1){
    this.setState({
      showMe: !this.state.showMe,
      id: id1.id
    })
  }

  cancelBtn = () => {
    this.setState({
      showMe: !this.state.showMe,
      value: ''
    })
  }

  handleSubmit = () => {
    if (!this.state.value) {
      message.warning('Input field is empty!');
      return;
    }

    this.setState({
        value: ''
    });

    let privremena = getCookie("token");

      var ajax=new XMLHttpRequest();
      ajax.onreadystatechange=()=>{
        if (ajax.readyState == 4 && ajax.status == 200){
          this.componentDidMount();
          this.setState({
            Qnumber: this.state.Qnumber--
          })
        }
        if (ajax.readyState == 4 && ajax.status == 404)
          console.log('greska 404');
      }
      console.log(this.state.id, this.state.tekst);
      ajax.open("POST", 'https://main-server-si.herokuapp.com/api/questions/' + this.state.id +'/answer', true);
      ajax.setRequestHeader("Content-Type", "application/json");
      ajax.setRequestHeader("Authorization", "Bearer " + privremena);
      let objekat={text:this.state.value};
      ajax.send(JSON.stringify(objekat));

  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { value, Qnumber } = this.state;
    if(!this.state.prikazati) return <p>Zabranjen pristup</p>;
    else
    return (

   <Layout className="layout">
    <Content  className="table" style={{ padding: '0 50px' }} >
    <div class="AppQ">
      <div className="site-layout-content">
      <Table bordered dataSource={this.state.data}>

      <Column title="ID" dataIndex="id" key="id" width="7%"/>
      <Column title="Question" dataIndex="text" key="text" width="17%"/>
      <Column title="Author's email" dataIndex="authorEmail" key="authorEmail" width="11%"/>
      <Column title="Date" dataIndex="date" key="date" width="9%"/>

      <Column
        title="Action"
        key="id"
        width="9%"

        render={(text, record) => (
          <span>
            <Button onClick = {() => {this.prikazi(record)}}>Reply</Button>
          </span>
        )}
      />

      </Table>
          </div>

          {
            this.state.showMe?null: <Editor onChange = {this.cancelBtn} onChange1={this.handleChange} onSubmit={this.handleSubmit} value={value} Qnumber={Qnumber}></Editor>
          }
        </div>
      </Content>
      <Logout/>
    </Layout>
    );
  }
}

let getCookie=(cname)=>{
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


export default UnansweredQuestions;
