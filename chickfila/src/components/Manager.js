import React, { useState, useEffect } from "react";
import '../css/Manager.css'
import Table from './GeneralTable'
import Refresh from "./manager-components/Refresh";
import ManagerMenuNavBar from './manager-components/ManagerMenuNavBar.jsx';
import ManagerOrderNavBar from "./manager-components/ManagerOrderNavBar";
import ManagerIngredientNavBar from "./manager-components/ManagerIngredientNavBar";
import ManagerExtrasNavBar from "./manager-components/ManagerExtrasNavBar";

const orderData = [
    {
        orderid: 1,
        time: "Monday",
        price: 20.0,
        items: "Chicken Sandwich, Lemonade",
    },
    {
        orderid: 2,
        time: "Tuesday",
        price: 30.0,
        items: "Spicy Chicken Sandwich Sunjoy",
    },
    {
        orderid: 3,
        time: "Wednesday",
        price: 40.0,
        items: "Chicken Sandwich, Lemonade",
    },
    {
        orderid: 3,
        time: "Wednesday",
        price: 40.0,
        items: "Chicken Sandwich, Lemonade",
    },
]

const inventory = [
    {
        id: 1,
        name: "Chicken patty",
        vendor: "hello",
        stock: 4,
        minstock: 50,
    },
    {
        id: 2,
        name: "Buns",
        vendor: "hellochicken",
        stock: 70,
        minstock: 50,
    },
    {
        id: 3,
        name: "Nugget",
        vendor: "hellochicken",
        stock: 40,
        minstock: 50,
    },
    {
        id: 4,
        name: "Lettuce",
        vendor: "hellochicken",
        stock: 80,
        minstock: 50,
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


function TabMenu({menuItems, orderItems, ingredients}) {
    // const [activeTab, setActiveTab] = React.useState("orders");
    
      return (
        <div class="tab-container">
            <button class="tab-button" onClick={() => setActiveTab("orders")}>Orders</button>
            <div class="tab-content" id="orders-content">
                <Orders orderItems={orderItems}/>
            </div>
            <button class="tab-button" onClick={() => setActiveTab("menu")}>Menu</button>
            <div class="tab-content" id="menu-content">
                <Menu menuItems={menuItems} />
            </div>
            <button class="tab-button" onClick={() => setActiveTab("inventory")}>Inventory</button>
            <div class="tab-content" id="inventory-content">
                <Inventory ingredients={ingredients}/>
            </div>
            <button class="tab-button" onClick={() => setActiveTab("extras")}>Extras</button>
            <div class="tab-content" id="extras-content">
                <Extras/>
            </div>
        </div>

      );
}

function Orders({orderItems}){
    return(
        <div className='managerOrders'>
            <div className='managerOrders manage'>
                <h2>Order Management</h2>
                <ManagerOrderNavBar data={orderItems}/>
              {/* </div>
                 <div className='managerOrders viewTable'>
                 <div className='scrollingTable'>
                     <Table data={orderItems}/>
                 </div> */}
             </div> 
        </div> 
    );
}

function Menu({menuItems}){
    return (
        <div className='managerMenu'>
            <div className='managerMenu manage'>
                <h2>Menu Management</h2>
                <ManagerMenuNavBar />
                <hr></hr>
                <Refresh />
            </div>
            <div className='managerMenu viewTable'>
                <div className='scrollingTable'>
                    <Table data={menuItems}/>
                </div>
            </div>
            <hr></hr>
        </div>
    );
}

function Inventory({ingredients}){
    return (
        <div className='managerInventory'>
            <div className='managerInventory manage'>
                <h2>Inventory</h2>
                <ManagerIngredientNavBar />
            </div>
            <div className='managerInventory viewTable'>
                <div className='scrollingTable'>
                    <Table data={ingredients}/>
                </div>
            </div>
            <hr></hr>
        </div>
    );
}

function Review() {
    return (
        <div class="rcard">
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
            <div className='managerExtras salesTogether'>
                <h2>Extra Controls</h2>
                <ManagerExtrasNavBar />
            </div>
            <hr></hr>
        </div>
    );
}

export default function Manager(){
    const [menuItems, setMenuItems] = useState(orderData);
    const [orderItems, setOrderItems] = useState(orderData);
    const [ingredients, setIngredients] = useState(orderData);

    //change the menu items
    useEffect(() => {
        fetch('http://localhost:5000/api/menu')
            .then(response => response.json())
            .then( data => {
                setMenuItems(data);
                console.log(data);
            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        fetch('http://localhost:5000/api/retrieveorders')
            .then(response => response.json())
            .then( data => {
                setOrderItems(data);
                console.log(data);
            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        // TODO: CHANGE NAME IF BACKEND CHANGES
        fetch('http://localhost:5000/api/ingredients')
            .then(response => response.json())
            .then( data => {
                setIngredients(data);
                console.log(data);
            })
            .catch(error => console.log(error));
    }, [])

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
            <TabMenu menuItems={menuItems} orderItems={orderItems} ingredients={ingredients}/>
        </div>
    );
}