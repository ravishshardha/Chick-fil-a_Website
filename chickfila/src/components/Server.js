import React from 'react'
import { useState, useEffect } from "react";
import '../css/Server.css'


// servercard
function ServerCard({item, index, removeItem}){
    // will have the item, price, and delete button
    return (
        <div className='serverCard'> 
            <div className='text'>{item.name}</div>
            <div className='text'>${item.price}</div>
            <button className="deletebutton" onClick={() => removeItem(index)}>
                <span className='text'>X</span>
            </button>
        </div>
    );
}


function SidePanel({setChoice}) {
    return (
        <nav className="side-panel">
            <ul>
                <li onClick={() => setChoice('all')}><p>All</p></li>
                <li onClick={() => setChoice('combo')}><p>Meals</p></li>
                <li onClick={() => setChoice('entree')}><p>Entrees</p></li>
                <li onClick={() => setChoice('side')}><p>Sides</p></li>
                <li onClick={() => setChoice('drink')}><p>Drinks</p></li>
                <li onClick={() => setChoice('extra')}><p>Extras</p></li>
                <li onClick={() => setChoice('seasonal')}><p>Seasonal</p></li>
            </ul>
        </nav>
    );
}


function OrderSummary({_order, total, setOrder, setTotal}){
   
    const removeItem = (index) => {
        setTotal(Math.round((total - _order[index].price)*100)/100);
        const filteredList = _order.filter((_, i) => i !== index);
        setOrder(filteredList);
      };
    
    return (
        <div className='ServerOrderSummary'>
            <div className='orderTotal'>Total = ${total}</div>
            <div>Number of items={_order.length}</div>
            <div className='orderSummaryGrid'>
                {(_order || []).map((item, index) => (
                <ServerCard
                item={item}
                index={index}
                removeItem={removeItem}
                />
                ))}
            </div>
        </div>
    );
}

function ServerButton({item, addToOrder}){
    
    return (
        <button className={'ServerButton' + item.type} onClick={() => addToOrder(item)} >
            {item.name} ${item.price}
        </button>
    );
}

function ScrollingButtons({_buttonset, addToOrder}){
    const listItems = _buttonset.map(item => 
        <ServerButton item={item} addToOrder={addToOrder}></ServerButton>
    )
    return (<div className='buttonGrid'>{listItems}</div>);
}

export default function Server() {
    const [_total, setTotal] = useState(0.0);
    const [_order, setOrder] = useState([]);
    const clearOrder = () => {setOrder([]); setTotal(0.0);};
    const [menuitems, setMenuItems] = useState([]);
    const [buttonset, setButtons] = useState([]);
    const addToOrder = (product) => {setOrder([..._order, product]);
        setTotal(Math.round((_total + product.price)*100)/100 );
    };
    const [entree, setEntree] = useState([]);
    const [sides, setSides] = useState([]);
    const [drinks, setDrinks] = useState([]);
    const [extras, setExtras] = useState([]);
    const [combos, setCombos] = useState([]);
    const [seasonal, setSeasonal] = useState([]);


    
    const handleCheckout = () => {
        const url = `http://localhost:5000/api/addOrder?order=${encodeURIComponent(JSON.stringify(_order))}`;
        console.log(_order);
        clearOrder();
        fetch(url)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
    }
    // change the menuitems
    useEffect(() => {
        fetch('http://localhost:5000/api/menu')
            .then(response => response.json())
            .then( data => {
                setMenuItems(data);
                console.log(data);
            })
            .catch(error => console.log(error));
    }, [])
    
    // update on menu change
    useEffect(() => {
        var _entree = [];
        var _sides = [];
        var _drinks = [];
        var _extras = [];
        var _seasonal = [];
        var _combo = [];

        // sort menuitems by type
        var order = ["combo", "entree", "side", "drink", "extra", "seasonal"];
        const sortedMenu = menuitems.sort((a, b) => {
            const typeOrder = order.indexOf(a.type) - order.indexOf(b.type);
            if (typeOrder !== 0){
                return typeOrder;
            }
            return a.name.localeCompare(b.name);
            });
        console.log(sortedMenu);

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
                _combo.push(item);
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
        setCombos(_combo);



        setButtons(menuitems);
        
    },[menuitems])

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
            case 'combo':
                setButtons(combos);
                break;
            default:
                setButtons(seasonal);
                break;
        }
    }

    return (
        <div className='ServerMain'>
            <h1>Server</h1>
            <div className='ServerMainContents'>
                <div className='ServerMainContents orderSummary'>
                    <h2>Order Summary:</h2>
                    <button className='ServerClearOrder' onClick={clearOrder}>Clear Order</button>
                    <button id='finishandpay' className='ServerFinishAndPay' onClick={handleCheckout}>Finish & Pay</button>
                    <OrderSummary _order={_order} total={_total} setOrder={setOrder} setTotal={setTotal}/>
                </div>
                <div className='ServerMainContents buttons'>
                    <ScrollingButtons _buttonset={buttonset} addToOrder={addToOrder}/>
                </div>
                <div className='ServerMainContents sidePanel'>
                    <SidePanel setChoice={setButtonChoice}/>
                </div>
            </div>
        </div>
    );
}
