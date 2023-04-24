import '../../css/Manager.css'
import React, { useState } from "react";
import AddToMenu from './AddToMenu.jsx';
import DeleteFromMenu from './DeleteFromMenu';
import SaveChangesMenu from './SaveChangesMenu';


function ManagerMenuNavBar() {
  const [activeTab, setActiveTab] = useState("create");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tab-menu">
        <div
          className={activeTab === "create" ? "active" : ""}
          onClick={() => handleTabClick("create")}
        >
          Create New Item
        </div>
        <div
          className={activeTab === "delete" ? "active" : ""}
          onClick={() => handleTabClick("delete")}
        >
          Delete Existing Item
        </div>
        <div
          className={activeTab === "edit" ? "active" : ""}
          onClick={() => handleTabClick("edit")}
        >
          Edit Existing Item
        </div>
      </div>

      {activeTab === "create" && <CreateItemTab />}
      {activeTab === "delete" && <DeleteItemTab />}
      {activeTab === "edit" && <EditItemTab />}
    </div>
  );
}

function CreateItemTab() {
  const [selectedOption, setSelectedOption] = React.useState("entree");
  const [Id, setId] = React.useState(0);
  const [itemName, setItemName] = React.useState("");
  const [itemPrice, setItemPrice] = React.useState(0.0);
  const [ingredients, setIngredients] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const handleIdChange = event => {
    setId(event.target.value);
  };

  const handleOptionChange = event => {
    setSelectedOption(event.target.value);
  };

  const handleItemNameChange = event => {
    setItemName(event.target.value);
  };

  const handleItemPriceChange = event => {
    setItemPrice(event.target.value);
  };

  const handleIngredientsChange = event => {
    setIngredients(event.target.value);
  };

  const handleImageUrlChange = event => {
    setImageUrl(event.target.value);
  };

  // TODO: send formData to backend
  // order is selectedOption, itemName, itemPrice, ingredients, imageUrl
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // TODO: change this to send to db
    console.log(Id, selectedOption, itemName, itemPrice, ingredients, imageUrl);
    
    // const id = req.query.id;
    // const name = req.query.name;
    // const price = req.query.price;
    // const type = req.query.type;
    // const ingredient = req.query.ingredient;
    // const url = req.query.url;

    const url = `http://localhost:5000/api/addItem?id=${Id}&name=${itemName}&price=${itemPrice}&type=${selectedOption}&ingredient=${ingredients}&url=${imageUrl}`;
    fetch(url)
    .then(response => response.json())
    .then( data => {
            console.log(data);
    })
    .catch(error => console.log(error));

  }

  return (
    <div>
      <div class="radio">
          <input value="entree" name="product" id="entree" type="radio" label="entree" checked={selectedOption === "entree"} onChange={handleOptionChange} />
          <input value="side" name="product" id="side" type="radio" label="side" checked={selectedOption === "side"} onChange={handleOptionChange} />
          <input value="drink" name="product" id="drink" type="radio" label="drink" checked={selectedOption === "drink"} onChange={handleOptionChange} />
          <input value="extra" name="product" id="extra" type="radio" label="extra" checked={selectedOption === "extra"} onChange={handleOptionChange} />
          <input value="seasonal" name="product" id="seasonal" type="radio" label="seasonal" checked={selectedOption === "seasonal"} onChange={handleOptionChange} />
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <label>Item Id:</label>
        <input type="text" id="menutextbox" value={Id} onChange={handleIdChange} />
        <br />
        <br />
        <label>Item Name:</label>
        <input type="text" id="menutextbox" value={itemName} onChange={handleItemNameChange} />
        <br />
        <br />
        <label>Item Price:</label>
        <input type="text"  id="menutextbox" value={itemPrice} onChange={handleItemPriceChange} />
        <br />
        <br />
        <label>(amount, ingredient id) ex: (1, 0)</label>
        <br />
        <label>Ingredients:</label>
        <input type="text" id="menutextbox" value={ingredients} onChange={handleIngredientsChange} />
        <br />
        <br />
        <label>Image URL:</label>
        <input type="text" id="menutextbox" value={imageUrl} onChange={handleImageUrlChange} />
        <br />
        <br />
        <AddToMenu />
      </form>
    </div>
  );
}

function DeleteItemTab() {
  const [itemId, setItemId] = React.useState("");
  const [reply, setReply] = React.useState("");

  const handleItemIdChange = event => {
    setItemId(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // TODO: send itemId to back end
    console.log('Item to delete: ', itemId);

    
    const url = `http://localhost:5000/api/deleteMenuItem?id=${itemId}`;

    fetch(url)
    .then(response => response.json()) 
    .then(data => {
      setReply(data); 
    })
    .catch(error => {
      console.error(error);
    });

    console.log(reply)

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Item Id:</label>
        <input type="text" value={itemId} onChange={handleItemIdChange} />
        <br />
        <br />
        <DeleteFromMenu />
      </form>
    </div>
  );
}

function EditItemTab() {
  const [selectedOption, setSelectedOption] = React.useState("entree");
  const [itemId, setItemId] = React.useState("");
  const [itemName, setItemName] = React.useState("");
  const [itemPrice, setItemPrice] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const handleOptionChange = event => {
    setSelectedOption(event.target.value);
  };

  const handleIdChange = event => {
    setItemId(event.target.value);
  };

  const handleItemNameChange = event => {
    setItemName(event.target.value);
  };

  const handleItemPriceChange = event => {
    setItemPrice(event.target.value);
  };

  const handleIngredientsChange = event => {
    setIngredients(event.target.value);
  };

  const handleImageUrlChange = event => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formData = {
      selectedOption,
      itemId,
      itemName,
      itemPrice,
      ingredients,
      imageUrl
    };
    // TODO: send formData to backend
    // order is selectedOption, itemId, itemName, itemPrice, ingredients, imageUrl
    console.log(formData);
  };

  return (
    <div>
      <div class="radio">
          <input value="entree" name="product" id="entree" type="radio" label="entree" checked={selectedOption === "entree"} onChange={handleOptionChange} />
          <input value="side" name="product" id="side" type="radio" label="side" checked={selectedOption === "side"} onChange={handleOptionChange} />
          <input value="drink" name="product" id="drink" type="radio" label="drink" checked={selectedOption === "drink"} onChange={handleOptionChange} />
          <input value="extra" name="product" id="extra" type="radio" label="extra" checked={selectedOption === "extra"} onChange={handleOptionChange} />
          <input value="seasonal" name="product" id="seasonal" type="radio" label="seasonal" checked={selectedOption === "seasonal"} onChange={handleOptionChange} />
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <label>Item ID:</label>
        <input type="text" value={itemId} onChange={handleIdChange} />
        <br />
        <br />
        <label>Item Name:</label>
        <input type="text" value={itemName} onChange={handleItemNameChange} />
        <br />
        <br />
        <label>Item Price:</label>
        <input type="text" value={itemPrice} onChange={handleItemPriceChange} />
        <br />
        <br />
        <label>(amount, ingredient id) ex: (1, 0)</label>
        <br />
        <label>Ingredients:</label>
        <input type="text" value={ingredients} onChange={handleIngredientsChange} />
        <br />
        <br />
        <label>Image URL:</label>
        <input type="text" value={imageUrl} onChange={handleImageUrlChange} />
        <br />
        <br />
        <SaveChangesMenu />
      </form>
    </div>
  );
}

export default ManagerMenuNavBar;