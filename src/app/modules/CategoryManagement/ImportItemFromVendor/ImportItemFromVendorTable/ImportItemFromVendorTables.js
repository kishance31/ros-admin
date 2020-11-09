import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import BootstrapTable from "react-bootstrap-table-next";
import { VendorTableActionButtons } from './VendorTableActionButton';
import { SmallProductImage } from './TableProductImage';
import paginationFactory, { PaginationProvider } from "react-bootstrap-table2-paginator";
import { Pagination } from '../../../../../_metronic/_partials/controls';
import { NoRecordsFoundMessage, PleaseWaitMessage } from '../../../../../_metronic/_helpers';
import { CategoryManagementAction } from '../../../../actions/categoryManagementModal.action'

const ImportItemFromVendorTable = (props) => {

    const { onClickVendorItemAddButton, setSelectedProduct, deleteData, isLoading, productCount, pageNumber, pageSize, currentRole } = props;
    const itemListData = useSelector(state => state.categoryModal.vendorItemList);
    const dispatch = useDispatch();
    const coloumn = [
        {
            dataField: '_id',
            text: 'Sr. no',
            hidden: true
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
            text: 'ROS Cost(USD)'
        },
        {
            dataField: 'license_id.type',
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
                deleteData: deleteData,
                currentRole: currentRole,
            }
        }
    ]
    const paginationOptions = {
        custom: true,
        totalSize: productCount,
        sizePerPageList: [
            { text: "3", value: 3 },
            { text: "5", value: 5 },
            { text: "10", value: 10 }
        ],
        sizePerPage: pageSize,
        page: pageNumber,
    };
    const noDataIndication = () => {
        return (
            <>
                {
                    isLoading ? (
                        <PleaseWaitMessage entities={null} />
                    ) : (
                            <NoRecordsFoundMessage entities={itemListData} />
                        )
                }
            </>
        )
    }
    const onTableChange = (type, newState) => {
        if (type === "pagination") {
            if (newState.page && newState.page !== pageNumber) {
                dispatch(CategoryManagementAction.setPage(newState.page));
            }
            if (newState.sizePerPage !== pageSize) {
                dispatch(CategoryManagementAction.setPageSize(newState.sizePerPage));
            }
        }
    }
    return (
        <>
            <PaginationProvider pagination={paginationFactory(paginationOptions)}>
                {({ paginationProps, paginationTableProps }) => {
                    return (
                        <Pagination
                            isLoading={isLoading}
                            paginationProps={paginationProps}
                        >
                            <BootstrapTable
                                wrapperClasses="table-responsive"
                                classes="table table-head-custom table-vertical-center center-last-col"
                                bootstrap4
                                bordered={false}
                                remote
                                keyField="_id"
                                data={itemListData === null ? [] : itemListData}
                                columns={coloumn}
                                {...paginationTableProps}
                                noDataIndication={noDataIndication}
                                onTableChange={onTableChange}
                            >
                            </BootstrapTable>
                        </Pagination>
                    );
                }}
            </PaginationProvider>
        </>
    );
};

export default ImportItemFromVendorTable;
