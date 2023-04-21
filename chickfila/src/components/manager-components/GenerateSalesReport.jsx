import React from "react";
import '../../css/Manager.css'
import Table from '../GeneralTable';

function GenerateSalesReport ({response}) {
    return (
        <div>
        <button type='submit' class="generateButton">
            <span>
                Generate Sales Report
            </span>
        </button>
        <div className='scrollingTableSmaller'>
            <Table data={response} />
        </div>
        </div>
    );
}

export default GenerateSalesReport;