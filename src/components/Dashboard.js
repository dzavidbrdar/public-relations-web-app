import React, { Component } from 'react';
import SaleCarousel from './SaleCarousel.js';

class Dashboard extends Component {
  constructor() {
    super();
  }
  static getDerivedStateFromProps(props, state) {
    if(getCookie("token")=="") props.headerHandler(false);//zbog refresha..
  }
    render() {
        return (
            <h1>
                <SaleCarousel />
            </h1>
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
export default Dashboard;
