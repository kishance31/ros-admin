import React from 'react';
import { useSelector } from 'react-redux'
import BootstrapTable from "react-bootstrap-table-next";
import { VendorTableActionButtons } from './VendorTableActionButton';
import paginationFactory from "react-bootstrap-table2-paginator";

const ImportItemFromVendorTable = ({onClickVendorItemEdit, onClickVendorItemAddButton, setSelectedCategory, deleteData}) => {

    const itemListData = useSelector(state => state.categoryModal.vendorItemList);
  
   const coloumn = [
        {
            dataField: '_id',
            text: 'Sr. no',
            hidden:true
        },
        {
            dataField: 'product_image',
            text: 'Product Image'
        },
        {
            dataField: 'product_name',
            text: 'Item Name'
        },
        {
            dataField: 'product_code',
            text: 'Item Code'
        },
        {
            dataField: 'product_cost',
            text: 'Item Cost(USD)'
        },
        {
            dataField: 'ros_code',
            text: 'ROS Code'
        },
        {
            dataField:  'license_id',
            text: 'License Type'
        },
        {
            dataField: "action",
            text: "Actions",
            headerAlign: 'center',
            formatter: VendorTableActionButtons,
            formatExtraData: {
                setSelectedCategory: setSelectedCategory,
                onClickVendorItemEdit: onClickVendorItemEdit,
                onClickVendorItemAddButton: onClickVendorItemAddButton,
                deleteData: deleteData
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
            data={itemListData === null ? [] : itemListData}
            columns={coloumn}
            pagination={paginationFactory()}
            noDataIndication="Table is Empty"
        >
        </BootstrapTable>
    )
}

export default ImportItemFromVendorTable;