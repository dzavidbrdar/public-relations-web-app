import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom'

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
    if (nam === "username" && !regUsername.test(val)) err=<p>Username can contain only letters or numbers</p>;
    if (nam === "pass" && !regPass.test(val)) err=<p>Password can contain only letters, numbers or these characters: !,@,#,$,&,*</p>;
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
          //
          let odgObjekat=JSON.parse(aodg);
          let odgToken=odgObjekat.token;
          document.cookie="username=dzavid";
          document.cookie="token="+odgToken; console.log(odgToken);
        }
        if (ajax.readyState == 4 && ajax.status == 404)
          console.log('greska 404');
      }
      ajax.open("POST", "https://main-server-si.herokuapp.com/api/auth/login", true);
      //ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      ajax.setRequestHeader("Content-Type", "application/json");
      //ajax.send("{username=public1&password=password&role=ROLE_PRW}");
      let objekat={username:'dzavid',password:'dzavid',role:'ROLE_PRW'};
      //let objekat={user:'root',password:'password'};
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
    if(user==='') err=<p>Username cannot be empty</p>;
    else if(!regUsername.test(user)) err=<p>Username can contain only letters or numbers</p>;
    else if(pass==='') err=<p>Password cannot be empty</p>;
    else if(!regPass.test(pass)) err=<p>Password can contain only letters, numbers or these characters: !,@,#,$,&,*</p>;
    if(err!='') this.setState({errormessage:err});
    else this.loginAjax(0);
  }

  renderRedirect=()=>{
    if(this.state.redirect)
      return <Redirect to='/unansweredQuestions' />;
  }

  render(){
    /*{this.renderRedirect}*/
    return(
      <form onSubmit={this.submitHandler}>
      {this.renderRedirect()}
      <h1>Login</h1>
      <input type="text" name="username" onChange={this.changeHandler} style={inputStyle} placeholder="username"/>
      <br/>
      <input type="password" name="pass" onChange={this.changeHandler} style={inputStyle} placeholder="password"/>
      <br/>
      {this.state.errormessage}
      <input type="submit" value="Login" style={btnStyle}/>
      {this.state.odg}
      </form>
    );
  }
  //
}
const inputStyle={
  width:'30%',
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '12px 20px',
  margin: '8px 0',
  boxSizing: 'border-box'
}
const btnStyle={
  backgroundColor: '#cccccc',
  border: 'none',
  padding: '12px 32px',
  textDecoration: 'none',
  margin: '4px 2px',
  cursor: 'pointer'
}
export default Login;
