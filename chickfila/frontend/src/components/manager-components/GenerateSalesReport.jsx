import React from "react";
import '../../css/Manager.css'
import Table from '../GeneralTable';

function GenerateSalesReport ({response}) { 
    console.log('response:', response); // log the response prop value
    return (
        <div>
        <button type='submit' class="generateButton">
            <span>
                Generate Sales Report
            </span>
        </button>
        <div className='scrollingTableSalesRep'>
        <Table data={response} />
            {/* {response && response.length > 0 ? <Table data={response} /> : 'No sales data to display.'} */}
      </div>
        </div>
    );
}

export default GenerateSalesReport;