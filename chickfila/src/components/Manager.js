import React, { useState } from "react";
import '../css/Manager.css'
import Table from './GeneralTable'
import Refresh from "./manager-components/Refresh";
import ManagerMenuNavBar from './manager-components/ManagerMenuNavBar.jsx';
import ManagerOrderNavBar from "./manager-components/ManagerOrderNavBar";

const orderData = [
    {
        orderid: 1,
        time: "Monday",
        price: 20.0,
        star_sign: "Taurus",
    },
    {
        orderid: 2,
        time: "Tuesday",
        price: 30.0,
        star_sign: "Cancer",
    },
    {
        orderid: 3,
        time: "Wednesday",
        price: 40.0,
        star_sign: "Pickles"
    },
    {
        orderid: 3,
        time: "Wednesday",
        price: 40.0,
        star_sign: "Virgo",
    },
]

const menuItems = [
    {
        id: 1,
        name: "Chicken Sandwich",
        price: 5.99,
    },
    {
        id: 2,
        name: "Spicy Chicken Sandwich",
        price: 7.99,
    },
    {
        id: 3,
        name: "Chicken Nuggets (5)",
        price: 4.99,
    },
    {
        id: 4,
        name: "Side Salad",
        price: 2.99,
    },
]

const inventory = [
    {
        id: 1,
        name: "Chicken patty",
        stock: 50,
    },
    {
        id: 2,
        name: "Buns",
        stock: 70,
    },
    {
        id: 3,
        name: "Nugget",
        stock: 40,
    },
    {
        id: 4,
        name: "Lettuce",
        stock: 80,
    },
]

function setActiveTab(tabName) {
    // Get all the tab content elements
    const tabContents = document.querySelectorAll(".tab-content");
  
    // Get the tab content element for the clicked tab
    const activeTabContent = document.getElementById(`${tabName}-content`);
  
    // Toggle the active state of the clicked tab
    const isActive = activeTabContent.classList.contains("active");
    if (isActive) {
      activeTabContent.classList.remove("active");
      return;
    }
  
    // Hide all the tab content elements
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
  
    // Show the tab content element for the clicked tab
    activeTabContent.classList.add("active");
}


function TabMenu() {
    // const [activeTab, setActiveTab] = React.useState("orders");
    
      return (
        <div class="tab-container">
            <button class="tab-button" onClick={() => setActiveTab("orders")}>Orders</button>
            <div class="tab-content" id="orders-content">
                <Orders/>
            </div>
            <button class="tab-button" onClick={() => setActiveTab("menu")}>Menu</button>
            <div class="tab-content" id="menu-content">
                <Menu/>
            </div>
            <button class="tab-button" onClick={() => setActiveTab("inventory")}>Inventory</button>
            <div class="tab-content" id="inventory-content">
                <Inventory/>
            </div>
            <button class="tab-button" onClick={() => setActiveTab("extras")}>Extras</button>
            <div class="tab-content" id="extras-content">
                <Extras/>
            </div>
        </div>

      );
}

function Orders(){
    return(
        <div className='managerOrders'>
            <div className='managerOrders manage'>
                <h2>Order Management</h2>
                <ManagerOrderNavBar />
                <hr></hr>
            </div>
                <div className='managerOrders viewTable'>
                <p>[TODO: fill with information about orders]</p>
                <p>[order table]</p>
                <p>[Needs a table, and this table will be filled with orders.]</p>
                <div className='scrollingTable'>
                    <Table data={orderData}/>
                </div>
            </div>
            <hr></hr>
        </div> 
    );
}

function Menu(){
    return (
        <div className='managerMenu'>
            <div className='managerMenu manage'>
                <h2>Menu Management</h2>
                <ManagerMenuNavBar />
                <hr></hr>
                <Refresh />
            </div>
            <div className='managerMenu viewTable'>
                <p>[TODO fill with table of menu items, similar to menu view, but populated with more information]</p>
                <p>[Needs a table of menu items.]</p>
                <div className='scrollingTable'>
                    <Table data={menuItems}/>
                </div>
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
                <div className='scrollingTable'>
                    <Table data={inventory}/>
                </div>
            </div>
            <hr></hr>
        </div>
    );
}

function Review() {
    return (
        <div class="card">
            <div class="stars">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="star">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="star">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="star">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="star">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="star">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            </div>

            <div class="infos">
            <p class="date-time">
                2 days ago
            </p>
            <p class="description">
            This is a very busy location, but they seem to really have their act together. 
            Friendly, courteous servers and hosts make this restaurant a very enjoyable experience. 
            Nice touches including people who walk around the room asking if you want your drink 
            refilled or want your trash removed for you. Other fast food chains can learn a thing or 
            two from Chick-Fil-A.  I would say this is one of the better run Chick-Fil-As in the area.
            </p>
        </div>
        <div class="author">
            — Claire D
        </div>
        </div>

    );
}

function Extras(){
    return (
        <div className='managerExtras'>
            <div className='managerExtras manage'>
                <h2>Extra Controls</h2>
                <p>[TODO: Manager has access to extra controls here]</p>
                <button>Generate What Sales Together</button> <br></br> <br></br>
                <button>Generate Restock Report</button>
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
            <h1 class="ManagerMain header">Manager Dashboard</h1> <br></br>
            <p><b>"To glorify God by being a faithful steward of all that is entrusted to us. </b>
                <b>To have a positive influence on all who come in contact with Chick-fil-A."</b></p> <br></br>
            <div class="managerdashboardright">
                <h4>Most Recent Review:</h4>
                <Review />
            </div>
            <div class="managerdashboardleft">
                <img class="managerFoodImage" src="https://www.longislandpress.com/wp-content/uploads/2013/12/Chick-fil-A.png" alt="chickfila food"></img>
            </div>
            <br></br><br></br>
            <TabMenu/>
        </div>
    );
}