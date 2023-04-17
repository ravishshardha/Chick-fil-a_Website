import '../../css/Manager.css'
import React, { useState } from "react";


function ManagerExtrasNavBar() {
  const [activeTab, setActiveTab] = useState("create");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tab-menu">
        <div
          className={activeTab === "What Sales Together" ? "active" : ""}
          onClick={() => handleTabClick("What Sales Together")}
        >
          What Sales Together
        </div>
        <div
          className={activeTab === "Excess Report" ? "active" : ""}
          onClick={() => handleTabClick("Excess Report")}
        >
          Excess Report
        </div>
      </div>

      {activeTab === "What Sales Together" && <SalesTogether />}
      {activeTab === "Excess Report" && <ExcessReport />}
    </div>
  );
}

function SalesTogether() {
  return (
    <div>
        <label>Start Date: </label>
        <input type="datetime-local"></input> <br></br> <br></br>
        <label>End Date: </label>
        <input type="datetime-local"></input> <br></br><br></br>
        <button class="generateButton">Generate What Sales Together</button> <br></br> <br></br>
    </div>
  );
}

function ExcessReport() {
  return (
    <div>
      <label>Timestamp: </label>
        <input type="datetime-local"></input> <br></br> <br></br>
      <button class="generateButton">Generate Excess Report</button> <br></br> <br></br>
    </div>
  );
}

export default ManagerExtrasNavBar;