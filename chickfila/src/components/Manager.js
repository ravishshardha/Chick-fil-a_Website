import React from 'react';
import '../css/Manager.css'

function Orders(){
    return(
        <div className='managerOrders'>
            <div className='managerOrders manage'>
                <h2>Orders</h2>
                <p>[TODO: should be able to view x and z reports]</p>
                <p>[TODO: should be able to manage orders here]</p>
            </div>
                <div className='managerOrders viewTable'>
                <p>[TODO: fill with information about orders]</p>
                <p>[order table]</p>
                <p>[Needs a table, and this table will be filled with orders.]</p>
            </div>
            <hr></hr>
        </div> 
    );
}

function Menu(){
    return (
        <div className='managerMenu'>
            <div className='managerMenu manage'>
                <h2>Menu Items</h2>
                <p>[TODO: Manager should be able to edit the menu over here]</p>
            </div>
            <div className='managerMenu viewTable'>
                <p>[TODO fill with table of menu items, similar to menu view, but populated with more information]</p>
                <p>[Needs a table of menu items.]</p>
            </div>
            <hr></hr>
        </div>
    );
}

function Inventory(){
    return (
        <div className='managerInventory'>
            <div className='managerInventory manage'>
                <h2>Inventory</h2>
                <p>[TODO: manager should be able to edit inventory over here]</p>
            </div>
            <div className='managerInventory viewTable'>
                <p>[TODO fill with a table of ingredient information]</p>
                <p>[Needs a table of menu items.]</p>
            </div>
            <hr></hr>
        </div>
    );
}

function Extras(){
    return (
        <div className='managerExtras'>
            <div className='managerExtras manage'>
                <h2>Extra Controls</h2>
                <p>[TODO: Manager has access to extra controls here]</p>
            </div>
            <div className='managerExtras viewTable'>
                <p>Extra controls for manager, on previous project this was What sales together and Excess report.</p>
            </div>
            <hr></hr>
        </div>
    );
}

export default function Manager(){
    return (
        <div className='ManagerMain'>
            <h1 class="ManagerMain header">Manager</h1>
            <Orders/>
            <Menu/>
            <Inventory/>
            <Extras/>
        </div>
    );
}