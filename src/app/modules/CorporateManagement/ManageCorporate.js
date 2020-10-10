import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import { Pagination } from '../../../_metronic/_partials/controls';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import ActionButtons from './ManageCorporate/ActionButtons';
import {
  manageCorporateAction,
  displayManageCorporateDataAsync,
} from '../../actions/manageCorporate.action';

const ManageCorporate = () => {
  const dispatch = useDispatch();
  const { manageCorporateData, totalCount, pageSize, pageNo } = useSelector(
    (state) => state.manageCorporate,
    shallowEqual
  );

  useEffect(() => {
    dispatch(displayManageCorporateDataAsync(pageNo, pageSize));
  }, [dispatch, pageNo, pageSize]);

  const approveRejectAction = (_id, status) => {
    dispatch(
      manageCorporateAction.updateManageCorporateStatusAsync(_id, status)
    );
  };

  const activeDeactiveAction = (_id, isActive) => {
    dispatch(
      manageCorporateAction.updateManageCorporateIsActive(_id, isActive)
    );
  };

  const formatedDate = (cell, row) => {
    return moment(cell).format('DD/MM/YYYY');
  };

  const paginationOption = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: [
      { text: '3', value: 3 },
      { text: '5', value: 5 },
      { text: '10', value: 10 },
    ],
    sizePerPage: pageSize,
    page: pageNo,
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
      dataField: 'email',
      text: 'Email ID',
    },
    {
      dataField: 'mobileNo',
      text: 'Mobile',
    },
    {
      dataField: 'createdAt',
      text: 'Registration Date',
      formatter: formatedDate,
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

  const onTableChange = (type, newState) => {
    if (type === 'pagination') {
      if (newState.page && newState.page !== pageNo) {
        dispatch(manageCorporateAction.setPageNo(newState.page));
      } else if (newState.sizePerPage && newState.sizePerPage !== pageSize) {
        dispatch(manageCorporateAction.setPageSize(newState.sizePerPage));
      }
    }
  };

  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOption)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination paginationProps={paginationProps}>
              <BootstrapTable
                keyField='_id'
                bordered={false}
                data={manageCorporateData === null ? [] : manageCorporateData}
                columns={columns}
                remote
                noDataIndication='No records found!'
                {...paginationTableProps}
                onTableChange={onTableChange}
              />
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
};

export default ManageCorporate;
