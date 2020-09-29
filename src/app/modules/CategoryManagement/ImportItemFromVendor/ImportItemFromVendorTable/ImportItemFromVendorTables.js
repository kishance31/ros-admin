import React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import { VendorTableActionButtons } from './VendorTableActionButton';
import paginationFactory, { PaginationProvider } from "react-bootstrap-table2-paginator";

const ImportItemFromVendorTable = ({onClickVendorItemEdit, onClickVendorItemAddButton}) => {

    const entities = [
        {
            srno:1,
            productImg: 'Keyboard Image',
            itemName: 'Keyboard',
            itemCode: 'KB001',
            itemCodeUSD: 'USDKB001',
            rosCode: '12KB',
            rosCodeUSD: 'USDRS01',
            licenseType: 'GOLD'
        },
        {
            srno:2,
            productImg: 'CPU Image',
            itemName: 'CPU',
            itemCode: 'KB001',
            itemCodeUSD: 'USDKB001',
            rosCode: '98KB',
            rosCodeUSD: 'USDRS01',
            licenseType: 'SILVER'
        },
        {
            srno:3,
            productImg: 'MOUSE Image',
            itemName: 'MOUSE',
            itemCode: 'KB001',
            itemCodeUSD: 'USDKB001',
            rosCode: '4KB',
            rosCodeUSD: 'USDRS01',
            licenseType: 'SILVER'
        }
    ]

   const coloumn = [
        {
            dataField: 'srno',
            text: 'Sr. no'
        },
        {
            dataField: 'productImg',
            text: 'Product Image'
        },
        {
            dataField: 'itemName',
            text: 'Item Name'
        },
        {
            dataField: 'itemCode',
            text: 'Item Code'
        },
        {
            dataField: 'itemCodeUSD',
            text: 'item Code (USD)'
        },
        {
            dataField: 'rosCode',
            text: 'ROS Code'
        },
        {
            dataField: 'rosCodeUSD',
            text: ' ROS Code (USD)'
        },
        {
            dataField: 'licenseType',
            text: 'License Type'
        },
        {
            dataField: "action",
            text: "Actions",
            headerAlign: 'center',
            formatter: VendorTableActionButtons,
            formatExtraData: {
                onClickVendorItemEdit: onClickVendorItemEdit,
                onClickVendorItemAddButton: onClickVendorItemAddButton
            }
        }
    ]

    return (
        <BootstrapTable
            wrapperClasses="table-responsive"
            classes="table table-head-custom table-vertical-center"
            bootstrap4
            bordered={false}
            remote
            keyField="srno"
            data={entities === null ? [] : entities}
            columns={coloumn}
            pagination={paginationFactory()}
            noDataIndication="Table is Empty"
        >
        </BootstrapTable>
    )
}

export default ImportItemFromVendorTable;