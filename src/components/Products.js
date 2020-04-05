import React, { useState, useEffect } from 'react';
import Gallery from 'react-grid-gallery';
import { Spin, Button } from 'antd';
import { Redirect } from "react-router-dom";

function Products() {

    const url = 'https://main-server-si.herokuapp.com/api/products';
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    const [redirectaj, setRedirectaj] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
    const thumbnailWidth = 500;
    const thumbnailHeight = 400;

    const fetchProducts = (async () => {
        const productsData = await fetch(url);
        const productsTemp = await productsData.json();
        const imagesTemp = products.map(function(product) {
            let imageObject = {};
            const oldProductPrice = product.price;
            const newProductPrice = oldProductPrice - (oldProductPrice * (product.discount.percentage / 100));
            const newRoundedPrice = Math.round(newProductPrice * 100) / 100;
            const newPriceWithUnit = newRoundedPrice + " " + "KM";
            imageObject.src = product.image;
            imageObject.thumbnail = product.image;
            imageObject.thumbnailWidth = thumbnailWidth;
            imageObject.thumbnailHeight = thumbnailHeight;
            imageObject.tags = [{value: product.name, title: product.name}, {value: newPriceWithUnit, title: newPriceWithUnit}];
            imageObject.caption = product.name + " (" + newPriceWithUnit + ")";
            return imageObject;
        });
        setProducts(productsTemp);
        setImages(imagesTemp);
        setLoading(false);
    });

    useEffect(() => {
        fetchProducts();
    });

    const galerija = <Gallery images={images} margin={10} 
    currentImageWillChange={(index) => { setCurrentPictureIndex(index); }} 
    customControls={[
        <Button type="primary" onClick={() => { setRedirectaj(true); }}>Leave a Comment</Button>
    ]}/>;

    if (redirectaj) {
        return (<Redirect to = {{ 
            pathname: '/postcomment', 
            state: { productName: products[currentPictureIndex].name, id: products[currentPictureIndex].id }}}/>
        );
    }
    
    return (
        <div>
            <h1>Catalog</h1>
            { loading ? <Spin size="large" /> : <div style={frameStyle}>{galerija}</div> }
        </div>
    );
}

const frameStyle = {
    marginRight: "50px",
    marginLeft: "50px"
}

export default Products;