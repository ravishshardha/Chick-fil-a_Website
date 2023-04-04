import React from 'react';

function Orders(){
    return(
        <div className='managerOrders'>
            <h2>Orders</h2>
            <p>TODO fill with information about orders</p>
            <p>Needs a table, and this table will be filled with orders.</p>
        </div> 
    );
}

function Menu(){
    return (
        <div className='managerMenu'>
            <h2>Menu Items</h2>
            <p>TODO fill with table of menu items, similar to menu view, but populated with more information</p>
            <p>Needs a table of menu items. </p>
        </div>
    );
}

function Inventory(){
    return (
        <div className='managerInventory'>
            <h2>Inventory</h2>
            <p>TODO fill with a table of ingredient information</p>
            <p>Needs a table of menu items. </p>
        </div>
    );
}

function Extras(){
    return (
        <div className='managerExtras'>
            <h2>Extra Controls</h2>
            <p>Extra controls for manager, on previous project this was What sales together and Excess report.</p>
        </div>
    );
}

export default function Manager(){
    return (
        <div>
            <h1>Manager</h1>
            <Orders/>
            <Menu/>
            <Inventory/>
            <Extras/>
        </div>
    );
}