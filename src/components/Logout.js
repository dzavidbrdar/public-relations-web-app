import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'
import { Button } from 'antd';

class Logout extends React.Component {
  //3 faze:mounting, updating, unmounting
  /*1)mounting:1.constructor,2.getderivatedstatefromprops,3.render,4.componentdidmount
    2)updating:1.getderivatedstatefromprops,2.shouldComponentUpdate(),3.render(),4.getSnapshotBeforeUpdate(),5.componentDidUpdate()
    3)unmounting:1.componentWillUnmount()
  */
  //metode
  //constructor
  constructor(props){
    super(props);
    this.state={
      kliknuto:false
    }
  }
  renderRedirect=()=>{
    if(this.state.kliknuto)
      return <Redirect to='/' />;
  }
  btnHandler=(event)=>{
    event.preventDefault();
    document.cookie="username=";
    document.cookie="token=";
    this.setState({kliknuto:true});
  }
  render(){
    return(
      <div>
      {this.renderRedirect()}
      <Button type="primary" onClick={this.btnHandler} style={btnStyle}>Log out</Button>
      </div>
    );
  }
}
const btnStyle={
  margin: '1em auto 1em auto'
}
export default Logout;
