import React from 'react'

// this class will take a name and a price and format them into a nice unordered list

// hardcoded list for demonstration's sake
const menuitems = [{
    id: 1,
    name: "Chicken sandwich",
    price: 5.99
  },
  {
    id: 2,
    name: "Spicy Chicken sandwich",
    price: 7.99
  },
  {
    id: 3,
    name: "Side salad",
    price: 3.99
  },
  ]

export default function MenuTable(){
    const listItems = menuitems.map(item =>
        <li key= {item.id}>
            <p>{item.name}......{item.price}</p>
        </li>
    )
    return(
      <div className='MenuTable'>
        <ul>{listItems}</ul>
      </div>
    );
  }