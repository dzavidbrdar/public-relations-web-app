import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
//updatovala sam formu al fali jos kupljene i filtriranje pdoataka
class SaleCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    componentDidMount() {
        fetch('https://main-server-si.herokuapp.com/api/products?fbclid=IwAR0pgaS1MsBciio5y-0CiBcR_49Z-b0zDUuEo8EubzMhuZg4fAOrFvf0ofk')
            .then(res => res.json())
            .then(json => {
                const itemsOnSale = [];
                json.forEach(element => {
                    if (element.discount.percentage > 0) itemsOnSale.push(element);
                });
                this.setState({ items: itemsOnSale });
            }
            );
    }

    render() {
        const { items } = this.state;
        if (items.length != 0)
            return (
                <div>
                    <link href="https://fonts.googleapis.com/css?family=Stoke&display=swap" rel="stylesheet" />
                    <h3 style={SaleHeading1}>SPECIAL </h3>
                    <h3 style={SaleHeading2}>OFFER</h3>
                    <h5 style={Motivation}>Spend more, save more</h5>
                    <div style={MainDiv}>
                        <div style={GalleryStyle}>
                            <Carousel>
                                {items.map((item) =>
                                    <div >
                                        <img src={item.image} alt={item.name} />
                                        <p className='legend'>
                                            <h4 style={OldPrice}>{item.price.toFixed(2)}{item.unit}</h4>
                                            <h4 style={Percentage}> {item.discount.percentage}% OFF</h4>
                                            <h4 style={NewPrice}>{(item.price * (100 - item.discount.percentage) / 100).toFixed(2)}{item.unit}</h4>
                                        </p>
                                    </div>)
                                }
                            </Carousel>
                        </div>
                    </div >
                </div>
            );
        else
            return (
                <div>
                    <h5 style={Motivation}>Currently no items are on sale. <br></br>Come back soon, we are preparing some special offers for you!</h5>
                </div>
            );
    }
}

const MainDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}
const SaleHeading1 = {
    fontSize: '35px',
    color: '#C70039',
    margin: '0px',
    padding: '0px'
}
const SaleHeading2 = {
    fontSize: '55px',
    color: '#C70039',
    margin: '0px',
    padding: '0px 0px 10px 0px'
}
const Motivation = {
    fontSize: '17px',
    fontFamily: 'Stoke',
    textDecoration: 'italic',
    margin: '0px 0px 20px 0px',
    padding: '0px'
}
const GalleryStyle = {
    width: '400px'
}
const OldPrice = {
    color: "#E8EEF2",
    fontSize: '18px',
    textDecoration: 'line-through'
}
const Percentage = {
    color: "#C70039",
    fontSize: '35px',
    margin: '0px',
    padding: '0px'
}
const NewPrice = {
    color: "#C70039",
    fontSize: '30px',
    margin: '10px',
    padding: '0px'
}
export default SaleCarousel;