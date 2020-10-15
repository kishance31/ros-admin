import React from 'react';
import { useSelector } from 'react-redux'
import BootstrapTable from "react-bootstrap-table-next";
import { VendorTableActionButtons } from './VendorTableActionButton';
import {SmallProductImage} from './TableProductImage';
import paginationFactory, { PaginationProvider } from "react-bootstrap-table2-paginator";
import { Pagination } from '../../../../../_metronic/_partials/controls'


const ImportItemFromVendorTable = (props) => {
    const {onClickVendorItemEdit, onClickVendorItemAddButton, setSelectedProduct, deleteData, isLoading, totalCount, pageNumber, pageSize} = props;
    const itemListData = useSelector(state => state.categoryModal.vendorItemList);
  
   const coloumn = [
        {
            dataField: '_id',
            text: 'Sr. no',
            hidden:true
        },
        {
            dataField: 'product_image',
            text: 'Product Image',
            formatter: SmallProductImage
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
            dataField: 'ros_cost',
            text: 'ROS Cost'
        },
        {
            dataField:  'license_id.type',
            text: 'License Type'
        },
        {
            dataField: "action",
            text: "Actions",
            headerAlign: 'center',
            formatter: VendorTableActionButtons,
            formatExtraData: {
                setSelectedProduct: setSelectedProduct,
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
            keyField="_id"
            data={itemListData === null ? [] : itemListData}
            columns={coloumn}
            pagination={paginationFactory()}
            noDataIndication="Table is Empty"
        >
        </BootstrapTable>
    )
}

export default ImportItemFromVendorTable;