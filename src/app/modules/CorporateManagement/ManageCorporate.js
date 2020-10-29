import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import { Pagination } from '../../../_metronic/_partials/controls';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { NoRecordsFoundMessage, PleaseWaitMessage } from "../../../_metronic/_helpers";
import ActionButtons from './ManageCorporate/ActionButtons';
import { manageCorporateAction, displayManageCorporateDataAsync } from '../../actions/manageCorporate.action';

const ManageCorporate = () => {

  const dispatch = useDispatch();

  const {
    manageCorporateData,
    totalCount,
    isLoading,
    pageNumber,
    pageSize,
    refreshManageCorporateData
  } = useSelector(state => state.manageCorporate, shallowEqual);

  useEffect(() => {
    if (refreshManageCorporateData) {
      dispatch(displayManageCorporateDataAsync());
    }
  }, [refreshManageCorporateData]);

  const approveRejectAction = (_id, status) => {
    dispatch(
      manageCorporateAction.updateManageCorporateStatusAsync(_id, status)
    );
  };

  const activeDeactiveAction = (_id, isActive) => {
    dispatch(
      manageCorporateAction.updateManageCorporateIsActiveAsync(_id, isActive)
    );
  };

  const formatedDate = (cell, row) => {
    return moment(cell).format('DD/MM/YYYY');
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


  const paginationOptions = {
    custom: true,
    totalSize: 10,
    sizePerPageList: [
      { text: "3", value: 3 },
      { text: "5", value: 5 },
      { text: "10", value: 10 }
    ],
    sizePerPage: pageSize,
    page: pageNumber,
  };

  const noDataIndication = () => {
    return (
      <>
        {
          isLoading ? (
            <PleaseWaitMessage entities={null} />
          ) : (
              <NoRecordsFoundMessage entities={manageCorporateData} />
            )
        }
      </>
    )
  }

  const onTableChange = (type, newState) => {
    if (type === "pagination") {
      if (newState.page && newState.page !== pageNumber) {
        dispatch(manageCorporateAction.setPage(newState.page));
      }
      if (newState.sizePerPage !== pageSize) {
        dispatch(manageCorporateAction.setPageSize(newState.sizePerPage));
      }
    }
  }
  return (
    <PaginationProvider pagination={paginationFactory(paginationOptions)}>
      {({ paginationProps, paginationTableProps }) => {
        return (
          <Pagination
            isLoading={isLoading}
            paginationProps={paginationProps}
          >
            <BootstrapTable
              keyField='_id'
              bordered={false}
              data={manageCorporateData === null ? [] : manageCorporateData}
              columns={columns}
              remote
              {...paginationTableProps}
              onTableChange={onTableChange}
              noDataIndication={noDataIndication}
            />
          </Pagination>
        );
      }}
    </PaginationProvider>
  );
};

export default ManageCorporate;
