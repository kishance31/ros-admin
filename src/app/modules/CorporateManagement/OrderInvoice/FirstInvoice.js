import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { useSelector, useDispatch } from 'react-redux';
import FirstInvoiceActionButtons from './FirstInvoiceActionButtons';
import ExpandedFirstInvoice from './ExpandedFirstInvoice';
import { orderInvoiceAction } from '../../../actions/orderInvoice.action'
import { NoRecordsFoundMessage, PleaseWaitMessage } from "../../../../_metronic/_helpers";
import { Pagination } from "../../../../_metronic/_partials/controls";

const FirstInvoice = ({ firstInvoiceData }) => {

  const dispatch = useDispatch();

  const {
    isLoading,
    totalRecords,
    pageNumber,
    pageSize } = useSelector(state => state.orderInvoice)

  const columns = [
    {
      dataField: 'firstInvoiceId',
      text: 'Sr no.',
    },
    {
      dataField: 'corporateName',
      text: 'Corporate Name',
    },
    {
      dataField: 'employeeName',
      text: 'Emp. Name',
    },
    {
      dataField: 'orderNo',
      text: 'Ord. No',
    },
    {
      dataField: 'orderDate',
      text: 'Ord. Date',
    },
    {
      dataField: 'orderCost',
      text: 'Ord. Cost',
    },
    {
      dataField: 'action',
      text: 'Action',
      formatter: FirstInvoiceActionButtons,
    },
  ];

  const expandRow = {
    renderer: (row) => <ExpandedFirstInvoice orderDetails={row.orderDetails} />,
    showExpandColumn: true,
    expandByColumnOnly: true,
  };

  const paginationOptions = {
    custom: true,
   // totalSize: totalRecords,
    totalSize: 10,
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
              <NoRecordsFoundMessage entities={firstInvoiceData} />
            )
        }
      </>
    )
  }

  const onTableChange = (type, newState) => {
    if (type === "pagination") {
      if (newState.page && newState.page !== pageNumber) {
        dispatch(orderInvoiceAction.setPage(newState.page));
      }
      if (newState.sizePerPage !== pageSize) {
        dispatch(orderInvoiceAction.setPageSize(newState.sizePerPage));
      }
    }
  }

  return (
    <PaginationProvider pagination={paginationFactory(paginationOptions)}>
      {({ paginationProps, paginationTableProps }) => {
        return (
          <Pagination
            isLoading={isLoading}
            paginationProps={paginationProps}
          >
            <BootstrapTable
              keyField='firstInvoiceId'
              data={firstInvoiceData === null ? [] : firstInvoiceData}
              columns={columns}
              classes="center-last-col"
              bordered={false}
              expandRow={expandRow}
              {...paginationTableProps}
              noDataIndication={noDataIndication}
              onTableChange={onTableChange}
            />
          </Pagination>
        );
      }}
    </PaginationProvider>
  );
};
export default FirstInvoice;
