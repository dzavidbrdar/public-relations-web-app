import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Menu, Dropdown, Spin } from "antd";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 700
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  }
}));

const noviRed = <br></br>;

export default function ProductsList() {

  const classes = useStyles();
  const url = 'https://main-server-si.herokuapp.com/api/products';
  const [products, setProducts] = useState([]);
  const [cards, setCards] = useState([]);
  const [redirectToCommentPost, setRedirectToCommentPost] = useState(false);
  const [redirectToProductComments, setRedirectToProductComments] = useState(false);
  const [loading, setLoading] = useState(true);
  const [trebaPozvatiFetch, setTrebaPozvatiFetch] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [wayOfSorting, setWayOfSorting] = useState("none");
  const [cardsHigherToLower, setCardsHigherToLower] = useState([]);
  const [cardsLowerToHigher, setCardsLowerToHigher] = useState([]);

  const makeCardsList = (productsTemp) => {
    let cardsListToReturn = productsTemp.map(function(product) {
     const oldProductPrice = product.price;
     const newProductPrice = oldProductPrice - (oldProductPrice * (product.discount.percentage / 100));
     const newRoundedPrice = Math.round(newProductPrice * 100) / 100;
     const newPriceWithUnit = newRoundedPrice + " " + "KM";
     const productDisplayName = product.name;
     const productDisplayPrice = newPriceWithUnit;
     const productDisplayDescription = product.description;
     const productDisplayImage = product.image;
     let cardObject = <Card className={classes.paper}>
       <Grid container spacing={2}>
         <Grid item>
           <ButtonBase className={classes.image}>
             <img
               className={classes.img}
               alt="slika"
               src={productDisplayImage}
             />
           </ButtonBase>
         </Grid>
         <Grid item xs={12} sm container>
           <Grid item xs container direction="column" spacing={2}>
             <Grid item xs>
               <Typography gutterBottom variant="subtitle1" align="left">
                 {productDisplayName}
               </Typography>
               <Typography variant="body2" color="textSecondary" align="left">
                 {productDisplayDescription}
               </Typography>
               <br />
               <ButtonGroup
                 size="small"
                 color="primary"
                 aria-label="contained primary button group"
               >
                  <Button onClick={() => {
                   setSelectedProductId(product.id);
                   setSelectedProductName(product.name);
                   setRedirectToProductComments(true);
                  }}>View Comments</Button>
                 <Button onClick={() => {
                   setSelectedProductId(product.id);
                   setSelectedProductName(product.name);
                   setRedirectToCommentPost(true);
                  }}>Leave a Comment</Button>
               </ButtonGroup>
             </Grid>
           </Grid>
           <Grid item>
             <Typography variant="subtitle1">{productDisplayPrice}</Typography>
           </Grid>
         </Grid>
       </Grid>
     </Card>;
     let cardObjectWithNewLine = <div>{cardObject}{noviRed}</div>;
     return cardObjectWithNewLine;
    });
    return cardsListToReturn;
  };

  const handleMenuClick = (e) => {
    console.log("item clicked " + e.key);
    const clickedItemIndex = e.key;
    if (clickedItemIndex == "1") {
      setWayOfSorting("none");
    }
    else if (clickedItemIndex == "2") {
      setWayOfSorting("higherFirst");
    }
    else if (clickedItemIndex == "3") {
      setWayOfSorting("lowerFirst");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">None</Menu.Item>
      <Menu.Item key="2">Price (higher to lower)</Menu.Item>
      <Menu.Item key="3">Price (lower to higher)</Menu.Item>
    </Menu>
  );

  const fetchProducts = (async () => {
    const productsData = await fetch(url);
    const productsTemp = await productsData.json();
    const cardsTemp = makeCardsList(productsTemp);
    let productsHigherToLowerTemp = productsTemp;
    productsHigherToLowerTemp.sort((firstProduct, secondProduct) => {
      const oldProductPrice1 = firstProduct.price;
      const newProductPrice1 = oldProductPrice1 - (oldProductPrice1 * (firstProduct.discount.percentage / 100));
      const newRoundedPrice1 = Math.round(newProductPrice1 * 100) / 100;
      const oldProductPrice2 = secondProduct.price;
      const newProductPrice2 = oldProductPrice2 - (oldProductPrice2 * (secondProduct.discount.percentage / 100));
      const newRoundedPrice2 = Math.round(newProductPrice2 * 100) / 100;
      return newRoundedPrice2 - newRoundedPrice1;
    });
    const cardsHigherToLowerTemp = makeCardsList(productsHigherToLowerTemp);
    setCardsHigherToLower(cardsHigherToLowerTemp);
    let productsLowerToHigherTemp = productsHigherToLowerTemp;
    productsLowerToHigherTemp.reverse();
    const cardsLowerToHigherTemp = makeCardsList(productsLowerToHigherTemp);
    setCardsLowerToHigher(cardsLowerToHigherTemp);
    setProducts(productsTemp);
    setCards(cardsTemp);
    setLoading(false);
    setTrebaPozvatiFetch(false);
  });

  useEffect(() => {
      if (trebaPozvatiFetch) fetchProducts();
  });


  if (redirectToCommentPost) {
    return (<Redirect to = {{
        pathname: '/postComment',
        state: { productName: selectedProductName, id: selectedProductId }}}/>
    );
  }

  if (redirectToProductComments) {
    return (<Redirect to = {{
      pathname: '/productComments',
      state: { productName: selectedProductName, id: selectedProductId }}}/>
    );
  }

  if (wayOfSorting == "higherFirst") {
    let dropdownZaFilter = <Dropdown.Button overlay={menu}>Sort by</Dropdown.Button>;
    let listaKartica = <div className={classes.root}><ul>{cardsHigherToLower}</ul></div>;
    let listaIDropdown = <div>{dropdownZaFilter}{noviRed}{noviRed}{listaKartica}</div>;
    return (
      <div>
        <h1>Catalog</h1>
        { loading ? <Spin size="large" /> : <div>{listaIDropdown}</div> }
      </div>
    );
  }
  else if (wayOfSorting == "lowerFirst") {
    let dropdownZaFilter = <Dropdown.Button overlay={menu}>Sort by</Dropdown.Button>;
    let listaKartica = <div className={classes.root}><ul>{cardsLowerToHigher}</ul></div>;
    let listaIDropdown = <div>{dropdownZaFilter}{noviRed}{noviRed}{listaKartica}</div>;
    return (
      <div>
        <h1>Catalog</h1>
        { loading ? <Spin size="large" /> : <div>{listaIDropdown}</div> }
      </div>
    );
  }
  else {
    let dropdownZaFilter = <Dropdown.Button overlay={menu}>Sort by</Dropdown.Button>;
    let listaKartica = <div className={classes.root}><ul>{cards}</ul></div>;
    let listaIDropdown = <div>{dropdownZaFilter}{noviRed}{noviRed}{listaKartica}</div>;
    return (
      <div>
        <h1>Catalog</h1>
        { loading ? <Spin size="large" /> : <div>{listaIDropdown}</div> }
      </div>
    );
  }
}
