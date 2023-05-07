import '../../css/Manager.css'
import React, { useState } from "react";
import Table from '../GeneralTable';


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

// function Dictionary({ reply }) {
//   const entries = Object.entries(reply);

//   return (
//     <div>
//       {entries.length === 0 ? (
//         <p>No results found.</p>
//       ) : (
//         <ul>
//           {entries.map(([word, definition]) => (
//             <li key={word}>
//               <strong>{word}</strong>
//               <br />
//               {definition.split("").join("\n")}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

function FormatOrders({ reply }) {
  if (reply == "") {
    return null;
  }

  const orders = JSON.parse(reply);
  let formattedOrders = '';

  for (const [items, count] of Object.entries(orders)) {
    formattedOrders += `${items}: ${count}\n`;
  }

  return (
    <div>
      <pre>{formattedOrders}</pre>
    </div>
  );
}



function SalesTogether() {
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [reply, setReply] = useState([""]);

  const [formattedStartDate, setFormattedStartDate] = React.useState("");
  const [formattedEndDate, setFormattedEndDate] = React.useState("");
  
  // add a state variable to keep track of submit button click
  const [submitClicked, setSubmitClicked] = React.useState(false);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const timezoneOffset = startDateObj.getTimezoneOffset() * 60000; // in milliseconds
    setFormattedStartDate(new Date(startDateObj.getTime() - timezoneOffset).toISOString().replace('T', ' ').substring(0, 19))
    setFormattedEndDate(new Date(endDateObj.getTime() - timezoneOffset).toISOString().replace('T', ' ').substring(0, 19));
    // TODO: pass start and end date to backend
    console.log('Start Date:', formattedStartDate);
    console.log('End Date:', formattedEndDate);

    const url = `http://localhost:5000/api/salesTogether?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
    fetch(url)
    .then(response => response.text())
    .then(text => {
      console.log(text);
      setReply(text);
      // update the state variable when the submit button is clicked
      setSubmitClicked(true);
    })
    .catch(error => {
      console.error(error);
    });
  }

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
        <button type="submit" class="generateButton">Generate What Sales Together</button>
        <hr></hr>
        {/* conditionally render the scrollingTableExtras div */}
        {submitClicked && (
          <div class="scrollingTableExtras">
            <FormatOrders reply={reply}></FormatOrders>
          </div>
        )}
        <br />
        <br />
      </form>
    </div>
  );
}

function ExcessReport() {
  // /api/excessReport
  const [timestamp, setTimestamp] = React.useState("");
  const [report, setReport] = React.useState([""]);

  const handleTimestampChange = event => {
    setTimestamp(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // TODO: send timestamp to backend logic
    console.log("Timestamp: ", timestamp);

    const url = `http://localhost:5000/api/excessReport`;
    fetch(url)
    .then(response => response.json())
    .then( data => {
            setReport(data);
            // console.log(data);
        })
        .catch(error => console.log(error));
      }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Timestamp: </label>
        <input type="datetime-local" value={timestamp} onChange={handleTimestampChange} />
        <br /><br />
        <button class="generateButton" type="submit">Generate Excess Report</button>
        <div className='scrollingTableSmaller'>
        <Table data={report}/>
      </div>
      </form>
    </div>
  );
}

export default ManagerExtrasNavBar;