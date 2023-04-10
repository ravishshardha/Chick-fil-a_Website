import React from 'react'



// source https://www.makeuseof.com/react-generate-table-from-json/
export default function Table({data}){
    let colnames = Object.keys(data[0]);

    return(
        <table>
            <thead>
                <tr>
                    {colnames.map(heading => {
                        return <th key={heading}>{heading}</th>
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => {
                    return <tr key={index}>
                    {colnames.map((key, index) => {
                        return <td key={row[key]}>{row[key]}</td>
                    })}
            </tr>;
            })}
            </tbody>
        </table>
    );
}


