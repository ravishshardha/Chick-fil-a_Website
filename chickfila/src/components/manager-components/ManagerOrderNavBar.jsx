import '../../css/Manager.css'
import React, { useState } from "react";
import GenerateXReport from './GenerateXReport';
import GenerateZReport from './GenerateZReport';
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
          className={activeTab === "View X Report" ? "active" : ""}
          onClick={() => handleTabClick("View X Report")}
        >
          X Report
        </div>
        <div
          className={activeTab === "View Z Report" ? "active" : ""}
          onClick={() => handleTabClick("View Z Report")}
        >
          Z Report
        </div>
      </div>

      {activeTab === "Sales Report" && <SalesReportTab />}
      {activeTab === "View X Report" && <XReport />}
      {activeTab === "View Z Report" && <ZReport />}
    </div>
  );
}

function SalesReportTab() {
  return (
    <div>
        <label>Start Date: </label>
        <input type="datetime-local"></input> <br></br> <br></br>
        <label>End Date: </label>
        <input type="datetime-local"></input> <br></br><br></br>
        <GenerateSalesReport />
    </div>
  );
}

function XReport() {
  return (
    <div>
        <GenerateXReport />
    </div>
  );
}

function ZReport() {
  return (
    <div>
        <GenerateZReport />
    </div>
  );
}

export default ManagerOrderNavBar;