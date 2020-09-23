import React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
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

const RolesAndPermissionTable = () => {

    const columns = [
        {
            dataField: 'date',
            text: 'Date',
            formatter: (value) => new Date(value).toLocaleString(),
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

    return (
        <div className="container" style={{ marginTop: 50 }}>
            <BootstrapTable
                wrapperClasses="table-responsive"
                hover
                classes="table table-head-custom table-vertical-center"
                bootstrap4
                remote
                bordered={false}
                keyField='date'
                //data={data}
                columns={columns}
            />
        </div>
    )
}

export default RolesAndPermissionTable;


