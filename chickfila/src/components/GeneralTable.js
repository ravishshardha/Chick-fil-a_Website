import React from 'react'

export default function Table({data}){
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