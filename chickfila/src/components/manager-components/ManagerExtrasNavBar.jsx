import '../../css/Manager.css'
import React, { useState } from "react";


function ManagerExtrasNavBar() {
  const [activeTab, setActiveTab] = useState("What Sales Together");

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
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: send dates to backend logic
    console.log("Start date:", startDate);
    console.log("End date:", endDate);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Start Date: </label>
        <input type="datetime-local" value={startDate} onChange={handleStartDateChange} />
        <br />
        <br />
        <label>End Date: </label>
        <input type="datetime-local" value={endDate} onChange={handleEndDateChange} />
        <br />
        <br />
        <button class="generateButton">Generate What Sales Together</button>
        <br />
        <br />
      </form>
    </div>
  );
}

function ExcessReport() {
  const [timestamp, setTimestamp] = React.useState("");

  const handleTimestampChange = event => {
    setTimestamp(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // TODO: send timestamp to backend logic
    console.log("Timestamp: ", timestamp);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Timestamp: </label>
        <input type="datetime-local" value={timestamp} onChange={handleTimestampChange} />
        <br /><br />
        <button class="generateButton" type="submit">Generate Excess Report</button>
      </form>
    </div>
  );
}

export default ManagerExtrasNavBar;