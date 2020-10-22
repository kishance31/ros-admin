import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const ExpandedRecurringInvoice = ({ row }) => {
  const columns = [
    {
      dataField: '_id',
      text: 'id',
      hidden: true,
      footer: '',
    },
    {
      dataField: 'employeeDetails',
      text: 'Emp. Name',
      footer: '',
      formatter: cell => `${cell.firstName} ${cell.lastName}`,
    },
    {
      dataField: 'orderId',
      text: 'Ord. No',
      footer: '',
    },
    {
      dataField: 'invoiceDetails.invoiceDate',
      text: 'Ord. Date',
      footer: '',
      formatter: cell => new Date(cell).toLocaleDateString()
    },
    {
      dataField: 'productDetails',
      text: 'Total Ord. Cost',
      footer: (columnData, row) => {
        console.log(columnData);
        return row.productDetails.reduce((acc, item) => acc + item.ros_cost, 0)
      },
      formatter: cell => `$${cell.ros_cost}`
    },
    // {
    //   dataField: 'month',
    //   text: 'Month',
    //   footer: '',
    // },
    // {
    //   dataField: 'monthlyCost',
    //   text: 'Monthly Cost',
    //   footer: (columnData) => columnData.reduce((acc, item) => acc + item, 0),
    // },
  ];

  return (
    <div className='jumbotron bg-light p-4 ml-5'>
      <BootstrapTable
        keyField='_id'
        data={row || []}
        columns={columns}
        bordered={false}
        noDataIndication='No records found!'
      />
    </div>
  );
};

export default ExpandedRecurringInvoice;
