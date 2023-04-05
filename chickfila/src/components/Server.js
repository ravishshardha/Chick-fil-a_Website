import React from 'react'
import '../css/Server.css'
// hardcoded for now
const menuitems = [
    {
        id: 1,
        text: "Chicken Sandwich",
        price: 5.99,
    },
    {
        id: 2,
        text: "Spicy Chicken sandwich",
        price: 6.99,
    },
    {
        id: 3,
        text: "Side salad",
        price: 3.99,
    }
]

// this is our order information
let order = []
let total = 0.00;

function addToOrder(id, name, price){
    let temp = {id: id, name: name, price: price};
    total += price;
    order.push(temp);
    updateAddOrderList(name, price);
}

function OrderSummary(){
    const listItems = order.map(item =>
        <li key= {item.id}>
            <p>{item.name}......{item.price}</p>
        </li>
    )

    return(
        <div className='ServerOrderSummary'>
            <ul id='ServerOrderList'>{listItems}</ul>
        </div>
    );
}

function updateAddOrderList(name, price){
    // update total
    document.getElementById('OrderTotal').innerHTML = "TOTAL = $" + Math.round(total * 100)/100;

    var ul = document.getElementById("ServerOrderList");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(name + '......' + price));
    ul.appendChild(li);
}

function ServerButton(){
    const listItems = menuitems.map(item =>
        <button key= {item.id} className='ServerButton'
           onClick={() => addToOrder(item.id, item.text, item.price)}
        >
                {item.text} ${item.price}
        </button>
    )
    return (
        <div className='ServerButtonBar'>
            {listItems}
        </div>
    );
}

function clearOrder(){
    order = [];
    total = 0.00;
    document.getElementById('OrderTotal').innerHTML = "TOTAL = $0.00"; 
    var ul = document.getElementById("ServerOrderList");
    ul.innerHTML = '';
}

function ScrollingButtons(){
    return (
        <div className='ServerScrollingButtons'>
            <p>TODO, make buttons capable of being dynamically allocated</p>
            <div>
                <ServerButton
                    text={'Testbutton'}
                    price={5.99}
                />
            </div>
        </div>
    );
}


export default function Server(){
    return(
        <div className='ServerMain'>
            <h1>Server</h1>
            <div>Order Summary:</div>
            <OrderSummary/>
            <p id='OrderTotal'>TOTAL = $0.00</p>
            <ScrollingButtons/>
            <button className='ServerClearOrder' onClick={clearOrder}>Clear Order</button>
            <button className='ServerFinishAndPay'>Finish & Pay</button>
        </div>
    );
}