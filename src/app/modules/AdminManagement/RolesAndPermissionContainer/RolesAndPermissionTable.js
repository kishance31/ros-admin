import React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Button, ButtonGroup } from "react-bootstrap";

export const RoleAndPermisionFormatter = () => {
    return (
        <>
            <ButtonGroup>
                <Button variant="secondary">Edit</Button>&nbsp;&nbsp;
                <Button variant="secondary">Delete</Button>
            </ButtonGroup>
        </>
    );
}

export const data = [
    {
        date:new Date().toLocaleDateString(),
        listOfrole: 'Role1',
    },
    {
        date:new Date().toLocaleDateString(),
        listOfrole: 'Role2',
    },
]

const columns = [
    {
        dataField: 'date',
        text: 'Date',
        
    },
    {
        dataField: 'listOfrole',
        text: 'List of Role',
        editorClasses: 'editing-name'
    },
    {
        dataField: 'button',
        text: 'Actions',
        formatter: RoleAndPermisionFormatter,
    }
]
const rowEvents = {
    onClick: (e, row) => {
        console.log(row);
    }
}

const RolesAndPermissionTable = () => {

    return (
        <div className="container" style={{ marginTop: 50 }}>
            <BootstrapTable
                wrapperClasses="table-responsive"
                hover
                classes="table table-head-custom table-vertical-center"
                bootstrap4
                remote
                bordered={false}
                keyField='id'
                data={data}
                columns={columns}
                rowEvents={rowEvents}
                rowClasses="custom-row-class"
               // cellEdit={cellEditFactory({ mode: 'click' })}
            />
        </div>
    )
}

export default RolesAndPermissionTable;


