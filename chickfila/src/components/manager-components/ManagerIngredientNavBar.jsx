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
  const [activeTab, setActiveTab] = useState("edit");
  const [ingredients, setIngredients] = useState(defaultData);

  useEffect(() => {
    // TODO: CHANGE NAME IF BACKEND CHANGES
    fetch('http://localhost:5000/api/ingredients')
    .then(response => response.json())
    .then( data => {
            setIngredients(data);
            // console.log(data);
        })
        .catch(error => console.log(error));
}, [])

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

      {activeTab === "edit" && <EditIngrTab ingredients={ingredients}/>}
      {activeTab === "restock" && <RestockTab />}
    </div>
  );
}

function RestockTab() {
  const [ingredients, setIngredients] = useState(defaultData);

  useEffect(() => {
    // HANGE NAME IF BACKEND CHANGES
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
      <div className='scrollingTableSmaller'>
        <Table data={ingredients}/>
      </div>
    </div>
    
  );
}

function EditIngrTab({ingredients}) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const stock = document.getElementById('stock').value;
    
    // TODO: change this to send to db
    console.log(selectedIngredient, stock);

    const url = `http://localhost:5000/api/updateInventory?id=${selectedIngredient}&stock=${stock}`;
    fetch(url)
    .then(response => response.json())
    .then( data => {
            // console.log(data);
        })
        .catch(error => console.log(error));

    document.getElementById('stock').value = '';
    
  }
  const [selectedIngredient, setSelectedIngredient] = React.useState("");

  const handleChange = (event) => {
    setSelectedIngredient(event.target.value);
  };

  const options = ingredients.map(item =>
    <option value={item.id}>{item.id} {item.name}</option> 
  );

  return (
    <div>
      <div>
          <select className="ingredientDropdown" value={selectedIngredient} onChange={handleChange}>
            <option value="">-- Select an ingredient --</option>
            {options}
          </select>
          <p>Selected Ingredient: {selectedIngredient}</p>
        </div>
        <label>Stock:</label><input type="textbox" id="stock"></input> <br></br><br></br>
        
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