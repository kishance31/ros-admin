import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import FirstInvoiceActionButtons from './FirstInvoiceActionButtons';
import ExpandedFirstInvoice from './ExpandedFirstInvoice';

const FirstInvoice = ({ firstInvoiceData }) => {
  const customTotal = (from, to, size) => (
    <span className='react-bootstrap-table-pagination-total ml-4'>
      Showing {from} to {to} of {size} Results
    </span>
  );

  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    firstPageText: '<<',
    prePageText: '<',
    nextPageText: '>',
    lastPageText: '>>',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: '3',
        value: 3,
      },
      {
        text: '5',
        value: 5,
      },
      {
        text: '10',
        value: 10,
      },
      {
        text: 'All',
        value: firstInvoiceData.length,
      },
    ],
  };

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

  return (
    <BootstrapTable
      keyField='firstInvoiceId'
      data={firstInvoiceData === null ? [] : firstInvoiceData}
      columns={columns}
      bordered={false}
      noDataIndication='No records found!'
      expandRow={expandRow}
      pagination={paginationFactory(options)}
    />
  );
};

export default FirstInvoice;
