import React, { Component } from 'react';
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
    const { columns, sortColumn, onSortEvent, data } = props
    return ( 
    <table className="table">
        <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSortEvent={onSortEvent}
        />

        <TableBody columns={columns} data={data}/>
    </table>  );
}
 
export default Table;