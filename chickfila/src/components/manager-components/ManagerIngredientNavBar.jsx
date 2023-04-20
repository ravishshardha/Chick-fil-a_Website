import '../../css/Manager.css'
import React, { useState, useEffect } from "react";
import Table from '../GeneralTable';
import SaveChangesMenu from './SaveChangesMenu';


const defaultData = [
  {
      orderid: 1,
      time: "Monday",
      price: 20.0,
      items: "Chicken Sandwich, Lemonade",
  },
]


function ManagerIngredientNavBar() {
  const [activeTab, setActiveTab] = useState("create");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tab-menu">
        <div
          className={activeTab === "edit" ? "active" : ""}
          onClick={() => handleTabClick("edit")}
        >
          Edit Existing
        </div>
        <div
          className={activeTab === "restock" ? "active" : ""}
          onClick={() => handleTabClick("restock")}
        >
          Report
        </div>
      </div>

      {activeTab === "edit" && <EditIngrTab />}
      {activeTab === "restock" && <RestockTab />}
    </div>
  );
}

function RestockTab() {
  const [ingredients, setIngredients] = useState(defaultData);

  useEffect(() => {
    // TODO: CHANGE NAME IF BACKEND CHANGES
    fetch('http://localhost:5000/api/ingredients')
    .then(response => response.json())
    .then( data => {
            setIngredients(data);
            const filteredIng = data.filter(function(item){return item.amount < 300;});

            if (filteredIng != null){
              console.log("filtered" + filteredIng);
              setIngredients(filteredIng);
            }
            // console.log(data);
        })
        .catch(error => console.log(error));
}, [])

  // TODO: probably add onClick to the button to generate the restock report
  return (
    <div>
      {/* <button class="generateButton">Generate Restock Report</button> <br></br> <br></br> */}
      <div className='scrollingTableRestock'>
        <Table data={ingredients}/>
      </div>
    </div>
    
  );
}

// function CreateIngrTab() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const name = document.getElementById('name').value;
//     const vendor = document.getElementById('vendor').value;
//     const stock = document.getElementById('stock').value;
//     const minStock = document.getElementById('minStock').value;
//     console.log(name, vendor, stock, minStock);
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>Name: </label><input type="text" id="name" /><br/><br/>
//         <label>Vendor:</label><input type="text" id="vendor" /><br/><br/>
//         <label>Stock:</label><input type="text" id="stock" /><br/><br/>
//         <label>Min Stock:</label><input type="text" id="minStock" /><br/><br/>
//         <AddIngredient />
//       </form>
//     </div>
//   );
// }


function EditIngrTab() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const vendor = document.getElementById('vendor').value;
    const stock = document.getElementById('stock').value;
    const minStock = document.getElementById('minStock').value;
    // TODO: change this to send to db
    console.log(selectedIngredient, vendor, stock, minStock);
  }
  const [selectedIngredient, setSelectedIngredient] = React.useState("");

  const handleChange = (event) => {
    setSelectedIngredient(event.target.value);
  };

  return (
    <div>
      <div>
          <select className="ingredientDropdown" value={selectedIngredient} onChange={handleChange}>
            <option value="">-- Select an ingredient --</option>
            <option value="chicken patty">Chicken Patty</option>
            <option value="nugget">Nugget</option>
            <option value="lettuce">Lettuce</option>
          </select>
          <p>Selected Ingredient: {selectedIngredient}</p>
        </div>
        <label>Vendor:</label><input type="textbox" id="vendor"></input> <br></br><br></br>
        <label>Stock:</label><input type="textbox" id="stock"></input> <br></br><br></br>
        <label>Min Stock:</label><input type="textbox" id="minStock"></input> <br></br><br></br>
        
        <button type="button" onClick={handleSubmit} class="saveChanges">
            <span class="saveChangesShadow"></span>
            <span class="saveChangesEdge"></span>
            <span class="saveChangesText"> Save Changes
            </span>
        </button>
    </div>
  );
}

export default ManagerIngredientNavBar;