import React from 'react';
import { useSelector } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import ActionButtons from './LicenceOrder/ActionButtons';

const LicenceOrder = () => {
  const licenceOrderData = useSelector(
    (state) => state.licenceOrder.licenceOrderData
  );

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
        value: licenceOrderData.length,
      },
    ],
  };

  const columns = [
    {
      dataField: 'companyId',
      text: 'Sr no.',
    },

    {
      dataField: 'companyName',
      text: 'Corporate Name',
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
      dataField: 'action',
      text: 'Action',
      formatter: ActionButtons,
    },
  ];

  return (
    <BootstrapTable
      keyField='companyId'
      data={licenceOrderData === null ? [] : licenceOrderData}
      columns={columns}
      bordered={false}
      noDataIndication='No records found!'
      pagination={paginationFactory(options)}
    />
  );
};

export default LicenceOrder;
