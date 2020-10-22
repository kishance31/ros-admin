import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import RecurringInvoiceActionButtons from './RecurringInvoiceActionButtons';
import ExpandedRecurringInvoice from './ExpandedRecurringInvoice';

const RecurringInvoice = ({ recurringInvoiceData }) => {

  const columns = [
    {
      dataField: 'invoiceDetails.invoiceNo',
      text: 'id',
      hidden: true,
    },
    {
      dataField: 'corporateDetails.companyName',
      text: 'Corporate Name',
    },
    {
      dataField: 'invoiceDetails.invoiceNo',
      text: 'Invoice. No',
    },
    {
      dataField: 'invoiceDetails.invoiceDate',
      text: 'Invoice Date',
      formatter: cell => new Date(cell).toLocaleDateString()
    },
    {
      dataField: 'invoiceDetails',
      text: 'Invoice Amt.',
      formatter: (cell, row) => `
      $${parseFloat((
        ((row.productDetails.reduce((acc, prod) => acc + prod.ros_cost, 0)) / 12)
        * row.firstPaymentTerm))
          .toFixed(2)
        }
      `
    },
    {
      dataField: 'action',
      text: 'Action',
      formatter: RecurringInvoiceActionButtons,
    },
  ];

  const expandRow = {
    renderer: (row) => (
      <ExpandedRecurringInvoice row={row} />
    ),
    showExpandColumn: true,
    expandByColumnOnly: true,
  };

  return (
    <BootstrapTable
      keyField='invoiceDetails.invoiceNo'
      data={recurringInvoiceData === null ? [] : recurringInvoiceData}
      columns={columns}
      bordered={false}
      noDataIndication='No records found!'
    expandRow={expandRow}
    />
  );
};

export default RecurringInvoice;
