import React, { useState, useEffect } from "react";
import "../css/Customer.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "./customer-components/Product";
import Container from "react-bootstrap/Container";

const MenuItem = ({ menuTitle, menuItems, menuId, addToOrder }) => {
  return (
    <div>
      <Row>
        <h3 className="menu-item-heading">{menuTitle}</h3>
      </Row>
      <Row className="row-style">
        {menuItems.map((item) => (
          <Col key={item.id} sm={2} className="col-style">
            <Product
              product={item}
              indId={menuId}
              addProduct={addToOrder}
              flag={false}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

function Menu() {
  const [menuitems, setMenuitems] = useState([]);
  const [entree, setEntree] = useState([]);
  const [sides, setSides] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [extras, setExtras] = useState([]);
  const [seasonal, setSeasonal] = useState([]);
  const [menuId, setMenuId] = useState("entree");
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((response) => response.json())
      .then((data) => {
        setMenuitems(data);
        console.log(data);
      })
      .catch((error) => console.error(error));

    return () => setMenuId("entree");
  }, []);

  useEffect(() => {
    if (menuitems.length > 0) {
      var _entree = [];
      var _sides = [];
      var _drinks = [];
      var _extras = [];
      var _seasonal = [];
      var _combos = [];

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
          case "combo":
            _combos.push(item);
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
      setCombos(_combos);
    }
  }, [menuitems]);

  useEffect(() => {
    const interval = setInterval(() => {
      switch (menuId) {
        case "entree":
          setMenuId("sides");
          break;
        case "sides":
          setMenuId("drinks");
          break;
        case "drinks":
          setMenuId("extras");
          break;
        case "extras":
          setMenuId("seasonal");
          break;
        case "seasonal":
          setMenuId("combo");
          break;
        default:
          setMenuId("entree");
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [menuId]);

  const getSelectedMenu = () => {
    switch (menuId) {
      case "sides":
        return <MenuItem menuTitle="Sides" menuItems={sides} menuId="sides" />;
      case "drinks":
        return (
          <MenuItem menuTitle="Drinks" menuItems={drinks} menuId="drinks" />
        );
      case "extras":
        return (
          <MenuItem menuTitle="Extras" menuItems={extras} menuId="extras" />
        );
      case "seasonal":
        return (
          <MenuItem
            menuTitle="Seasonal"
            menuItems={seasonal}
            menuId="seasonal"
          />
        );
      case "combo":
        return (
          <MenuItem menuTitle="Meals" menuItems={combos} menuId="combo" />
        );
      default:
        return (
          <MenuItem menuTitle="Entrees" menuItems={entree} menuId="entree" />
        );
    }
  };
  return (
    <div>
      <Container className="mt-5">{getSelectedMenu()}</Container>
    </div>
  );
}

export default Menu;
