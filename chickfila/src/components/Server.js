import React from 'react'
import '../css/Server.css'
import chickfilalogo from '../resources/chickfilalogo.png'

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

function OrderSummary(){
    const listItems = menuitems.map(item =>
        <li key= {item.id}>
            <p>{item.name}......{item.price}</p>
        </li>
    )
    return(
        <div className='ServerOrderSummary'>
            <ul>{listItems}</ul>
        </div>
    );
}

function ServerButton(){
    const listItems = menuitems.map(item =>
        <button className='ServerButton'
           // onClick={}
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
            <p>This is some filler code so we can see how this cool scroll deal works. </p>
            <p>Pretty rad. Anyways, filler filler filler filler filler, fill fill fill fill fill</p>
            <p>La la la la words words words. Typed Typed blah blah blah</p>
            <p>Writing here, and there, and over here, and over there.</p>
            <p>Type type type type</p>
            <p>Type type type type</p>
            <p>Type type type type</p>
            <p>Finally there are enough rows so you can see the scroll.</p>
            <div>Order Summary:</div>
            <OrderSummary/>
            <ScrollingButtons/>
            
        </div>
    );
}