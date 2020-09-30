import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import ExpandedRowPastOrder from './ExpandedRowPastOrder';

const PastOrder = ({ pastOrder }) => {
  const columns = [
    {
      dataField: 'pastOrderId',
      text: 'Sr no.',
    },
    {
      dataField: 'employeeName',
      text: 'Emp. Name',
    },
    {
      dataField: 'employeeId',
      text: 'Emp. ID',
    },
    {
      dataField: 'allocatedLicenceType',
      text: 'Allo. Lice Type',
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
      dataField: 'firstThreeMonthCost',
      text: 'First 3 Mon Cost',
    },
    {
      dataField: 'paymentStatus',
      text: 'Pymt. Status',
    },
  ];

  const expandRow = {
    renderer: (row) => <ExpandedRowPastOrder row={row} />,
    showExpandColumn: true,
    expandByColumnOnly: true,
  };

  return (
    <div className='ml-5'>
      <BootstrapTable
        keyField='pastOrderId'
        data={pastOrder === null ? [] : pastOrder}
        columns={columns}
        bordered={false}
        noDataIndication='No records found!'
        expandRow={expandRow}
      />
    </div>
  );
};

export default PastOrder;
