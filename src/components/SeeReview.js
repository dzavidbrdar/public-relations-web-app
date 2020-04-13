import React, { Component} from "react";
import 'antd/dist/antd.css';
import {Row, Tooltip, Comment, Divider, Col, Rate, Statistic} from 'antd';
import { createElement} from 'react';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';


class SeeReview extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      likes: [],
      actions: []
    };
    this.liked = this.liked.bind(this);
  }
  
  async componentDidMount() {
    const response = await fetch('https://main-server-si.herokuapp.com/api/reviews/');
    const json = await response.json();
    var lajkovi = [];
    var akcije = [];
    json.forEach(element => {
      lajkovi[element.id] = element.likes;
      akcije[element.id] = false;
    });
    this.setState({
      data: json,
      likes: lajkovi,
      actions: akcije
    });
  }

  liked(event, id){
    console.log('lajkano');
    var newActions = this.state.actions;
    var newLikes = this.state.likes;
    if(!newActions[id]){
      newActions[id] = true;
      newLikes[id]++;
      //post
      const requestOptions = {
        method: 'PUT'
      };
      fetch('https://main-server-si.herokuapp.com/api/reviews/' + id + '/likes', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
    }
    this.setState({
      likes: newLikes,
      actions: newActions
    });
  }
  
  render() {
    const items = []
    this.state.data.forEach(element => {
      if(element.office.id==this.props.valueFromParent.id){
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
                <br/>
                <span key="comment-basic-like">
                <Tooltip title="Like">
                  {createElement(this.state.actions[element.id] === true ? LikeFilled : LikeOutlined, {onClick: (event) => this.liked(event, element.id)})}
                </Tooltip>
                <span className="comment-action">{this.state.likes[element.id]}</span>
                </span>
                </p>
              }
              style={ { fontWeight: 'Medium', textAlign:"left"} }               
              >

        </Comment>
        <Divider orientation="left"/>
        </Col>
       
        )}    
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
