import React, { Component , useState} from "react";
import 'antd/dist/antd.css';
import {Row,Comment, Divider, Col, Rate, Statistic} from 'antd';
import { LikeOutlined } from '@ant-design/icons';
//import './Drawer.css';




class SeeReview extends Component {
  constructor() {
    super();
    this.state = {
      data: []

    };
  }
  
  
  
  async componentDidMount() {
    const response = await fetch('https://main-server-si.herokuapp.com/api/reviews/');
    const json = await response.json();
    //var idPoslovnica=this.props.valueFromParent.id;
    //const filteredJson = json.filter(json => json.office.id==idPoslovnica)
    this.setState({
      data: json
    });

  }
  
  render() {
 //const filteredJson=json.filter(json=>json.id===this.props.valueFromParent.id)
    const items = []
        this.state.data.forEach(element => {if(element.office.id==this.props.valueFromParent.id){
          
            items.push(
                <Col className="gutter-row" span={24}>
                    <Comment 
                   
                author={element.firstName + " "+ element.lastName}
                
                content={
                    <p>
                        <br/>
                    <Rate disabled defaultValue={element.starReview} />
                    <br/>
                    {element.text}
         
                    </p>
                   
                }
               //datetime={this.props.valueFromParent.starReview}
              
                style={ { fontWeight: 'Medium', textAlign:"left"} }               
            >

            </Comment>
            <Divider orientation="left"/>
            </Col>
           
            )
              }
        })
   
    return (
      <div>
    <Statistic title = "Reviews" value = {items.length}/> 
    
        <Row>  
        
            {items}         
        </Row>
      
        </div> 
    );
  
  }
}

export default SeeReview;
