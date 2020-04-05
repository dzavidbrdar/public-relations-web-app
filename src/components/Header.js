import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

function Header() {
    const linkHome = <Link style={linkStyle} to="/">Home</Link>;
    const linkProducts = <Link style={linkStyle} to="/products">Products</Link>;
    const linkContact = <Link style={linkStyle} to="/contact">Contact</Link>;
    const linkQuestions = <Link style={linkStyle} to="/questions">Q&A</Link>;
    const linkAsk = <Link style={linkStyle} to="/questionask">Ask a Queston</Link>;
    const avatarSlika = <Avatar size="large" style={{ fontSize: '17px', color: 'white', backgroundColor: '#4272f5', marginRight: '5px' }}>?</Avatar>;
    const linkLogin = <Link style={blackStyle} to="/login">Log in</Link>;
    const linkComments = <Link style={linkStyle} to="/commentsPublic">Comments</Link>;

    return (
        <div>
            <header style={headerStyle}>
            <link href="https://fonts.googleapis.com/css?family=Stoke&display=swap" rel="stylesheet"/>
                <h1>PUBLIC RELATIONS</h1>
            </header>
            <div style={navbarStyle}>
                <div style={linkoviStyle}>{linkHome}  |  {linkProducts}  |  {linkComments}  |  {linkContact}  |  {linkQuestions}  |  {linkAsk}</div>
                <div style={loginStyle}>{avatarSlika}{linkLogin}</div>
            </div>
        </div>
    );
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
    padding:'10px',
    color:"#E8EEF2"
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

export default Header;
