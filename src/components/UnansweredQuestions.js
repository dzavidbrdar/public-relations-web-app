import React, { Component } from "react";
import 'antd/dist/antd.css';
import logo1 from '../logo1.png';
import logo2 from '../logo2.png';
import { Avatar, Form, Button, Input, Layout, Table, Badge, message, Menu } from 'antd';
import '../UnansweredQuestions.css'

const { TextArea } = Input;
const { Column } = Table;
const { Header, Content } = Layout;
const Editor = ({ onChange, onChange1, onSubmit, value, Qnumber}) => (
    <div class="editor" >
      <Badge count={Qnumber}>
        <Avatar shape="square"size="large" style={{backgroundColor: 'rgb(1, 1, 43)'}}>Employee</Avatar> <br/><br/>
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
      hover: true,
      Qnumber: 0
    };
  }

  async componentDidMount() {
    const response = await fetch('https://main-server-si.herokuapp.com/api/questions');
    const json = await response.json();
    const filteredJson = json.filter(json => json.answer.text===null);
    this.setState({ 
      data:  filteredJson,
      Qnumber: json.length 
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

  function 

  handleSubmit = () => {
    if (!this.state.value) {
      message.warning('Input field is empty!');
      return;
    }

    this.setState({
        value: ''
    });

    var token = document.cookie; console.log(token);
    token = token.substring(23, token.length);

    fetch('https://main-server-si.herokuapp.com/api/questions/' + this.state.id +'/answer', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ` + token
      }, 
      body: JSON.stringify({
        text: this.state.value,
        username: 'dzavid',
      })
    })

  };

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

    <Content  className="table" style={{ padding: '30 30px' }} >
      <div class="AppQ">
        <div className="site-layout-content">
          <Table bordered dataSource={this.state.data}>
            <Column title="Number" dataIndex="id" key="id" width="7%"/>
            <Column title="Question" dataIndex="text" key="text" />
            <Column title="Response" dataIndex="answer" key="answer"/>
            <Column title="Action" key="id" width="10%"
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
    </Layout>
    );
  }
}

export default UnansweredQuestions;