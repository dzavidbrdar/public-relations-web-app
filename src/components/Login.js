import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'
import '../QuestionAsk.css';
import { Button } from 'antd';

class Login extends React.Component {
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
      username: '',
      pass: '',
      errormessage: '',
      odg:'',
      redirect:false,
      ulogovan:false,
      token:''
    }
  }

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err='';
    let regUsername=/^[a-zA-Z0-9]+$/;
    let regPass=/^[a-zA-Z0-9!@#$&*]+$/;
    if (nam === "username" && !regUsername.test(val)) err=<p class="obavijest">Username can contain only letters or numbers</p>;
    if (nam === "pass" && !regPass.test(val)) err=<p class="obavijest">Password can contain only letters, numbers or these characters: !,@,#,$,&,*</p>;
    this.setState({errormessage:err});
    this.setState({[nam]: val});
  }

  loginAjax=(sim)=>{
    //simulacija
    if(sim===1){

    }
    else{
      console.log("pozvana");
      var ajax=new XMLHttpRequest();
      ajax.onreadystatechange=()=>{
        if (ajax.readyState == 4 && ajax.status == 200){
          let aodg=ajax.responseText;
          console.log(aodg);
          this.setState({ulogovan:true});
          this.setState({odg:aodg});
          this.setState({redirect:true});
          let odgObjekat=JSON.parse(aodg);
          let odgToken=odgObjekat.token;
          let odgPrivilegovan="false";
          if(odgObjekat.profile.roles.length==2) odgPrivilegovan="true";
          //if(odgObjekat)
          document.cookie="username="+this.state.username;
          document.cookie="token="+odgToken;
          document.cookie="priv="+odgPrivilegovan;
        }
        if (ajax.readyState == 4 && ajax.status == 404)
          console.log('greska 404');
        if(ajax.readyState == 4 && ajax.status == 401) {
          let err=<p class="obavijest">The username or password is incorrect</p>;
          this.setState({errormessage:err});
        }

      }
      ajax.open("POST", "https://main-server-si.herokuapp.com/api/auth/login", true);
      ajax.setRequestHeader("Content-Type", "application/json");
      let objekat={username:this.state.username,password:this.state.pass,role:'ROLE_PRW'};
      ajax.send(JSON.stringify(objekat));
    }
  }

  submitHandler=(event)=>{
    event.preventDefault();
    console.log("pozvana");
    //validacija
    let user=this.state.username;
    let pass=this.state.pass;
    let regUsername=/^[a-zA-Z0-9]+$/;
    let regPass=/^[a-zA-Z0-9!@#$&*]+$/;
    let err='';
    if(user==='') err=<p class="obavijest">Username cannot be empty</p>;
    else if(!regUsername.test(user)) err=<p class="obavijest">Username can contain only letters or numbers</p>;
    else if(pass==='') err=<p class="obavijest">Password cannot be empty</p>;
    else if(!regPass.test(pass)) err=<p class="obavijest">Password can contain only letters, numbers or these characters: !,@,#,$,&,*</p>;
    if(err!='') this.setState({errormessage:err});
    else this.loginAjax(0);
  }

  renderRedirect=()=>{
    if(this.state.redirect)
      return <Redirect to='/unansweredQuestions' />;
  }

  render(){
    return(
      <form onSubmit={this.submitHandler}>
      {this.renderRedirect()}
      <h1>Login</h1>
      <input type="text" name="username" onChange={this.changeHandler} style={inputStyle} placeholder="Username"/>
      <input type="password" name="pass" onChange={this.changeHandler} style={inputStyle} placeholder="Password"/>
      {this.state.errormessage}
      <Button type="primary" htmlType="submit">Submit</Button>
      {this.state.odg}
      </form>
    );
  }
}
const inputStyle={
  borderRadius: '0.3em',
  padding: '0.2em',
  width: '17em',
  height: '2em',
  display: 'block',
  margin: '1em auto 1em auto',
  fontSize: 'large'
}
const btnStyle={
  backgroundColor: 'rgb(51, 9, 86)',
  cursor: 'pointer',
  width: '7em',
  height: '2em',
  margin: 'auto',
  color: 'rgb(232, 238, 242)',
  borderColor: 'rgb(99, 26, 121)',
  borderRadius: '1em'
}
export default Login;
