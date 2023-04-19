import '../../css/Manager.css'
import React, { useState } from "react";
import GenerateSalesReport from './GenerateSalesReport';


function ManagerOrderNavBar() {
  const [activeTab, setActiveTab] = useState("create");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tab-menu">
        <div
          className={activeTab === "Sales Report" ? "active" : ""}
          onClick={() => handleTabClick("Sales Report")}
        >
          Sales Report
        </div>
        <div
          className={activeTab === "X & Z Reports" ? "active" : ""}
          onClick={() => handleTabClick("X & Z Reports")}
        >
          X & Z Reports
        </div>
      </div>

      {activeTab === "Sales Report" && <SalesReportTab />}
      {activeTab === "X & Z Reports" && <XZReport />}
    </div>
  );
}

function SalesReportTab() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  }

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: pass start and end date to backend
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Start Date: </label>
        <input type="datetime-local" value={startDate} onChange={handleStartDateChange}></input> <br></br> <br></br>
        <label>End Date: </label>
        <input type="datetime-local" value={endDate} onChange={handleEndDateChange}></input> <br></br><br></br>
        <GenerateSalesReport />
      </form>
    </div>
  );
}

function XZReport() {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleGenerateZReport = () => {
    // handle generating Z report with selectedDate
    console.log('z:',selectedDate);
  };

  const handleGenerateXReport = () => {
    // TODO: handle generating X report with selectedDate
    console.log('x:',selectedDate);
  };

  return (
    <div>
      <label>Date: </label>
      <input type="datetime-local" value={selectedDate} onChange={handleDateChange}></input> <br/><br/>
      <button type="submit" onClick={handleGenerateZReport} class="generateButton">
        <span>
            Generate Z Report
        </span>
      </button>

      <br/><br/>

      <button type="submit" onClick={handleGenerateXReport} class="generateButton">
        <span>
            Generate X Report
        </span>
      </button>
    </div>
  );
}

export default ManagerOrderNavBar;