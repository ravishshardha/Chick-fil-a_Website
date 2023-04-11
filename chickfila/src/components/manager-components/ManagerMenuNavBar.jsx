import '../../css/Manager.css'
import React, { useState } from "react";
import AddToMenu from './AddToMenu.jsx';
import RadioInputItem from "./RadioInputItem.jsx";

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
  return (
    <div>
        <RadioInputItem /> <br></br>
        <label>Item Name: </label><input type="textbox"></input> <br></br> <br></br>
        <label>Item Price:</label><input type="textbox"></input> <br></br><br></br>
        <label>(amount, ingredient id) ex: (1, 0)</label> <br></br>
        <label>Ingredients: </label><input type="textbox"></input> <br></br><br></br>
        <label>Image URL: </label><input type="textbox"></input> <br></br><br></br>
        <AddToMenu />
    </div>
  );
}

function DeleteItemTab() {
  return <div>Delete Existing Item here</div>;
}

function EditItemTab() {
  return <div>Edit Existing Item here</div>;
}

export default ManagerMenuNavBar;