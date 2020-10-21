import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
} from 'react-bootstrap-table2-paginator';
import { Pagination } from '../../../_metronic/_partials/controls';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import SubTableLicenseType from './CorporateManageLicense/SubTableLicenseType';
import SubTableLicenseNo from './CorporateManageLicense/SubTableLicenseNo';
import ActionButtons from './CorporateManageLicense/ActionButtons';
import {
  corporateManageLicenseAction,
  displayCorporateManageLicenseDataAsync,
} from '../../actions/corporateManageLicense.action';

const CorporateManageLicense = () => {
  const dispatch = useDispatch();
  const {
    corporateManageLicenseData,
    totalCount,
    pageSize,
    pageNo,
  } = useSelector((state) => state.corporateManageLicense, shallowEqual);

  const activeDeactiveAction = (orderId, isActive) => {
    dispatch(
      corporateManageLicenseAction.updateCorporateManageLicenseIsActive(
        orderId,
        isActive
      )
    );
  };

  useEffect(() => {
    dispatch(displayCorporateManageLicenseDataAsync());
  }, [dispatch]);

  const formatedDate = (cell, row) => {
    return moment(cell).format('DD/MM/YYYY');
  };

  const indexingSrNo = (cell, row, rowIndex) => {
    return rowIndex + 1;
  };

  const calculateTotalLicenceCost = (cell, row) => {
    let totalLicenseCost = 0;
    totalLicenseCost = row.purchasedLicenses
      .map((licence) => licence.totalPrice)
      .reduce((prev, next) => prev + next);
    return totalLicenseCost;
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
      dataField: 'srNo',
      text: 'Sr no.',
      formatter: indexingSrNo,
    },
    {
      dataField: 'orderId',
      text: 'Order No',
    },
    {
      dataField: 'createdAt',
      text: 'Order Date',
      formatter: formatedDate,
    },
    {
      dataField: 'purchasedLicenses.type',
      text: 'License Type',
      formatter: SubTableLicenseType,
    },
    {
      dataField: 'purchasedLicenses.quantity',
      text: 'No of License',
      formatter: SubTableLicenseNo,
    },
    {
      dataField: 'purchasedLicenses.totalPrice',
      text: 'License Cost (USD)',
      formatter: calculateTotalLicenceCost,
    },

    //commented as status field is not coming from API.
    // {
    //   dataField: 'status',
    //   text: 'Status',
    // },

    {
      dataField: 'action',
      text: 'Action',
      formatter: ActionButtons,
      formatExtraData: {
        activeDeactiveAction: activeDeactiveAction,
      },
    },
  ];

  const onTableChange = (type, newState) => {
    if (type === 'pagination') {
      if (
        (newState.page && newState.page !== pageNo) ||
        newState.sizePerPage !== pageSize
      ) {
        dispatch(
          displayCorporateManageLicenseDataAsync(
            newState.page,
            newState.sizePerPage
          )
        );
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
                keyField='orderId'
                bordered={false}
                data={
                  corporateManageLicenseData === null
                    ? []
                    : corporateManageLicenseData
                }
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

export default CorporateManageLicense;
