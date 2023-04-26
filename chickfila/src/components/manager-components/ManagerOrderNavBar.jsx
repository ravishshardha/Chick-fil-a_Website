import '../../css/Manager.css'
import React, { useState } from "react";
import GenerateSalesReport from './GenerateSalesReport';
import Table from '../GeneralTable';


function ManagerOrderNavBar({data}) {
  const [activeTab, setActiveTab] = useState("AllOrders");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="tab-menu">
        <div
          className={activeTab === "AllOrders" ? "active" : ""}
          onClick={() => handleTabClick("AllOrders")}
        >
          All Orders
        </div>
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
      {activeTab === "AllOrders" && <OrdersTab data={data}/>}
    </div>
  );
}

function SalesReportTab() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reply, setReply] = useState([""]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  }

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (isNaN(startDateObj) && isNaN(endDateObj)) {
      console.log('Invalid date(s)');
    } else {
      console.log('Valid dates');

      const timezoneOffset = startDateObj.getTimezoneOffset() * 60000; // in milliseconds
      const formattedStartDate = new Date(startDateObj.getTime() - timezoneOffset).toISOString().replace('T', ' ').substring(0, 19);
      const formattedEndDate = new Date(endDateObj.getTime() - timezoneOffset).toISOString().replace('T', ' ').substring(0, 19);
      // TODO: pass start and end date to backend
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);

      const url = `http://localhost:5000/api/salesReport?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
      fetch(url)
      .then(response => response.json()) // <-- parse response as JSON
      .then(data => {
        setReply(data); // <-- set state with parsed JSON data
      })
      .catch(error => {
        console.log("hi");
        console.error(error);
      });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Start Date: </label>
        <input type="datetime-local" value={startDate} onChange={handleStartDateChange}></input>
        <label>&nbsp; End Date: </label>
        <input type="datetime-local" value={endDate} onChange={handleEndDateChange}></input> <br></br><br></br>
        <GenerateSalesReport response={reply}/>
      </form>
    </div>
  );
}

function OrdersTab({data}) {
  return (
    <div className='scrollingTableOrders'>
    <Table data={data}/>
    </div>
  );
  
}

function XZReport() {
  const [selectedDate, setSelectedDate] = useState("");
  const [reply, setReply] = useState([""]);
  const [totalSales, setTotalSales] = useState(0);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleGenerateZReport = (event) => {
    event.preventDefault();
    const zDateObj = new Date(selectedDate);
    const timezoneOffset = zDateObj.getTimezoneOffset() * 60000; // in milliseconds
    const formattedDate = new Date(zDateObj.getTime() - timezoneOffset).toISOString().replace('T', ' ').substring(0, 19);
    // handle generating Z report with selectedDate
    const url = `http://localhost:5000/api/Zreport?zTime=${formattedDate}`;

    console.log('sent zdate to backend:',formattedDate);

    fetch(url)
    .then(response => response.json()) 
    .then(data => {
      setReply(data); 
      let sum = 0;
      reply.forEach((value, key) => {
        sum += value.price;
      });
      setTotalSales(sum);
    })
    .catch(error => {
      setTotalSales(0);
      console.error(error);
    });

    console.log('reply: ',reply)
  };

  const handleGenerateXReport = (event) => {
    // TODO: handle generating X report 
    console.log('x:',selectedDate);

    event.preventDefault();
    // handle generating Z report with selectedDate
    const url = `http://localhost:5000/api/Xreport`;

    fetch(url)
    .then(response => response.json()) 
    .then(data => {
      setReply(data); 
      let sum = 0;
      reply.forEach((value, key) => {
        sum += value.price;
      });
      setTotalSales(Math.round((sum)*100)/100);
    })
    .catch(error => {
      setTotalSales(0);
      console.error(error);
    });
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
      &nbsp; &nbsp; &nbsp;
      <button type="submit" onClick={handleGenerateXReport} class="generateButton">
        <span>
        Generate X Report
        </span>
      </button>


      <div className='scrollingTableSalesRep'>
        <p>Total: ${totalSales}</p>
        <Table data={reply} />
      </div>
      <br></br><br></br>
      
    </div>
  );
}

export default ManagerOrderNavBar;