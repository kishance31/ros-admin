import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const ExpandedRecurringInvoice = ({ invoiceRow, firstRecurringFlag }) => {
  const columns = [
    {
      dataField: '_id',
      text: 'id',
      hidden: true,
      footer: '',
    },
    {
      dataField: 'employeeDetails',
      text: 'Employee Name',
      footer: '',
      formatter: (cell, row, rowIdx) => `${invoiceRow.employeeDetails[0].firstName} ${invoiceRow.employeeDetails[0].lastName}`,
    },
    {
      dataField: 'orderId',
      text: 'order. No',
      footer: '',
    },
    {
      dataField: 'orderDate',
      text: 'Ord. Date',
      footer: '',
      formatter: cell => new Date(cell).toLocaleDateString()
    },
    {
      dataField: 'totalOrderCost',
      text: 'Total Ord. Cost',
      footer: () => `Total: $${invoiceRow.totalOrderCost.toFixed(2)}`,
      formatter: (cell) => {
        return `$${cell.toFixed(2)}`
      }
    },
    {
      dataField: 'invoiceDate',
      text: 'Month',
      footer: '',
      formatter: cell => {
        const dt = new Date(invoiceRow.invoiceDate);
        return dt.toLocaleString('default', { month: 'long' }) + " " + dt.getDate() + ", " + dt.getFullYear()
      }
    },
    // {
    //   dataField: 'monthlyCost',
    //   text: firstRecurringFlag === "first" ? "First Time Cost" : `Monthly Cost`,
    //   footer: firstRecurringFlag === "first" ? `Total: $${invoiceRow.firstTimeCost.toFixed(2)}`
    //     :
    //     `Total: $${invoiceRow.recurringCost.toFixed(2)}`,
    //   formatter: (cell, row) => {
    //     if (firstRecurringFlag === "first") {
    //       return `$${row.firstTimeCost.toFixed(2)}`
    //     } else {
    //       return `$${row.recurringCost.toFixed(2)}`
    //     }
    //   }
    // },
  ];

  return (
    <div className='jumbotron bg-light p-4 ml-5'>
      <BootstrapTable
        keyField='_id'
        data={invoiceRow.orderDetails || []}
        columns={columns}
        bordered={false}
        noDataIndication='No records found!'
      />
    </div>
  );
};

export default ExpandedRecurringInvoice;
