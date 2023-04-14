import React, { useState } from "react";
import "../css/Customer.css";
import NavBar from "./customer-components/NavBar";
import Header from "./customer-components/Header";
import Product from "./customer-components/Product";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";
import ShoppingCart from "./customer-components/ShoppingCart";

const menuitems = [
  {
    id: 1,
    text: "Chicken Sandwich",
    price: 5.99,
    type: "entree",
    url: "https://www.cfacdn.com/img/order/menu/Online/Entrees/Jul19_CFASandwich_pdp.png",
  },
  {
    id: 2,
    text: "Chicken Sandwich",
    price: 5.99,
    type: "entree",
    url: "https://www.cfacdn.com/img/order/menu/Online/Entrees/Jul19_CFASandwich_pdp.png",
  },
  {
    id: 3,
    text: "Chicken Sandwich",
    price: 5.99,
    type: "entree",
    url: "https://www.cfacdn.com/img/order/menu/Online/Entrees/Jul19_CFASandwich_pdp.png",
  },
  {
    id: 4,
    text: "Chicken Sandwich",
    price: 5.99,
    type: "entree",
    url: "https://www.cfacdn.com/img/order/menu/Online/Entrees/Jul19_CFASandwich_pdp.png",
  },
  {
    id: 5,
    text: "Chick-fil-A® Lemonade",
    price: 6.99,
    type: "drink",
    url: "https://www.cfacdn.com/img/order/menu/Online/Drinks/lemonade_pdp.png",
  },
  {
    id: 6,
    text: "Side salad",
    price: 3.99,
    type: "sides",
    url: "https://www.cfacdn.com/img/order/menu/Online/Salads%26wraps/sswSalad_spicyGrilled_pdp.png",
  },
  {
    id: 7,
    text: "Brownie",
    price: 3.99,
    type: "Extra",
    url: "https://www.cfacdn.com/img/order/COM/Menu_Refresh/Treats/Treats%20PDP/031717_FudgeChunkBrownie_PDP.png",
  },
  {
    id: 8,
    text: "Seasonal Item",
    price: 3.99,
    type: "seasonal",
    url: "https://cdn-icons-png.flaticon.com/512/4698/4698319.png",
  },
];


var showOrderButton = true;

const Menu = ({menuTitle, menuItems, menuId, addToOrder}) => {
  return (
    <div>
      <Row>
        <h3 className="menu-item-heading">{menuTitle}</h3>
      </Row>
      <Row className="row-style">
        {menuItems.map((item) => (
          <Col key={item.id} sm={4} className="col-style">
            <Product product={item} indId={menuId} addProduct={addToOrder} flag={showOrderButton}/>
          </Col>
        ))}
      </Row>
    </div>
  );
};

function Customer() {
  const [menuitems, setMenuitems] = useState([]);
  const [order, setOrder] = useState([]);
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const addToOrder = (product) => setOrder([...order, product]);
  const [entree, setEntree] = useState([]);
  const [sides, setSides] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [extras, setExtras] = useState([]);
  const [seasonal, setSeasonal] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/menu')
      .then(response => response.json())
      .then(data => {
        setMenuitems(data)
        console.log(data)
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if(menuitems.length>0)
    {
        var _entree = [];
        var _sides = [];
        var _drinks = [];
        var _extras = [];
        var _seasonal = [];
      
        menuitems.forEach((item) => {
          switch (item.type) {
            case "entree":
              _entree.push(item);
              break;
            case "side":
              _sides.push(item);
              break;
            case "drink":
              _drinks.push(item);
              break;
            case "extra":
              _extras.push(item);
              break;
            default:
              _seasonal.push(item);
          }
        });
      
        setEntree(_entree);
        setSides(_sides);
        setDrinks(_drinks);
        setExtras(_extras);
        setSeasonal(_seasonal);
    }
  }, [menuitems]);

  return (
    <div>
      <NavBar />
      {order.length > 0 && (
        <div className="button-container">
          <div className="position-fixed" style={{zIndex: 99}}>
            <button
              className="button-effect"
              onClick={() => setShowShoppingCart(true)}
            >
              <span>Shopping Cart - {order.length}</span>
            </button>
          </div>
        </div>
      )}
      <Header />
      <Container>
        <Menu menuTitle="Entrees" menuItems={entree} menuId="entree" addToOrder={addToOrder} />
        <Menu menuTitle="Sides" menuItems={sides} menuId="sides" addToOrder={addToOrder} />
        <Menu menuTitle="Drinks" menuItems={drinks} menuId="drinks" addToOrder={addToOrder} />
        <Menu menuTitle="Extras" menuItems={extras} menuId="extras" addToOrder={addToOrder} />
        <Menu menuTitle="Seasonal" menuItems={seasonal} menuId="seasonal" addToOrder={addToOrder} />
      </Container>
      {showShoppingCart && (
        <ShoppingCart
          order={order}
          setOrder={setOrder}
          setShowModal={setShowShoppingCart}
        />
      )}
    </div>
  );
}

export default Customer;
