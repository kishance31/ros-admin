import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import ActionButtons from './ActionButtons';
import ExpandedRowNewOrder from './ExpandedRowNewOrder';

const NewOrder = ({ row, confirmNewOrder, manageOrderDispatchUpdate }) => {

  // const [productDetails, setProductDetails] = useState([]);

  // useEffect(() => {
  //   // if(row.productDetails && row.productDetails.length) {
  //     console.log("effect");
  //     console.log(row)
  //     // setProductDetails(row.productDetails.map(prod => ({...prod, firstPaymentTerm: row.firstPaymentTerm})));
  //   // }
  // }, []);

  const columns = [
    {
      dataField: 'employeeId',
      text: 'employeeId',
      hidden: true,
    },
    {
      dataField: 'employeeDetails.firstName',
      text: 'Emp. Name',
    },
    {
      dataField: 'employeeDetails.email',
      text: 'Emp. Email',
    },
    {
      dataField: 'employeeDetails.license.type',
      text: 'Allo. Lice Type',
    },
    {
      dataField: 'orderId',
      text: 'Ord. No',
    },
    {
      dataField: 'orderDate',
      text: 'Ord. Date',
      formatter: (cell) => new Date(cell).toLocaleDateString(),
    },
    {
      dataField: 'ordercost',
      text: 'Ord. Cost',
      formatter: (cell, row) => `
      $${row.productDetails.reduce((acc, val) => acc += val.ros_cost, 0)}
      `
    },
    {
      dataField: 'productDetails',
      text: 'First Time Cost',
      formatter: (cell, row) => `
      $${parseFloat((
        ((cell.reduce((acc, prod) => acc + prod.ros_cost, 0)) / 12)
        * row.firstPaymentTerm))
          .toFixed(2)
        }
      `
    },
    {
      dataField: 'isFirstTimePayment',
      text: 'Pymt. Status',
      formatter: (cell) => cell ? "Done" : "Pending"
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
    renderer: (row) => <ExpandedRowNewOrder order={row} />,
    showExpandColumn: true,
    expandByColumnOnly: true,
  };

  return (
    <div className='ml-5'>
      <BootstrapTable
        keyField='orderId'
        data={row}
        columns={columns}
        bordered={false}
        noDataIndication='No records found!'
        expandRow={expandRow}
      />
    </div>
  );
};

export default NewOrder;
