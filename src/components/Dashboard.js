import React, { Component } from 'react';
import SaleCarousel from './SaleCarousel.js';

class Dashboard extends Component {
    state = {  }
    render() { 
        return (  
            <h1>
                <SaleCarousel />
            </h1>
        );
    }
}
 
export default Dashboard;