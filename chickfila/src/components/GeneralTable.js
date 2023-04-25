import React from 'react'

export default function Table({data}){
    
    console.log("checking if data is empty" + data.length);
    if (!Array.isArray(data) || data.length === 0) {
        console.log("empty data for table");
        return (<p>No data to display.</p>);
    }

    let colnames = Object.keys(data[0]);

    return(
        <table className="table">
            <thead>
                <tr>
                    {colnames.map(heading => {
                        return <th key={heading}>{heading}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => {
                    return <tr key={index} className="table-row">
                    {colnames.map((key, index) => {
                        return <td key={row[key]} className="table-cell">{row[key]}</td>
                    })}
            </tr>;
            })}
            </tbody>
        </table>
    );
}