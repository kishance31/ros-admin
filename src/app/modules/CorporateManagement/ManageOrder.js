import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import ExpandedRowLevelOne from './ManageOrder/ExpandedRowLevelOne';
import { manageOrderAction } from '../../actions/manageOrder.action';

const ManageOrder = () => {
  const dispatch = useDispatch();
  const manageOrderData = useSelector(
    (state) => state.manageOrder.manageOrderData
  );

  const confirmNewOrder = (
    OrderId,
    newOrderId,
    orderConfirm,
    orderConfirmDate
  ) => {
    dispatch(
      manageOrderAction.updateManageOrderNewOrderConfirm(
        OrderId,
        newOrderId,
        orderConfirm,
        orderConfirmDate
      )
    );
  };

  const manageOrderDispatchUpdate = (
    orderId,
    newOrderId,
    dispatchStatus,
    dispatchDate,
    deliveryDate
  ) => {
    dispatch(
      manageOrderAction.updateManageOrderNewOrderDispatchDetails(
        orderId,
        newOrderId,
        dispatchStatus,
        dispatchDate,
        deliveryDate
      )
    );
  };

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
        value: manageOrderData.length,
      },
    ],
  };

  const columns = [
    {
      dataField: 'orderId',
      text: 'Sr no.',
    },
    {
      dataField: 'corporateName',
      text: 'Corporate Name',
    },
    {
      dataField: 'contactPerson',
      text: 'Contact Person',
    },
  ];

  const expandRow = {
    renderer: (row) => (
      <ExpandedRowLevelOne
        row={row}
        confirmNewOrder={confirmNewOrder}
        manageOrderDispatchUpdate={manageOrderDispatchUpdate}
      />
    ),
    showExpandColumn: true,
    expandByColumnOnly: true,
  };

  return (
    <BootstrapTable
      keyField='orderId'
      data={manageOrderData === null ? [] : manageOrderData}
      columns={columns}
      bordered={false}
      noDataIndication='No records found!'
      expandRow={expandRow}
      pagination={paginationFactory(options)}
    />
  );
};

export default ManageOrder;
