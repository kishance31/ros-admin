import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const ExpandedRowPastOrder = ({ row }) => {
  const [employeeOrders, setEmployeeOrders] = useState(row.employeeOrders);

  useEffect(() => {
    setEmployeeOrders(row.employeeOrders);
  }, [row]);

  const columns = [
    {
      dataField: 'employeeOrderId',
      text: 'Sr no.',
    },
    {
      dataField: 'itemName',
      text: 'Item Name',
    },
    {
      dataField: 'itemId',
      text: 'Item ID',
    },
    {
      dataField: 'itemCost',
      text: 'Item Cost (USD)',
    },
    {
      dataField: 'firstThreeMonthCost',
      text: 'First 3 Month Cost (USD)',
    },
  ];

  return (
    <div className='jumbotron bg-light p-4'>
      <BootstrapTable
        keyField='employeeOrderId'
        data={employeeOrders === null ? [] : employeeOrders}
        columns={columns}
        bordered={false}
        noDataIndication='No records found!'
      />
    </div>
  );
};

export default ExpandedRowPastOrder;
