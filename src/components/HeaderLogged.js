import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function HeaderLogged() {
    const linkComments = <Link style={linkStyle} to="/commentReview">Comment Review</Link>;
    const linkUnansweredQuestions = <Link style={linkStyle} to="/unansweredQuestions">Answer Questions</Link>;
    const avatarSlika = <div><Avatar size="large" icon={<UserOutlined />} style={{ fontSize: '17px', color: 'white', backgroundColor: '#4272f5', marginRight: '5px' }} /></div>;
    const wellcome = <h4 style={blackStyle}>Welcome!</h4>
    return (
        <div>
            <header style={headerStyle}>
                <link href="https://fonts.googleapis.com/css?family=Stoke&display=swap" rel="stylesheet" />
                <h1>PUBLIC RELATIONS</h1>
            </header>
            <div style={navbarStyle}>
                <div id="navbar" style={linkoviStyle}>{linkUnansweredQuestions}  |  {linkComments}</div>
                <div style={loginStyle}>{avatarSlika}{wellcome}</div>
            </div>
        </div>
    );
}

const blackStyle = {
    color: 'black',
    fontSize: '17px',
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
    padding: '10px',
    color: "#E8EEF2"
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
    padding: '10px',
    color: '#fff',
    textDecoration: 'none'
}

const naslovStyle = {
    fontFamily: 'Arial'
}

export default HeaderLogged;
