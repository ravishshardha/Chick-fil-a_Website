import React from 'react'
import { useState, useEffect } from "react";
import '../css/Server.css'
// hardcoded for now
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
      type: "side",
      url: "https://www.cfacdn.com/img/order/menu/Online/Salads%26wraps/sswSalad_spicyGrilled_pdp.png",
    },
    {
      id: 7,
      text: "Brownie",
      price: 3.99,
      type: "extra",
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

function SidePanel({setChoice}) {
    return (
        <nav className="side-panel">
            <ul>
                <li onClick={() => setChoice('all')}><a href="#">All</a></li>
                <li onClick={() => setChoice('entree')}><a href="#">Entrees</a></li>
                <li onClick={() => setChoice('side')}><a href="#">Sides</a></li>
                <li onClick={() => setChoice('drink')}><a href="#">Drinks</a></li>
                <li onClick={() => setChoice('extra')}><a href="#">Extras</a></li>
                <li onClick={() => setChoice('seasonal')}><a href="#">Seasonal</a></li>
            </ul>
        </nav>
    );
}


function OrderSummary({_order, total}){
    const listItems = _order.map(item =>
        <li>
            <p>{item.text}......{item.price}</p>
        </li>
    )
    
    return (
        <div className='ServerOrderSummary'>
            <ul id='ServerOrderList'>{listItems}</ul>
        </div>
    );
}

function ServerButton({item, addToOrder}){
    
    return (
        <button className='ServerButton' onClick={() => addToOrder(item)}>
            {item.text} {item.price}
        </button>
    );
}

function ScrollingButtons({_buttonset, addToOrder}){
    const listItems = _buttonset.map(item => 
        <ServerButton item={item} addToOrder={addToOrder}></ServerButton>
    )
    return (<div>{listItems}</div>);
}

export default function Server() {
    const [_total, setTotal] = useState(0.0);
    const [_order, setOrder] = useState([]);
    const clearOrder = () => {setOrder([]); setTotal(0.0);};
    const [buttonset, setButtons] = useState([]);
    const addToOrder = (product) => {setOrder([..._order, product]);
        setTotal(Math.round((_total + product.price)*100)/100 );
    };
    const [entree, setEntree] = useState([]);
    const [sides, setSides] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [extras, setExtras] = useState([]);
    const [seasonal, setSeasonal] = useState([]);
    


    useEffect(() => {
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

        setButtons(menuitems);
        
    },[])

    const setButtonChoice = (_choice) => {
        switch (_choice){
            case 'all': 
                setButtons(menuitems);
                break;
            case 'entree':
                setButtons(entree);
                break;
            case 'side':
                setButtons(sides);
                break;
            case 'drink':
                setButtons(drinks);
                break;
            case 'extra':
                setButtons(extras);
                break;
            default:
                setButtons(seasonal);
                break;
        }
    }

    return (
        <div className='ServerMain'>
            <h1>Server</h1>
            <div className='ServerMain orderSummary'>
                <div>Order Summary:</div>
                <OrderSummary _order={_order}/>
                <p id='OrderTotal'>TOTAL = ${_total}</p>
            </div>
            <div className='ServerMain buttons'>
                <ScrollingButtons _buttonset={buttonset} addToOrder={addToOrder}/>
                <button className='ServerClearOrder' onClick={clearOrder}>Clear Order</button>
                <button className='ServerFinishAndPay'>Finish & Pay</button>
            </div>
            <div className='ServerMain sidePanel'>
                <SidePanel setChoice={setButtonChoice}/>
            </div>
        </div>
    );
}
