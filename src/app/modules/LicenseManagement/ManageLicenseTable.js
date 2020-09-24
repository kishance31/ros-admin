import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button, ButtonGroup } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { addLicenseListAsync } from '../../actions/manageLicense.action';

export const ManageLicenseFormatter = () => {
    return (
        <>
            <ButtonGroup>
                <Button variant="secondary">Active</Button>&nbsp;&nbsp;
                <Button variant="secondary">Deactive</Button>
            </ButtonGroup>
        </>
    );
}

const ManageLicenseTable = () => {

    const dispatch = useDispatch();

    const { licenseList, refreshManageLicenseData } = useSelector(state => state.manageLicense)

    useEffect(() => {
        if (refreshManageLicenseData) {
            dispatch(addLicenseListAsync())
        }
    }, [refreshManageLicenseData])

    const columns = [
        {
            dataField: 'type',
            text: 'License Type'
        },
        {
            dataField: 'price',
            text: 'License Cost(USD)'
        },
        {
            dataField: 'button',
            text: 'Actions',
            headerAlign: 'center',
            formatter: ManageLicenseFormatter,
        }
    ]

    return (
        <div>
            <div className="container" style={{ marginTop: 50 }}>
                <BootstrapTable
                    wrapperClasses="table-responsive"
                    hover
                    classes="table table-head-custom table-vertical-center"
                    bootstrap4
                    remote
                    bordered={false}
                    keyField='type'
                    data={licenseList}
                    columns={columns}
                />
            </div>
        </div>
    )
}

export default ManageLicenseTable;


