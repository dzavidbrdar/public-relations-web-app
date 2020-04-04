import React, { Component } from "react";
import 'antd/dist/antd.css';
import { Avatar, Form, Button, Input, Layout, Table, message, Menu } from 'antd';
import '../UnansweredQuestions.css'

const { TextArea } = Input;
const { Column } = Table;
const { Header, Content } = Layout;
const Editor = ({ onChange, onChange1, onSubmit, value, Qnumber}) => (
    <div class="editor" >
      <Avatar shape="square"size="large" style={{backgroundColor: 'rgb(1, 1, 43)'}}>Employee</Avatar> <br/><br/>
    </div>
);

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      showMe: true,
      id: null,
      tekst: null,
      value: '',
      hover: true,
      Qnumber: 0
    };
  }

  async componentDidMount() {
    const response = await fetch('https://main-server-si.herokuapp.com/api/questions');
    const json = await response.json();
    const filteredJson = json.filter(json => json.answer.text!=null);
    console.log(filteredJson);
    const novi=filteredJson.map((x)=>{
      let y=x;
      y.answer=x.answer.text;
      return y;
    });
    this.setState({
      data:  novi,
      Qnumber: json.length
    });
  }

  prikazi(id1){
    this.setState({
      showMe: !this.state.showMe,
      id: id1.id
    })
  }

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  }

  handleMouseOver = () =>{
    this.setState({
      hover: !this.state.hover
    });
  }


  render() {
    const { value, Qnumber } = this.state;
    return (
     <Layout className="layout">
      <Content  className="table" style={{ padding: '0 50px' }} >
        <div class="AppQ">
          <div className="site-layout-content">
            <Table bordered dataSource={this.state.data}>
              <Column title="Number" dataIndex="id" key="id" width="7%"/>
              <Column title="Question" dataIndex="text" key="text" />
              <Column title="Date" dataIndex="date" width="9%"/>
              <Column title="Response" dataIndex="answer"/>
            </Table>
          </div>
          {
            this.state.showMe?null: <Editor  onChange1={this.handleChange} value={value} Qnumber={Qnumber}></Editor>
          }
        </div>
      </Content>
    </Layout>
    );
  }
}

export default Questions;
