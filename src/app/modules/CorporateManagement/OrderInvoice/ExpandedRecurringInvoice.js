import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const ExpandedRecurringInvoice = ({ invoiceDetails }) => {
  const columns = [
    {
      dataField: 'invoiceDetailsId',
      text: 'Sr no.',
      footer: '',
    },
    {
      dataField: 'employeeName',
      text: 'Emp. Name',
      footer: '',
    },
    {
      dataField: 'orderNo',
      text: 'Ord. No',
      footer: '',
    },
    {
      dataField: 'orderDate',
      text: 'Ord. Date',
      footer: '',
    },
    {
      dataField: 'totalOrderCost',
      text: 'Total Ord. Cost',
      footer: (columnData) => columnData.reduce((acc, item) => acc + item, 0),
    },
    {
      dataField: 'month',
      text: 'Month',
      footer: '',
    },
    {
      dataField: 'monthlyCost',
      text: 'Monthly Cost',
      footer: (columnData) => columnData.reduce((acc, item) => acc + item, 0),
    },
  ];

  return (
    <div className='jumbotron bg-light p-4 ml-5'>
      <BootstrapTable
        keyField='invoiceDetailsId'
        data={invoiceDetails === null ? [] : invoiceDetails}
        columns={columns}
        bordered={false}
        noDataIndication='No records found!'
      />
    </div>
  );
};

export default ExpandedRecurringInvoice;
