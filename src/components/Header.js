import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';


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
            <div>
                <header style={headerStyle}>
                    <h1 style={{ color: 'white', margin: 0, fontSize: '55px', lineHeight: '40px', paddingTop: '30px', textShadow: 'black 5px 5px 3px'}}>Public Relations</h1>
                    <h2 style={{color: 'white', opacity: '0.6', fontSize: '20px', margin: 0, lineHeight: '35px', paddingLeft: '150px'}}>#weStandByYourSide!</h2>
                </header>
            </div>
            <div style={navbarStyle}>
                <div style={linkoviStyle}> {linkHome}  |  {linkProducts}  |  {linkCommentReview}  |  {linkUnansweredQuestions}</div>
               <div style={loginStyle}>{avatarSlika}  {linkLogout}</div>

            </div>
        </div>
      );
    }
    else
      return (
        <div>
            <div>
                <header style={headerStyle}>
                    <h1 style={{ color: 'white', margin: 0, fontSize: '55px', lineHeight: '40px', paddingTop: '30px', textShadow: 'black 5px 5px 3px'}}>Public Relations</h1>
                    <h2 style={{color: 'white', opacity: '0.6', fontSize: '20px', margin: 0, lineHeight: '35px', paddingLeft: '150px'}}>#weStandByYourSide!</h2>
                </header>
            </div>
            <div style={navbarStyle}>
                <div style={linkoviStyle}> {linkHome}  |  {linkProducts} | {linkProductsList} |  {linkComments}  |  {linkContact}  |  {linkQuestions}  |  {linkAsk}</div>
               <div style={loginStyle}>{avatarSlika}  {linkLogin}</div>

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
    color: 'white',
    fontFamily: 'Trebuchet MS',
    fontSize: '17px',
    opacity: '0.85'
}

const linkoviStyle = {
    display: 'inline',
    wordSpacing: '10px',
    fontSize: '16px',
    opacity: '0.85'
}

const loginStyle = {
    position: 'absolute',
    right: '40px',
    top: '40px',
    display: 'inline'
}

const navbarStyle = {
    background: 'rgba(0,109,117,1)',
    //background: 'rgba(0,24,144,255)',
    //background: 'rgba(24,144,255,1)',
    padding:'10px',
    color:"#E8EEF2",
    fontFamily: 'Trebuchet MS',
    fontSize: '15px',
    width: '100vw'
}

const headerStyle = {
    background: 'rgb(0,35,41)',
    //background: 'rgb(0,16,97)',
    background: 'linear-gradient(180deg, rgba(0,35,41,1) 0%, rgba(0,109,117,1) 100%)',
    //background: 'linear-gradient(180deg, rgba(0,16,97,163) 20%, rgba(0,24,144,255) 70%)',
    //background: 'rgb(2,0,36)',
    //background: 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 50%, rgba(0,212,255,1) 100%)',
    //background: 'rgb(2,0,36)',
    //background: 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(7,56,152,1) 60%, rgba(24,144,255,1) 100%)',
    //background: 'rgb(34,193,195)',
    //background: 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
    //background: 'rgb(24,144,255)',
    //background: 'linear-gradient(0deg, rgba(24,144,255,1) 0%, rgba(253,187,45,1) 100%)',
    color: '#330956',
    textAlign: 'left',
    paddingTop: '15px',
    paddingLeft: '50px',
    fontFamily: 'Trebuchet MS'
}

const linkStyle = {
    padding:'10px',
    color: '#fff',
    textDecoration: 'none'
}

let logOut=()=>{
  document.cookie="username=";
  document.cookie="token=";
}

const linkHome = <Link class="effect-underline" style={linkStyle} to="/">Home</Link>;
const linkProducts = <Link class="effect-underline" style={linkStyle} to="/products">Gallery</Link>;
const linkContact = <Link class="effect-underline" style={linkStyle} to="/contact">Contact</Link>;
const linkQuestions = <Link class="effect-underline" style={linkStyle} to="/questions">Q&A</Link>;
const linkAsk = <Link class="effect-underline" style={linkStyle} to="/questionask">Ask a Question</Link>;
//const avatarSlika = <Avatar class="effect-underline" size="medium" shape= "square" icon={<UserOutlined />} style = {{background: '#f56a00'}}></Avatar>;
const avatarSlika = <Avatar class="effect-underline" size="medium" shape= "square" icon={<UserOutlined />} style = {{background: '#1890ff'}}></Avatar>;
const linkLogin = <Link class="effect-underline" style={blackStyle} to="/login">Log in</Link>;
const linkComments = <Link class="effect-underline" style={linkStyle} to="/commentsPublic">Comments</Link>;

const linkUnansweredQuestions = <Link class="effect-underline" style={linkStyle} to="/unansweredQuestions">Answer Questions</Link>;
const linkCommentReview = <Link class="effect-underline" style={linkStyle} to="/commentReview">Review Comments</Link>;
const linkLogout = <Link class="effect-underline" style={blackStyle} to="/" onClick={logOut}>Log out</Link>;
const linkProductsList = <Link class="effect-underline" style={linkStyle} to="/productsList">Products</Link>;


export default Header;
