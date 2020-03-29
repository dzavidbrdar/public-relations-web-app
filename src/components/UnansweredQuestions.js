import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Table, Tag } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
//import './index.css';
import 'antd/dist/antd.css';
import '../UnansweredQuestions.css'

//const { Title } = Typography;
const { Column } = Table;
const { Header, Footer, Sider, Content } = Layout;
class UnansweredQuestions extends Component {
  constructor() {
    super();
    this.state = { data: [] };
    

  }
  async componentDidMount() {
    const response = await fetch('https://main-server-si.herokuapp.com/api/questions');
    const json = await response.json();
    const filteredJson = json.filter(json => json.answer.text===null);
    this.setState({ data:  filteredJson});
  }

  render() {
  
    return (
      
   <Layout className="layout">
    <Header>
  
      <Menu
        theme="dark"
        mode="horizontal"
        selectable="true"
        defaultSelectedKeys={['2']}
      >

        <Menu.Item className="MenuItem" key="1" ></Menu.Item>
        
      </Menu>
    </Header>

    <Content  className="table" style={{ padding: '0 50px' }} >
      
      <div className="site-layout-content">
      <Table bordered dataSource={this.state.data}>
     
       <Column title="Number" dataIndex="id" key="id" width="7%"/>
      <Column title="Question" dataIndex="text" key="text" />
      <Column title="Author's email" dataIndex="authorEmail" key="authorEmail" width="11%"/>
      <Column title="Date" dataIndex="date" key="date" width="9%"/>
      <Column title="Response" dataIndex="answer" key="answer"/>
 
      <Column
        title="Action"
        key="id"
        width="9%"
        
        render={(text, record) => (
          <span>
            <a href={"https://c2.etf.unsa.ba/"+record.id}>Reply</a>
          </span>
        )}
      />
        
      </Table>

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Public Relations Web Application</Footer>
      </Layout>
    );
    
  }
}

export default UnansweredQuestions;

//ReactDOM.render(<App />, document.getElementById('root'));