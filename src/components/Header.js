import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <header style={headerStyle}>
            <link href="https://fonts.googleapis.com/css?family=Stoke&display=swap" rel="stylesheet"/>
                <h1>PUBLIC RELATIONS</h1>
            </header>
            <div style={navbarStyle}>
                <Link style={linkStyle} to="/">Home</Link>  |  <Link style={linkStyle} to="/products">Products</Link>  |  <Link style={linkStyle} to="/contact">Contact</Link>  |  <Link style={linkStyle} to="/questions">FAQ</Link>  |  <Link style={linkStyle} to="/questionask">Ask a Queston</Link>  |  <Link style={linkStyle} to="/login">Login</Link> 
            </div>
        </div>
    );
}

const navbarStyle = {
    background: "#330956",
    padding:'5px',
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

export default Header;
