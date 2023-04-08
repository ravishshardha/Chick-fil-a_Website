import React from 'react'
import '../css/Customer.css';

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

function SidePanel() {
  return (
      <nav className="side-panel">
          <ul>
              <li><a href="#">Entrees</a></li>
              <li><a href="#">Sides</a></li>
              <li><a href="#">Drinks</a></li>
              <li><a href="#">Extras</a></li>
          </ul>
      </nav>
  );
}

// this is our order information
let order = []
let total = 0.00;

function addToOrder(id, name, price) {
  let temp = { id: id, name: name, price: price };
  total += price;
  order.push(temp);
  updateAddOrderList(name, price);
}

function OrderSummary() {
  const listItems = order.map(item =>
      <li key={item.id}>
          <p>{item.name}......{item.price}</p>
      </li>
  )

  return (
      <div className='CustomerOrderSummary'>
          <ul id='CustomerOrderList'>{listItems}</ul>
      </div>
  );
}

function updateAddOrderList(name, price) {
  // update total
  document.getElementById('OrderTotal').innerHTML = "TOTAL = $" + Math.round(total * 100) / 100;

  var ul = document.getElementById("CustomerOrderList");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(name + '......' + price));
  ul.appendChild(li);
}

function CustomerButton() {
  const listItems = menuitems.map(item =>
      <button key= {item.id} className='CustomerButton'
      onClick={() => addToOrder(item.id, item.text, item.price)}
      >
          {item.text} ${item.price}
      </button>
  )
  return (
      <div className='CustomerButtonBar'>
          {listItems}
      </div>
  );
}

function clearOrder(){
  order = [];
  total = 0.00;
  document.getElementById('OrderTotal').innerHTML = "TOTAL = $0.00"; 
  var ul = document.getElementById("CustomerOrderList");
  ul.innerHTML = '';
}

function ScrollingButtons() {
  return (
      <div className='CustomerScrollingButtons'>
          <p>TODO, make buttons capable of being dynamically allocated</p>
          <div>
              <CustomerButton/>
          </div>
      </div>
  );
}


function Customer() {
    return (
      <div className='CustomerMain'>
          <h1>Customer</h1>
          <div className='CustomerMain orderSummary'>
              <div>Order Summary:</div>
              <OrderSummary/>
              <p id='OrderTotal'>TOTAL = $0.00</p>
          </div>
          <div className='CustomerMain buttons'>
              <ScrollingButtons/>
              <button className='CustomerClearOrder' onClick={clearOrder}>Clear Order</button>
              <button className='CustomerFinishAndPay'>Finish & Pay</button>
          </div>
          <div className='CustomerMain sidePanel'>
              <SidePanel/>
          </div>
      </div>
    );
  }
  
  export default Customer;