import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import ActionButtons from './ActionButtons';
import ExpandedRowNewOrder from './ExpandedRowNewOrder';

const NewOrder = ({ row, confirmNewOrder, manageOrderDispatchUpdate }) => {
  const [newOrder, setNewOrder] = useState(row.newOrder);

  useEffect(() => {
    setNewOrder(row.newOrder);
  }, [row]);

  const columns = [
    {
      dataField: 'newOrderId',
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
    {
      dataField: 'action',
      text: 'Action',
      formatter: ActionButtons,
      formatExtraData: {
        orderId: row.orderId,
        confirmNewOrder: confirmNewOrder,
        manageOrderDispatchUpdate: manageOrderDispatchUpdate,
      },
    },
  ];

  const expandRow = {
    renderer: (row) => <ExpandedRowNewOrder row={row} />,
    showExpandColumn: true,
    expandByColumnOnly: true,
  };

  return (
    <div className='ml-5'>
      <BootstrapTable
        keyField='newOrderId'
        data={newOrder === null ? [] : newOrder}
        columns={columns}
        bordered={false}
        noDataIndication='No records found!'
        expandRow={expandRow}
      />
    </div>
  );
};

export default NewOrder;
