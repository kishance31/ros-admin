import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useSelector, useDispatch } from 'react-redux';

import SubTableLicenceType from './ManageLicence/SubTableLicenceType';
import SubTableLicenceNo from './ManageLicence/SubTableLicenceNo';
import ActionButtons from './ManageLicence/ActionButtons';
import { manageLicenceAction } from '../../actions/manageLicence.action';

const ManageLicence = () => {
  const dispatch = useDispatch();
  const manageLicenceData = useSelector(
    (state) => state.manageLicence.manageLicenceData
  );

  const activeDeactiveAction = (id, isActive) => {
    dispatch(manageLicenceAction.updateManageLicenceIsActive(id, isActive));
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
        value: manageLicenceData.length,
      },
    ],
  };

  const columns = [
    {
      dataField: 'id',
      text: 'Sr no.',
    },
    {
      dataField: 'orderNo',
      text: 'Order No',
    },
    {
      dataField: 'orderDate',
      text: 'Order Date',
    },
    {
      dataField: 'licenceType',
      text: 'Licence Type',
      formatter: SubTableLicenceType,
    },
    {
      dataField: 'liceneType',
      text: 'No of Licene',
      formatter: SubTableLicenceNo,
    },
    {
      dataField: 'licenceCost',
      text: 'Licence Cost (USD)',
    },
    {
      dataField: 'status',
      text: 'Status',
    },
    {
      dataField: 'action',
      text: 'Action',
      formatter: ActionButtons,
      formatExtraData: {
        activeDeactiveAction: activeDeactiveAction,
      },
    },
  ];

  return (
    <BootstrapTable
      keyField='id'
      data={manageLicenceData === null ? [] : manageLicenceData}
      columns={columns}
      bordered={false}
      noDataIndication='No records found!'
      pagination={paginationFactory(options)}
    />
  );
};

export default ManageLicence;
