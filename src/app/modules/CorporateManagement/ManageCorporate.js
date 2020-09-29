import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useSelector, useDispatch } from 'react-redux';

import ActionButtons from './ManageCorporate/ActionButtons';
import { manageCorporateAction } from '../../actions/manageCorporate.action';

const ManageCorporate = () => {
  const dispatch = useDispatch();
  const manageCorporateData = useSelector(
    (state) => state.manageCorporate.manageCorporateData
  );

  const approveRejectAction = (companyId, status) => {
    dispatch(
      manageCorporateAction.updateManageCorporateStatus(companyId, status)
    );
  };

  const activeDeactiveAction = (companyId, isActive) => {
    dispatch(
      manageCorporateAction.updateManageCorporateIsActive(companyId, isActive)
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
        value: manageCorporateData.length,
      },
    ],
  };

  const columns = [
    {
      dataField: 'companyName',
      text: 'Company name',
    },
    {
      dataField: 'firstName',
      text: 'Firstname',
    },
    {
      dataField: 'lastName',
      text: 'Lastname',
    },
    {
      dataField: 'emailId',
      text: 'Email ID',
    },
    {
      dataField: 'mobile',
      text: 'Mobile',
    },
    {
      dataField: 'registrationDate',
      text: 'Registration Date',
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
        approveRejectAction: approveRejectAction,
        activeDeactiveAction: activeDeactiveAction,
      },
    },
  ];

  return (
    <BootstrapTable
      keyField='companyId'
      data={manageCorporateData === null ? [] : manageCorporateData}
      columns={columns}
      bordered={false}
      noDataIndication='No records found!'
      pagination={paginationFactory(options)}
    />
  );
};

export default ManageCorporate;