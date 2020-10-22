import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import RecurringInvoiceActionButtons from './RecurringInvoiceActionButtons';
import ExpandedRecurringInvoice from './ExpandedRecurringInvoice';

const RecurringInvoice = ({ recurringInvoiceData }) => {
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
        value: recurringInvoiceData.length,
      },
    ],
  };

  const columns = [
    {
      dataField: 'recurringInvoiceId',
      text: 'Sr no.',
    },
    {
      dataField: 'corporateName',
      text: 'Corporate Name',
    },
    {
      dataField: 'invoiceNo',
      text: 'Invoice. No',
    },
    {
      dataField: 'orderDate',
      text: 'Ord. Date',
    },
    {
      dataField: 'invoiceAmount',
      text: 'Invoice Amt.',
    },
    {
      dataField: 'action',
      text: 'Action',
      formatter: RecurringInvoiceActionButtons,
    },
  ];

  const expandRow = {
    renderer: (row) => (
      <ExpandedRecurringInvoice invoiceDetails={row.invoiceDetails} />
    ),
    showExpandColumn: true,
    expandByColumnOnly: true,
  };

  return (
    <BootstrapTable
      keyField='recurringInvoiceId'
      data={recurringInvoiceData === null ? [] : recurringInvoiceData}
      classes="center-last-col"
      columns={columns}
      bordered={false}
      noDataIndication='No records found!'
      expandRow={expandRow}
      pagination={paginationFactory(options)}
    />
  );
};

export default RecurringInvoice;
