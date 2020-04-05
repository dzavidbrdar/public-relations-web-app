import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state={
      logged:false
    }
  }
  static getDerivedStateFromProps(props, state) {
    if(getCookie("token")!="") return{logged:true};
    else return{logged:false};
  }
  changeLogged=(stanje)=>{
    console.log('pozvana changeLogged()');
    if(stanje!=this.state) this.setState({logged:stanje});
  }
  render(){
    if(this.state.logged){
      return (
        <div>
            <header style={headerStyle}>
            <link href="https://fonts.googleapis.com/css?family=Stoke&display=swap" rel="stylesheet"/>
                <h1>PUBLIC RELATIONS</h1>
            </header>
            <div style={navbarStyle}>
                <div style={linkoviStyle}>{linkHome}  |  {linkProducts}  |  {linkUnansweredQuestions}</div>
                <div style={loginStyle}>{avatarSlika}{linkLogout}</div>
            </div>
        </div>
      );
    }
    else
      return (
        <div>
            <header style={headerStyle}>
            <link href="https://fonts.googleapis.com/css?family=Stoke&display=swap" rel="stylesheet"/>
                <h1>PUBLIC RELATIONS</h1>
            </header>
            <div style={navbarStyle}>
                <div style={linkoviStyle}>{linkHome}  |  {linkProducts}  |  {linkContact}  |  {linkQuestions}  |  {linkAsk}</div>
                <div style={loginStyle}>{avatarSlika}{linkLogin}</div>
            </div>
        </div>
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

const blackStyle = {
    color: 'black',
    fontSize: '17px'
}

const linkoviStyle = {
    display: 'inline'
}

const loginStyle = {
    position: 'absolute',
    right: '40px',
    top: '25px',
    display: 'inline'
}

const navbarStyle = {
    background: "#330956",
    /*background: "#26272b",*/
    padding:'10px',
    color:'#E8EEF2'
}

const headerStyle = {
    background: '#E8EEF2',
    color: '#330956',
    textAlign: 'center',
    padding: '2px',
    fontFamily: 'Stoke',
    fontSize: '20px'
}

const linkStyle = {
    padding:'10px',
    color: '#fff',
    textDecoration: 'none'
}

const naslovStyle = {
    fontFamily: 'Arial'
}

let logOut=()=>{
  document.cookie="username=";
  document.cookie="token=";
}
const linkHome = <Link style={linkStyle} to="/">Home</Link>;
const linkProducts = <Link style={linkStyle} to="/products">Products</Link>;
const linkContact = <Link style={linkStyle} to="/contact">Contact</Link>;
const linkQuestions = <Link style={linkStyle} to="/questions">Q&A</Link>;
const linkAsk = <Link style={linkStyle} to="/questionask">Ask a Queston</Link>;
const avatarSlika = <Avatar size="large" style={{ fontSize: '17px', color: 'white', backgroundColor: '#4272f5', marginRight: '5px' }}>?</Avatar>;
const linkLogin = <Link style={blackStyle} to="/login">Log in</Link>;

const linkUnansweredQuestions = <Link style={linkStyle} to="/unansweredQuestions">Answer Questions</Link>;
const linkLogout = <Link style={blackStyle} to="/" onClick={logOut}>Log out</Link>;

export default Header;
